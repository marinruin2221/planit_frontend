import React, { useState, useMemo } from "react";
import { LuCalendarCheck, LuSearch, LuRotateCcw } from "react-icons/lu";
import {
	Box,
	Text,
	Stack,
	HStack,
	Icon,
	Input,
	Button,
	NativeSelect,
} from "@chakra-ui/react";

const PAGE_SIZE = 5;

const RESERVATIONS = [
	{ id: 1, name: "제주 오션뷰 호텔", date: "2025.01.12 ~ 2025.01.14 · 2박", price: "320,000원", status: "reserved" },
	{ id: 2, name: "부산 해운대 리조트", date: "2025.02.01 ~ 2025.02.03 · 2박", price: "280,000원", status: "used" },
	{ id: 3, name: "강릉 바다 호텔", date: "2025.03.10 ~ 2025.03.11 · 1박", price: "150,000원", status: "cancel" },
	{ id: 4, name: "서울 시티 호텔", date: "2025.04.02 ~ 2025.04.04 · 2박", price: "400,000원", status: "reserved" },
	{ id: 5, name: "광주 모던 호텔", date: "2025.05.05 ~ 2025.05.07 · 2박", price: "310,000원", status: "used" },
	{ id: 6, name: "대전 시티 리조트", date: "2025.06.01 ~ 2025.06.02 · 1박", price: "180,000원", status: "reserved" },
	{ id: 7, name: "인천 바다 호텔", date: "2025.07.10 ~ 2025.07.12 · 2박", price: "290,000원", status: "cancel" },
	{ id: 8, name: "울산 리조트", date: "2025.08.15 ~ 2025.08.17 · 2박", price: "330,000원", status: "reserved" },
	{ id: 9, name: "강릉 모던 호텔", date: "2025.09.05 ~ 2025.09.06 · 1박", price: "200,000원", status: "used" },
	{ id: 10, name: "부산 시티 호텔", date: "2025.10.12 ~ 2025.10.14 · 2박", price: "360,000원", status: "reserved" },
	{ id: 11, name: "제주 힐링 호텔", date: "2025.11.01 ~ 2025.11.03 · 2박", price: "400,000원", status: "cancel" },
	{ id: 12, name: "서울 모던 리조트", date: "2025.12.10 ~ 2025.12.12 · 2박", price: "420,000원", status: "used" },
];

const STATUS_STYLE = {
	reserved: { label: "예약완료", bg: "green.50", color: "green.700" },
	used: { label: "이용완료", bg: "gray.100", color: "gray.700" },
	cancel: { label: "취소", bg: "red.50", color: "red.600" },
};

export default function Breakdown()
{
	const [inputText, setInputText] = useState(""); // 검색창 입력값
	const [searchText, setSearchText] = useState(""); // 실제 검색 적용
	const [status, setStatus] = useState("all"); // 상태 필터
	const [searchStatus, setSearchStatus] = useState("all"); // 검색 버튼 클릭 시 적용
	const [page, setPage] = useState(1);
	const [triggerSearch, setTriggerSearch] = useState(false);

	const filtered = useMemo(() => {
		return RESERVATIONS.filter((item) => {
			const matchSearch = item.name.includes(searchText);
			const matchStatus = searchStatus === "all" || item.status === searchStatus;
			return matchSearch && matchStatus;
		});
	}, [searchText, searchStatus, triggerSearch]);

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const list = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const applySearch = () => {
		setSearchText(inputText);
		setSearchStatus(status);
		setPage(1);
		setTriggerSearch(prev => !prev);
		window.scrollTo({top:0});
	};

	const resetSearch = () => {
		setInputText("");
		setSearchText("");
		setStatus("all");
		setSearchStatus("all");
		setPage(1);
		setTriggerSearch(prev => !prev);
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
	};

	return <React.Fragment>
		<Text fontSize="3xl" fontWeight="bold" mb="6">
			예약 내역
		</Text>

		<HStack mb={8} spacing={3}>
			<NativeSelect.Root
				value={status}
				w="150px"
				style={{ height: "45px" }}
				onChange={(e) => setStatus(e.target.value)}
			>
				<NativeSelect.Field style={{ height: "45px" }}>
					<option value="all">전체</option>
					<option value="reserved">예약완료</option>
					<option value="used">이용완료</option>
					<option value="cancel">취소</option>
				</NativeSelect.Field>
				<NativeSelect.Indicator />
			</NativeSelect.Root>

			<Input
				placeholder="예약 내역 검색"
				height="45px"
				fontSize="md"
				borderRadius="md"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") applySearch();
				}}
			/>

			<Button
				height="45px"
				px={6}
				colorScheme="blue"
				borderRadius="md"
				bgColor={"var(--brand_color)"}
				fontSize="lg"
				fontWeight="bold"
				onClick={applySearch}
			>
				<LuSearch size={20} />
			</Button>

			<Button
				height="45px"
				px={6}
				variant="outline"
				borderRadius="md"
				fontSize="md"
				onClick={resetSearch}
			>
				<LuRotateCcw size={20} />
			</Button>
		</HStack>

		<Stack gap="4">
			{list.map((item) => (
				<Box
					key={item.id}
					p="6"
					border="1px solid"
					borderColor="gray.200"
					borderRadius="xl"
					_hover={{
						borderColor: "var(--brand_color)",
						boxShadow: "sm",
					}}
				>
					<HStack justify="space-between" align="flex-start">
						<HStack align="start" gap="4">
							<Box p="2" borderRadius="md" bg="orange.50" color="var(--brand_color)">
								<Icon as={LuCalendarCheck} />
							</Box>
							<Stack gap="1">
								<Text fontWeight="semibold">{item.name}</Text>
								<Text fontSize="sm" color="gray.500">{item.date}</Text>
								<Text fontSize="sm">
									결제금액 <b>{item.price}</b>
								</Text>
							</Stack>
						</HStack>

						<Box
							px="3"
							py="1"
							fontSize="xs"
							borderRadius="full"
							bg={STATUS_STYLE[item.status].bg}
							color={STATUS_STYLE[item.status].color}
						>
							{STATUS_STYLE[item.status].label}
						</Box>
					</HStack>
				</Box>
			))}
			{list.length === 0 && (
				<Text textAlign="center" color="gray.400" py="10">
					예약 내역이 없습니다.
				</Text>
			)}
		</Stack>

		{totalPages > 1 && (
			<HStack mt={10} justify="center">
				<Button
					size="sm"
					variant="outline"
					onClick={() => handlePageChange(page - 1)}
					isDisabled={page === 1}
					borderRadius="full"
					borderColor="gray.300"
					color="gray.700"
					_hover={{ bg: "gray.100" }}
				>
					이전
				</Button>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
					const isActive = p === page;
					return (
						<Button
							key={p}
							size="sm"
							borderRadius="full"
							variant={isActive ? "solid" : "outline"}
							bg={isActive ? "var(--brand_color)" : "transparent"}
							color={isActive ? "white" : "gray.700"}
							borderColor={isActive ? "var(--brand_color)" : "gray.300"}
							_hover={{ bg: isActive ? "var(--brand_color)" : "gray.100" }}
							onClick={() => handlePageChange(p)}
						>
							{p}
						</Button>
					);
				})}
				<Button
					size="sm"
					variant="outline"
					onClick={() => handlePageChange(page + 1)}
					isDisabled={page === totalPages}
					borderRadius="full"
					borderColor="gray.300"
					color="gray.700"
					_hover={{ bg: "gray.100" }}
				>
					다음
				</Button>
			</HStack>
		)}
	</React.Fragment>
}
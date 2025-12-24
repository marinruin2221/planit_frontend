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
	Portal,
	CloseButton,
	Dialog
} from "@chakra-ui/react";
import PageForm from "@components/mypage/PageForm.jsx";

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
	const [inputText, setInputText] = useState("");
	const [searchText, setSearchText] = useState("");
	const [status, setStatus] = useState("all");
	const [searchStatus, setSearchStatus] = useState("all");
	const [page, setPage] = useState(1);
	const [triggerSearch, setTriggerSearch] = useState(false);
	const [reservations, setReservations] = useState(RESERVATIONS);

	const filtered = useMemo(() => {
		return reservations.filter((item) => {
			const matchSearch = item.name.includes(searchText);
			const matchStatus = searchStatus === "all" || item.status === searchStatus;
			return matchSearch && matchStatus;
		});
	}, [searchText, searchStatus, triggerSearch, reservations]);

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const list = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const applySearch = () => {
		setSearchText(inputText);
		setSearchStatus(status);
		setPage(1);
		setTriggerSearch(prev => !prev);
		window.scrollTo({ top: 0 });
	};

	const resetSearch = () => {
		setInputText("");
		setSearchText("");
		setStatus("all");
		setSearchStatus("all");
		setPage(1);
		setTriggerSearch(prev => !prev);
		window.scrollTo({ top: 0 });
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
	};

	const handleCancelReservation = (id) => {
		setReservations((prev) => prev.map(r => r.id === id ? { ...r, status: "cancel" } : r));
	};

	return <React.Fragment>
		<Text fontSize="3xl" fontWeight="bold" mb="6">예약 내역</Text>
		<HStack mb="8">
			<NativeSelect.Root w="120px" h="45px" cursor="pointer" value={status} onChange={(e) => setStatus(e.target.value)}>
				<NativeSelect.Field h="45px">
					<option value="all">전체</option>
					<option value="reserved">예약완료</option>
					<option value="used">이용완료</option>
					<option value="cancel">취소</option>
				</NativeSelect.Field>
				<NativeSelect.Indicator />
			</NativeSelect.Root>
			<Input
				placeholder="예약 내역 검색"
				h="45px"
				rounded="md"
				fontSize="md"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && applySearch()}
			/>
			<Button h="45px" px="6" rounded="md" bg="var(--brand_color)" fontSize="lg" fontWeight="bold" onClick={applySearch}>
				<LuSearch size="20" />
			</Button>
			<Button variant="outline" h="45px" px="6" rounded="md" fontSize="md" onClick={resetSearch}>
				<LuRotateCcw size="20" />
			</Button>
		</HStack>

		<Stack gap="4">
			{list.map((item) => (
				<Box key={item.id} p={6} border="1px solid" borderColor="gray.200" borderRadius="xl" _hover={{ boxShadow: "md", borderColor: "var(--brand_color)", cursor: "pointer" }} transition="all 0.2s">
					<HStack justify="space-between" align="start">
						<HStack align="start" spacing={4}>
							<Box p={3} borderRadius="lg" bg="orange.50" color="var(--brand_color)" display="flex" alignItems="center" justifyContent="center" fontSize="20px">
								<Icon as={LuCalendarCheck} />
							</Box>
							<Stack spacing={1}>
								<Text fontWeight="bold" fontSize="lg" color="gray.800">{item.name}</Text>
								<Text fontSize="sm" color="gray.500">{item.date}</Text>
								<Text fontSize="sm" color="gray.700">결제금액 <b>{item.price}</b></Text>
							</Stack>
						</HStack>

						{item.status === "reserved" ? (
							<Dialog.Root>
								<Dialog.Trigger asChild>
									<Button size="sm" colorScheme="red" variant="outline">예약 취소</Button>
								</Dialog.Trigger>
								<Portal>
									<Dialog.Backdrop />
									<Dialog.Positioner>
										<Dialog.Content>
											<Dialog.Header>
												<Dialog.Title>예약 취소 확인</Dialog.Title>
											</Dialog.Header>
											<Dialog.Body>
												<Text>정말 예약을 취소하시겠습니까?</Text>
											</Dialog.Body>
											<Dialog.Footer>
												<Dialog.ActionTrigger asChild>
													<Button variant="outline">취소</Button>
												</Dialog.ActionTrigger>
												<Button colorScheme="red" onClick={() => handleCancelReservation(item.id)}>확인</Button>
											</Dialog.Footer>
											<Dialog.CloseTrigger asChild>
												<CloseButton size="sm" />
											</Dialog.CloseTrigger>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>
						) : (
							<Box px={3} py={1} borderRadius="full" fontSize="xs" fontWeight="bold" bg={STATUS_STYLE[item.status].bg} color={STATUS_STYLE[item.status].color}>
								{STATUS_STYLE[item.status].label}
							</Box>
						)}
					</HStack>
				</Box>
			))}
			{list.length === 0 && (
				<Text textAlign="center" color="gray.400" py="10">예약 내역이 없습니다.</Text>
			)}
		</Stack>
		{totalPages > 1 && (
			<Box mt="10">
				<PageForm currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
			</Box>
		)}
	</React.Fragment>
}
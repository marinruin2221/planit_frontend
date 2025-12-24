import React, { useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { LuSearch, LuRotateCcw, LuMessageCircle } from "react-icons/lu";
import {
	Box,
	Text,
	Stack,
	HStack,
	Flex,
	Icon,
	Input,
	Button,
} from "@chakra-ui/react";

const PAGE_SIZE = 5;

const REVIEWS = [
	{ id: 1, title: "제주 오션뷰 호텔 후기", date: "2025.01.12", content: "바다가 보이는 멋진 객실과 친절한 서비스!", rating: 5 , review:1200 },
	{ id: 2, title: "부산 해운대 리조트 후기", date: "2025.02.01", content: "해운대 해변이 가까워서 좋았습니다.", rating: 4 , review:1200 },
	{ id: 3, title: "강릉 바다 호텔 후기", date: "2025.03.10", content: "조용하고 편안한 숙소였습니다.", rating: 4 , review:1200 },
	{ id: 4, title: "서울 시티 호텔 후기", date: "2025.04.02", content: "시내 중심이라 이동이 편리했어요.", rating: 5 , review:1200 },
	{ id: 5, title: "광주 모던 호텔 후기", date: "2025.05.05", content: "깔끔하고 모던한 분위기.", rating: 4 , review:1200 },
	{ id: 6, title: "대전 시티 리조트 후기", date: "2025.06.01", content: "조용하고 아늑했습니다.", rating: 4 , review:1200 },
	{ id: 7, title: "인천 바다 호텔 후기", date: "2025.07.10", content: "뷰가 아름답고 가격도 적당했어요.", rating: 5 , review:1200 },
	{ id: 8, title: "울산 리조트 후기", date: "2025.08.15", content: "가족과 함께 머물기 좋았습니다.", rating: 4 , review:1200 },
	{ id: 9, title: "강릉 모던 호텔 후기", date: "2025.09.05", content: "깔끔한 시설과 친절한 직원.", rating: 4 , review:1200 },
	{ id: 10, title: "부산 시티 호텔 후기", date: "2025.10.12", content: "위치가 좋아서 편리했어요.", rating: 5 , review:1200 },
];

export default function Breakdown() {
	const [inputText, setInputText] = useState("");
	const [searchText, setSearchText] = useState("");
	const [page, setPage] = useState(1);
	const [triggerSearch, setTriggerSearch] = useState(false);

	const filtered = useMemo(() => {
		return REVIEWS.filter((item) => item.title.includes(searchText));
	}, [searchText, triggerSearch]);

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const list = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const applySearch = () => {
		setSearchText(inputText);
		setPage(1);
		setTriggerSearch((prev) => !prev);
		window.scrollTo({top:0});
	};

	const resetSearch = () => {
		setInputText("");
		setSearchText("");
		setPage(1);
		setTriggerSearch((prev) => !prev);
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
	};

	return <React.Fragment>
		<Text fontSize="3xl" fontWeight="bold" mb="6">
			여행 후기
		</Text>

		<HStack mb={8} spacing={3}>
			<Input
				placeholder="여행 후기 검색"
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
								<Icon as={LuMessageCircle} />
							</Box>
							<Stack gap="1">
								<Text fontWeight="semibold">{item.title}</Text>
								<Text fontSize="sm" color="gray.500">{item.date}</Text>
								<Text fontSize="sm">{item.content}</Text>
								<Flex gap="1" fontSize="sm">
									<Icon color={"var(--star_color)"} as={FaStar}/>
									<Text color={"var(--text_light_gray)"}>{item.rating}점</Text>
								</Flex>
							</Stack>
						</HStack>
					</HStack>
				</Box>
			))}
			{list.length === 0 && (
				<Text textAlign="center" color="gray.400" py="10">
					후기가 없습니다.
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
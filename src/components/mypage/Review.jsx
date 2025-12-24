import React, { useState, useMemo } from "react";
import { LuMessageSquare, LuSearch, LuRotateCcw } from "react-icons/lu";
import {
	Box,
	Text,
	Stack,
	HStack,
	Icon,
	Input,
	Button,
	Portal,
	CloseButton,
	Dialog
} from "@chakra-ui/react";
import PageForm from "@components/mypage/PageForm.jsx";

const PAGE_SIZE = 5;

const REVIEWS = [
	{ id: 1, title: "제주 오션뷰 호텔 후기", content: "정말 아름다운 뷰였습니다.", date: "2025.01.15", status: "visible" },
	{ id: 2, title: "부산 해운대 리조트 후기", content: "친절한 서비스와 깔끔한 시설.", date: "2025.02.04", status: "visible" },
	{ id: 3, title: "강릉 바다 호텔 후기", content: "바다 전망이 최고였어요.", date: "2025.03.12", status: "visible" },
	{ id: 4, title: "서울 시티 호텔 후기", content: "위치가 좋고 깨끗했어요.", date: "2025.04.05", status: "visible" },
	{ id: 5, title: "광주 모던 호텔 후기", content: "편안하게 쉬고 왔습니다.", date: "2025.05.06", status: "visible" },
	{ id: 6, title: "대전 시티 리조트 후기", content: "시설이 조금 낡았지만 만족.", date: "2025.06.02", status: "visible" },
	{ id: 7, title: "인천 바다 호텔 후기", content: "조식이 맛있었어요.", date: "2025.07.11", status: "visible" },
	{ id: 8, title: "울산 리조트 후기", content: "가족 단위로 추천합니다.", date: "2025.08.16", status: "visible" },
	{ id: 9, title: "강릉 모던 호텔 후기", content: "친구와 여행하기 좋습니다.", date: "2025.09.06", status: "visible" },
	{ id: 10, title: "부산 시티 호텔 후기", content: "도심 접근성 최고.", date: "2025.10.13", status: "visible" },
];

export default function Review()
{
	const [inputText, setInputText] = useState("");
	const [searchText, setSearchText] = useState("");
	const [page, setPage] = useState(1);
	const [reviews, setReviews] = useState(REVIEWS);
	const [triggerSearch, setTriggerSearch] = useState(false);

	const filtered = useMemo(() => {
		return reviews.filter((item) => item.title.includes(searchText) && item.status === "visible");
	}, [searchText, reviews, triggerSearch]);

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const list = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const applySearch = () => {
		setSearchText(inputText);
		setPage(1);
		setTriggerSearch((prev) => !prev);
		window.scrollTo({ top: 0 });
	};

	const resetSearch = () => {
		setInputText("");
		setSearchText("");
		setPage(1);
		setTriggerSearch((prev) => !prev);
		window.scrollTo({ top: 0 });
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
	};

	const handleDelete = (id) => {
		setReviews((prev) =>
			prev.map((r) => (r.id === id ? { ...r, status: "deleted" } : r))
		);
	};

	return <React.Fragment>
		<Text fontSize="3xl" fontWeight="bold" mb="6">여행 리뷰</Text>
		<HStack mb="8">
			<Input
				placeholder="여행 리뷰 검색"
				h="45px"
				rounded="md"
				fontSize="md"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && applySearch()}
			/>
			<Button
				h="45px"
				px="6"
				rounded="md"
				bg="var(--brand_color)"
				fontSize="lg"
				fontWeight="bold"
				onClick={applySearch}
			>
				<LuSearch size="20"/>
			</Button>
			<Button
				variant="outline"
				h="45px"
				px="6"
				rounded="md"
				fontSize="md"
				onClick={resetSearch}
			>
				<LuRotateCcw size="20"/>
			</Button>
		</HStack>

		<Stack gap="4">
			{list.map((item) => (
				<Box
					key={item.id}
					p={6}
					border="1px solid"
					borderColor="gray.200"
					borderRadius="xl"
					_hover={{ boxShadow: "md", borderColor: "var(--brand_color)", cursor: "pointer" }}
					transition="all 0.2s"
				>
					<HStack justify="space-between" align="start">
						<HStack align="start" spacing={4}>
							<Box
								p={3}
								borderRadius="lg"
								bg="blue.50"
								color="var(--brand_color)"
								display="flex"
								alignItems="center"
								justifyContent="center"
								fontSize="20px"
							>
								<Icon as={LuMessageSquare} />
							</Box>
							<Stack spacing={1}>
								<Text fontWeight="bold" fontSize="lg" color="gray.800">{item.title}</Text>
								<Text fontSize="sm" color="gray.500">{item.date}</Text>
								<Text fontSize="sm" color="gray.700">{item.content}</Text>
							</Stack>
						</HStack>

						<Dialog.Root>
							<Dialog.Trigger asChild>
								<Button size="sm" colorScheme="red" variant="outline">
									삭제
								</Button>
							</Dialog.Trigger>
							<Portal>
								<Dialog.Backdrop />
								<Dialog.Positioner>
									<Dialog.Content>
										<Dialog.Header>
											<Dialog.Title>리뷰 삭제 확인</Dialog.Title>
										</Dialog.Header>
										<Dialog.Body>
											<Text>이 리뷰를 정말 삭제하시겠습니까?</Text>
										</Dialog.Body>
										<Dialog.Footer>
											<Dialog.ActionTrigger asChild>
												<Button variant="outline">취소</Button>
											</Dialog.ActionTrigger>
											<Button colorScheme="red" onClick={() => handleDelete(item.id)}>삭제</Button>
										</Dialog.Footer>
										<Dialog.CloseTrigger asChild>
											<CloseButton size="sm" />
										</Dialog.CloseTrigger>
									</Dialog.Content>
								</Dialog.Positioner>
							</Portal>
						</Dialog.Root>
					</HStack>
				</Box>
			))}
			{list.length === 0 && (
				<Text textAlign="center" color="gray.400" py="10">여행 리뷰가 없습니다.</Text>
			)}
		</Stack>
		{totalPages > 1 && (
			<Box mt="10">
				<PageForm currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
			</Box>
		)}
	</React.Fragment>
}
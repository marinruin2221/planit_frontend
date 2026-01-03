import React, { useState } from "react";
import { LuMessageSquare, LuSearch, LuRotateCcw } from "react-icons/lu";
import {
	Box,
	Text,
	Stack,
	HStack,
	Card,
	Input,
	Button,
	Portal,
	Dialog
} from "@chakra-ui/react";
import PageForm from "@components/mypage/PageForm.jsx";

const list = [
	{ id: 1, name: "제주 오션뷰 호텔 후기", content: "정말 아름다운 뷰였습니다.", date: "2025.01.15", status: "visible" },
	{ id: 2, name: "부산 해운대 리조트 후기", content: "친절한 서비스와 깔끔한 시설.", date: "2025.02.04", status: "visible" },
	{ id: 3, name: "강릉 바다 호텔 후기", content: "바다 전망이 최고였어요.", date: "2025.03.12", status: "visible" },
	{ id: 4, name: "서울 시티 호텔 후기", content: "위치가 좋고 깨끗했어요.", date: "2025.04.05", status: "visible" },
	{ id: 5, name: "광주 모던 호텔 후기", content: "편안하게 쉬고 왔습니다.", date: "2025.05.06", status: "visible" },
	{ id: 6, name: "대전 시티 리조트 후기", content: "시설이 조금 낡았지만 만족.", date: "2025.06.02", status: "visible" },
	{ id: 7, name: "인천 바다 호텔 후기", content: "조식이 맛있었어요.", date: "2025.07.11", status: "visible" },
	{ id: 8, name: "울산 리조트 후기", content: "가족 단위로 추천합니다.", date: "2025.08.16", status: "visible" },
	{ id: 9, name: "강릉 모던 호텔 후기", content: "친구와 여행하기 좋습니다.", date: "2025.09.06", status: "visible" },
	{ id: 10, name: "부산 시티 호텔 후기", content: "도심 접근성 최고.", date: "2025.10.13", status: "visible" },
];

export default function Review()
{
	return <React.Fragment>
		<Text fontSize="3xl" fontWeight="bold" mb="6">여행 리뷰</Text>

		<HStack mb="8">
			<Input
				variant="outline"
				size="xl"
				placeholder="여행 리뷰 검색"
				// value={word}
				// onChange={e => setWord(e.target.value)}
				// onKeyDown={e => e.key === "Enter" && handleSearch()}
			/>
			<Button variant="subtle" size="xl" color="var(--white_color)" bg="var(--brand_color)"><LuSearch /></Button>
			<Button variant="outline" size="xl" color="var(--black_color)" bg="var(--white_color)"><LuRotateCcw /></Button>
		</HStack>

		<Stack gap="5">
			{list.length > 0 ? list.map((e, i) => (
				<Card.Root key={i}>
					<Card.Body>
						<HStack justify="space-between" align="start" gap="5">
							<HStack align="start" gap="5">
								<Box p="3" rounded="lg" fontSize="xl" color="var(--brand_color)" bg="blue.50">
									<LuMessageSquare />
								</Box>
								<Stack gap="3">
									<Text fontSize="xl" fontWeight="bold" color="gray.800">{e.name}</Text>
									<HStack>
										<Stack>
											<Text fontSize="sm" color="gray.700">작성일</Text>
											<Text fontSize="sm" color="gray.700">리뷰</Text>
										</Stack>
										<Stack>
											<Text fontSize="sm" fontWeight="bold">{e.date}</Text>
											<Text fontSize="sm" fontWeight="bold">{e.content}</Text>
										</Stack>
									</HStack>
								</Stack>
							</HStack>
							<Dialog.Root placement="center">
								<Dialog.Trigger asChild>
									<Button variant="subtle" size="xs" colorPalette="red">삭제</Button>
								</Dialog.Trigger>
								<Portal>
									<Dialog.Backdrop />
									<Dialog.Positioner>
										<Dialog.Content>
											<Dialog.Header>
												<Dialog.Title>리뷰 삭제 확인</Dialog.Title>
											</Dialog.Header>
											<Dialog.Body>
												<Text>리뷰를 삭제하시겠습니까?</Text>
											</Dialog.Body>
											<Dialog.Footer>
												<Dialog.ActionTrigger asChild>
													<Button variant="outline">취소</Button>
												</Dialog.ActionTrigger>
												<Dialog.ActionTrigger asChild>
													<Button>확인</Button>
												</Dialog.ActionTrigger>
											</Dialog.Footer>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>
						</HStack>
					</Card.Body>
				</Card.Root>
			)) : (
				<Text textAlign="center" py="10" color="gray.400">여행 리뷰가 없습니다.</Text>
			)}
		</Stack>

		{/* {totalPages > 1 && (
			<Box mt="10">
				<PageForm currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
			</Box>
		)} */}
	</React.Fragment>
}
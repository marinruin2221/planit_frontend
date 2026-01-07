import React, { useState, useEffect, useRef } from "react";
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

export default function Review({ refreshKey })
{
	const [list, setList] = useState([]);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [word, setWord] = useState("");

	const isSearchRef = useRef(false);
	const isResetRef = useRef(false);

	const scrollTop = () => window.scrollTo({ top: 0 });

	const fetchData = (targetPage = page) => {
		fetch("/api/mypage/review", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: localStorage.getItem("userId"),
				word: word ?? "",
				page: targetPage,
				size: 5
			})
		})
		.then(res => res.json())
		.then(res => {
			setList(res.content ?? res);
			setTotalPages(res.totalPages ?? 1);
		});
	};

	const deleteReservation = async (id) => {
		await fetch("/api/mypage/reviewDelete", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id })
		});
		fetchData(0);
	};

	useEffect(() => { fetchData(); }, [page]);
	useEffect(() => {
		if (!isSearchRef.current) return;
		if (word === "") fetchData(0);
		isSearchRef.current = false;
	}, [word]);
	useEffect(() => {
		if (!isResetRef.current) return;
		fetchData(0);
		isResetRef.current = false;
	}, [word, page]);
	useEffect(() => {
		fetchData(0);
	}, [refreshKey]);

	const handlePageChange = (p) => {
		if (p < 0 || p >= totalPages) return;
		scrollTop();
		setPage(p);
	};
	const handleSearch = () => { scrollTop(); isSearchRef.current = true; setPage(0); fetchData(0); };
	const handleReset = () => { scrollTop(); isResetRef.current = true; setWord(""); setPage(0); };

	return <React.Fragment>
		<Text fontSize="3xl" fontWeight="bold" mb="6">여행 리뷰</Text>

		<HStack mb="8">
			<Input
				variant="outline"
				size="xl"
				placeholder="여행 리뷰 검색"
				value={word}
				onChange={e => setWord(e.target.value)}
				onKeyDown={e => e.key === "Enter" && handleSearch()}
			/>
			<Button variant="subtle" size="xl" color="var(--white_color)" bg="var(--brand_color)" onClick={handleSearch}><LuSearch /></Button>
			<Button variant="outline" size="xl" color="var(--black_color)" bg="var(--white_color)" onClick={handleReset}><LuRotateCcw /></Button>
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
											<Text fontSize="sm" fontWeight="bold">{e.reviewDate}</Text>
											<Text fontSize="sm" fontWeight="bold">{e.content ?? "-"}</Text>
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
													<Button onClick={() => deleteReservation(e.id)}>확인</Button>
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

		{totalPages > 1 && (
			<Box mt="10">
				<PageForm currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
			</Box>
		)}
	</React.Fragment>
}
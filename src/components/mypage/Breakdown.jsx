import React, { useState, useMemo } from "react";
import
{
	LuCalendarCheck,
	LuSearch,
	LuRotateCcw
} from "react-icons/lu";
import
{
	Box,
	Text,
	Stack,
	HStack,
	Card,
	Input,
	Button,
	Portal,
	CloseButton,
	Dialog
} from "@chakra-ui/react";

import PageForm from "@components/mypage/PageForm.jsx";

const PAGE_SIZE = 5;

const RESERVATIONS = [
  { id: 1, name: "서울 강남 호텔", dateF: "2025.01.05", dateT: "2025.01.07", price: "250,000원", status: "reserved" },
  { id: 2, name: "부산 해운대 리조트", dateF: "2025.01.10", dateT: "2025.01.12", price: "300,000원", status: "used" },
  { id: 3, name: "제주 오션뷰 호텔", dateF: "2025.02.01", dateT: "2025.02.03", price: "350,000원", status: "cancel" },
  { id: 4, name: "강릉 바다 리조트", dateF: "2025.02.15", dateT: "2025.02.16", price: "180,000원", status: "reserved" },
  { id: 5, name: "대전 시티 호텔", dateF: "2025.03.01", dateT: "2025.03.02", price: "200,000원", status: "used" },
  { id: 6, name: "광주 모던 호텔", dateF: "2025.03.10", dateT: "2025.03.12", price: "320,000원", status: "reserved" },
  { id: 7, name: "인천 바다 호텔", dateF: "2025.04.05", dateT: "2025.04.06", price: "190,000원", status: "cancel" },
  { id: 8, name: "울산 리조트", dateF: "2025.04.15", dateT: "2025.04.17", price: "310,000원", status: "reserved" },
  { id: 9, name: "서울 시티 호텔", dateF: "2025.05.01", dateT: "2025.05.03", price: "400,000원", status: "used" },
  { id: 10, name: "제주 힐링 리조트", dateF: "2025.05.10", dateT: "2025.05.12", price: "380,000원", status: "reserved" },
];

const STATUS_STYLE = {
	reserved: { label: "예약완료", bg: "green.50", color: "green.700" },
	used: { label: "이용완료", bg: "gray.100", color: "gray.700" },
	cancel: { label: "예약취소", bg: "red.50", color: "red.600" },
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
			<Input variant="outline" size="xl" placeholder="예약 내역 검색"/>
			<Button variant="subtle" size="xl" color="var(--white_color)" bg="var(--brand_color)" onClick={applySearch}>
				<LuSearch/>
			</Button>
			<Button variant="outline" size="xl" color="var(--black_color)" bg="var(--white_color)" onClick={resetSearch}>
				<LuRotateCcw/>
			</Button>
		</HStack>
		<Stack gap="5">
			{list.map((e,i) => (
			<Card.Root key={i}>
				<Card.Body>
					<HStack justify="space-between" align="start" gap="5">
						<HStack align="start" gap="5">
							<Box p="3" rounded="lg" fontSize="xl" color="var(--brand_color)" bg="orange.50">
								<LuCalendarCheck/>
							</Box>
							<Stack gap="3">
								<Text fontSize="xl" fontWeight="bold" color="gray.800">{e.name}</Text>
								<HStack>
									<Stack>
										<Text fontSize="sm" color="gray.700">체크인</Text>
										<Text fontSize="sm" color="gray.700">체크아웃</Text>
										<Text fontSize="sm" color="gray.700">결제금액</Text>
									</Stack>
									<Stack>
										<Text fontSize="sm" fontWeight="bold">{e.dateF}</Text>
										<Text fontSize="sm" fontWeight="bold">{e.dateT}</Text>
										<Text fontSize="sm" fontWeight="bold">{e.price}</Text>
									</Stack>
								</HStack>
							</Stack>
						</HStack>
						{(() => {
							if(e.status == "reserved")
							{
								return <React.Fragment>
									<Dialog.Root placement="center">
										<Dialog.Trigger asChild>
											<Button size="xs" color="green.700" bg="green.100">예약취소</Button>
										</Dialog.Trigger>
										<Portal>
											<Dialog.Backdrop/>
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
														<CloseButton size="sm"/>
													</Dialog.CloseTrigger>
												</Dialog.Content>
											</Dialog.Positioner>
										</Portal>
									</Dialog.Root>
								</React.Fragment>
							}
							if(e.status == "used")
							{
								return <Button size="xs" color="gray.700" bg="gray.100">이용완료</Button>
							}
							if(e.status == "cancel")
							{
								return <Button size="xs" color="red.700" bg="red.100">취소</Button>
							}
						})()}
					</HStack>
				</Card.Body>
			</Card.Root>
			))}
			{list.length == 0 && (
				<Text textAlign="center" py="10" color="gray.400">예약 내역이 없습니다.</Text>
			)}
		</Stack>
		{totalPages > 1 && (
			<Box mt="10">
				<PageForm currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
			</Box>
		)}
	</React.Fragment>
}
import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { LuCalendarArrowUp, LuCalendarArrowDown, LuUser, LuPlus, LuMinus } from "react-icons/lu";
import {
	Box,
	Flex,
	Text,
	Input,
	Button,
	IconButton,
	Popover,
} from "@chakra-ui/react";

import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import "react-day-picker/style.css";

export default function SearchForm() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [keyword, setKeyword] = useState("");
	const [dateF, setDateF] = useState("");
	const [dateT, setDateT] = useState("");
	const [person, setPerson] = useState(2);

	const [isDateFOpen, setIsDateFOpen] = useState(false);
	const [isDateTOpen, setIsDateTOpen] = useState(false);
	const [isPersonOpen, setIsPersonOpen] = useState(false);

	// ✅ URL → state 동기화
	useEffect(() => {
		setKeyword(searchParams.get("keyword") ?? "");

		const paramDateF = searchParams.get("dateF");
		const paramDateT = searchParams.get("dateT");
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		setDateF(paramDateF ?? format(today, "yyyy-MM-dd"));
		setDateT(paramDateT ?? format(tomorrow, "yyyy-MM-dd"));

		setPerson(Number(searchParams.get("personnel")) || 2);
	}, [searchParams]);

	const handleSearch = () => {
		console.log("Search button clicked", { keyword, dateF, dateT, person });
		navigate(`/list?keyword=${encodeURIComponent(keyword)}&dateF=${dateF}&dateT=${dateT}&personnel=${person}`);

		window.scrollTo({ top: 0 });
	};

	const handleDateFSelect = (date) => {
		if (date) {
			setDateF(format(date, "yyyy-MM-dd"));
			setIsDateFOpen(false);
			// 체크아웃 날짜가 체크인 날짜보다 전이면 자동으로 체크인 다음날로 설정
			if (dateT && new Date(date) >= new Date(dateT)) {
				const nextDay = new Date(date);
				nextDay.setDate(nextDay.getDate() + 1);
				setDateT(format(nextDay, "yyyy-MM-dd"));
			}
		}
	};

	const handleDateTSelect = (date) => {
		if (date) {
			setDateT(format(date, "yyyy-MM-dd"));
			setIsDateTOpen(false);
		}
	};

	return <React.Fragment>
		<Flex gap="4" direction={{ base: "column", md: "row" }}>
			<Flex flex="1" gap="4" flexWrap="wrap">
				<Input variant="subtle" size={{ base: "md", md: "xl" }} flex="auto" placeholder="여행지나 숙소를 검색해보세요." value={keyword} onChange={(e) => setKeyword(e.target.value)} />

				{/* Check-in Date Popover */}
				<Popover.Root open={isDateFOpen} onOpenChange={(e) => setIsDateFOpen(e.open)}>
					<Popover.Trigger asChild>
						<Button variant="subtle" size={{ base: "md", md: "xl" }} flex={{ base: "auto", md: "1" }} justifyContent="start" alignItems="center">
							<LuCalendarArrowUp size={20} />
							<Text truncate ml={2}>{dateF}</Text>
						</Button>
					</Popover.Trigger>
					<Popover.Positioner>
						<Popover.Content w="auto" h="auto" bg="white" shadow="md" borderRadius="md" zIndex={100}>
							<Box p="4">
								<DayPicker
									mode="single"
									locale={ko}
									selected={dateF ? new Date(dateF) : undefined}
									onSelect={handleDateFSelect}
									disabled={{ before: new Date() }}
								/>
							</Box>
						</Popover.Content>
					</Popover.Positioner>
				</Popover.Root>

				{/* Check-out Date Popover */}
				<Popover.Root open={isDateTOpen} onOpenChange={(e) => setIsDateTOpen(e.open)}>
					<Popover.Trigger asChild>
						<Button variant="subtle" size={{ base: "md", md: "xl" }} flex={{ base: "auto", md: "1" }} justifyContent="start" alignItems="center">
							<LuCalendarArrowDown size={20} />
							<Text truncate ml={2}>{dateT}</Text>
						</Button>
					</Popover.Trigger>
					<Popover.Positioner>
						<Popover.Content w="auto" h="auto" bg="white" shadow="md" borderRadius="md" zIndex={100}>
							<Box p="4">
								<DayPicker
									mode="single"
									locale={ko}
									selected={dateT ? new Date(dateT) : undefined}
									onSelect={handleDateTSelect}
									disabled={{ before: dateF ? new Date(dateF) : new Date() }}
								/>
							</Box>
						</Popover.Content>
					</Popover.Positioner>
				</Popover.Root>

				{/* Personnel Popover */}
				<Popover.Root open={isPersonOpen} onOpenChange={(e) => setIsPersonOpen(e.open)}>
					<Popover.Trigger asChild>
						<Button variant="subtle" size={{ base: "md", md: "xl" }} flex="1" justifyContent="start" alignItems="center">
							<LuUser size={20} />
							<Text truncate ml={2}>인원 {person}명</Text>
						</Button>
					</Popover.Trigger>
					<Popover.Positioner>
						<Popover.Content bg="white" shadow="md" borderRadius="md" zIndex={100}>
							<Box p="4">
								<Flex align="center" gap="8">
									<Box>
										<Text mb="2" fontSize="lg">인원</Text>
										<Text fontSize="xs" color="gray.500">유아 및 아동도 인원수에 포함해주세요.</Text>
									</Box>
									<Flex>
										<IconButton variant="outline" size="md" onClick={() => setPerson(person > 1 ? person - 1 : 1)}><LuMinus /></IconButton>
										<IconButton variant="plain" size="md">{person}</IconButton>
										<IconButton variant="outline" size="md" onClick={() => setPerson(person + 1)}><LuPlus /></IconButton>
									</Flex>
								</Flex>
							</Box>
						</Popover.Content>
					</Popover.Positioner>
				</Popover.Root>
			</Flex>
			<Flex>
				<Button variant="plain" size={{ base: "md", md: "xl" }} w={{ base: "full", md: "150px" }} h={{ base: "", md: "full" }} color="var(--white_color)" bg="var(--brand_color)" _hover={{ bg: "var(--brand_hover_color)" }} onClick={handleSearch}>검색</Button>
			</Flex>
		</Flex>
	</React.Fragment>
}
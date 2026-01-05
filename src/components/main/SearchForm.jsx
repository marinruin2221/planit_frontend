import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { LuCalendarArrowUp, LuCalendarArrowDown, LuUser, LuPlus, LuMinus } from "react-icons/lu";
import {
	Box,
	Flex,
	Text,
	Input,
	Button,
	IconButton,
	Popover,
	Portal
} from "@chakra-ui/react";

import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css";

export default function SearchForm()
{
	const navigate = useNavigate();

	const [keyword, setKeyword] = useState("");
	const [dateF, setDateF] = useState(new Date().toLocaleDateString("ko-KR"));
	const [dateT, setDateT] = useState(new Date().toLocaleDateString("ko-KR"));
	const [person, setPerson] = useState(2);

	const handleSearch = () => {
		navigate(`/list?keyword=${encodeURIComponent(keyword)}&dateF=${dateF}&dateT=${dateT}&personnel=${person}`);
	};

	return <React.Fragment>
		<Flex gap="4" direction={{ base: "column", md: "row" }}>
			<Flex flex="1" gap="4" flexWrap="wrap">
				<Input variant="subtle" size={{ base: "md", md: "xl" }} flex="auto" placeholder="여행지나 숙소를 검색해보세요." value={keyword} onChange={(e) => setKeyword(e.target.value)}/>

				<Popover.Root>
					<Popover.Trigger asChild>
						<Button variant="subtle" size={{ base: "md", md: "xl" }} flex={{ base: "auto", md: "1" }} justifyContent="start" alignItems="center">
							<LuCalendarArrowUp size={20}/>
							<Text truncate>{dateF}</Text>
						</Button>
					</Popover.Trigger>
					<Portal>
						<Popover.Positioner>
						<Popover.Content w="auto" h="auto">
							<Box p="4">
								<DayPicker mode="single" locale={ko} disabled={{ before: new Date() }} onSelect={(date) => { setDateF(date.toLocaleDateString("ko-KR")) }} />
							</Box>
						</Popover.Content>
						</Popover.Positioner>
					</Portal>
				</Popover.Root>

				<Popover.Root>
					<Popover.Trigger asChild>
						<Button variant="subtle" size={{ base: "md", md: "xl" }} flex={{ base: "auto", md: "1" }} justifyContent="start" alignItems="center">
							<LuCalendarArrowDown size={20}/>
							<Text truncate>{dateT}</Text>
						</Button>
					</Popover.Trigger>
					<Portal>
						<Popover.Positioner>
						<Popover.Content w="auto" h="auto">
							<Box p="4">
								<DayPicker mode="single" locale={ko} disabled={{ before: new Date() }} onSelect={(date) => { setDateT(date.toLocaleDateString("ko-KR")) }} />
							</Box>
						</Popover.Content>
						</Popover.Positioner>
					</Portal>
				</Popover.Root>

				<Popover.Root>
					<Popover.Trigger asChild>
						<Button variant="subtle" size={{ base: "md", md: "xl" }} flex="1" justifyContent="start" alignItems="center">
							<LuUser size={20}/>
							<Text truncate>인원 {person}명</Text>
						</Button>
					</Popover.Trigger>
					<Portal>
						<Popover.Positioner>
						<Popover.Content>
							<Box p="4">
								<Flex align="center" gap="8">
									<Box>
										<Text mb="2" fontSize="lg">인원</Text>
										<Text fontSize="xs" color="gray.500">유아 및 아동도 인원수에 포함해주세요.</Text>
									</Box>
									<Flex>
										<IconButton variant="outline" size="md" onClick={() => setPerson(person > 0 ? person - 1 : 0)}><LuMinus/></IconButton>
										<IconButton variant="plain" size="md">{person}</IconButton>
										<IconButton variant="outline" size="md" onClick={() => setPerson(person + 1)}><LuPlus/></IconButton>
									</Flex>
								</Flex>
							</Box>
						</Popover.Content>
						</Popover.Positioner>
					</Portal>
				</Popover.Root>
			</Flex>
			<Flex>
				<Button variant="plain" size={{ base: "md", md: "xl" }} w={{ base: "full", md: "150px" }} h={{ base: "", md: "full" }} color="var(--white_color)" bg="var(--brand_color)" _hover={{bg:"var(--brand_hover_color)"}} onClick={handleSearch}>검색</Button>
			</Flex>
		</Flex>
	</React.Fragment>
}
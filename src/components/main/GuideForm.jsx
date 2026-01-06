import React from "react";
import { LuSearch, LuCalendarDays, LuBadgeCheck } from "react-icons/lu";
import {
	Box,
	Flex,
	Text
} from "@chakra-ui/react";

export default function GuideForm()
{
	return <React.Fragment>
		<Box p={{ base: "8", md: "20" }} rounded="xl" bg="gray.100">
			<Flex direction="column" gap="2" mb={{ base: "6", md: "12" }}>
				<Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
					이용 방법
				</Text>
				<Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
					처음이라도 걱정 없이, 이렇게 이용하세요
				</Text>
			</Flex>

			<Flex gap={{ base: "6", md: "10" }} direction={{ base: "column", md: "row" }}>
				{/* Step 1 */}
				<Box
					flex="1"
					bg="white"
					p="8"
					rounded="xl"
					textAlign="center"
					boxShadow="sm"
					role="group"
					border="1px solid"
					borderColor="transparent"
					transition="all 0.25s ease"
					_hover={{
						transform: "translateY(-6px)",
						boxShadow: "lg",
						borderColor: "var(--brand_color)",
					}}
				>
					<Box
						fontSize="36px"
						color="var(--brand_color)"
						mb="4"
						w="64px"
						h="64px"
						mx="auto"
						display="flex"
						alignItems="center"
						justifyContent="center"
						rounded="full"
						bg="gray.100"
						transition="all 0.25s ease"
						_groupHover={{
							bg: "var(--brand_color)",
							color: "white",
							transform: "scale(1.05)",
						}}
					>
						<LuSearch />
					</Box>
					<Text fontSize="lg" fontWeight="bold" mb="2">
						여행지 검색
					</Text>
					<Text fontSize="sm" color="gray.600">
						여행지나 숙소를 검색해보세요
					</Text>
				</Box>

				{/* Step 2 */}
				<Box
					flex="1"
					bg="white"
					p="8"
					rounded="xl"
					textAlign="center"
					boxShadow="sm"
					role="group"
					border="1px solid"
					borderColor="transparent"
					transition="all 0.25s ease"
					_hover={{
						transform: "translateY(-6px)",
						boxShadow: "lg",
						borderColor: "var(--brand_color)",
					}}
				>
					<Box
						fontSize="36px"
						color="var(--brand_color)"
						mb="4"
						w="64px"
						h="64px"
						mx="auto"
						display="flex"
						alignItems="center"
						justifyContent="center"
						rounded="full"
						bg="gray.100"
						transition="all 0.25s ease"
						_groupHover={{
							bg: "var(--brand_color)",
							color: "white",
							transform: "scale(1.05)",
						}}
					>
						<LuCalendarDays />
					</Box>
					<Text fontSize="lg" fontWeight="bold" mb="2">
						일정 선택
					</Text>
					<Text fontSize="sm" color="gray.600">
						체크인과 체크아웃 날짜를 선택하세요
					</Text>
				</Box>

				{/* Step 3 */}
				<Box
					flex="1"
					bg="white"
					p="8"
					rounded="xl"
					textAlign="center"
					boxShadow="sm"
					role="group"
					border="1px solid"
					borderColor="transparent"
					transition="all 0.25s ease"
					_hover={{
						transform: "translateY(-6px)",
						boxShadow: "lg",
						borderColor: "var(--brand_color)",
					}}
				>
					<Box
						fontSize="36px"
						color="var(--brand_color)"
						mb="4"
						w="64px"
						h="64px"
						mx="auto"
						display="flex"
						alignItems="center"
						justifyContent="center"
						rounded="full"
						bg="gray.100"
						transition="all 0.25s ease"
						_groupHover={{
							bg: "var(--brand_color)",
							color: "white",
							transform: "scale(1.05)",
						}}
					>
						<LuBadgeCheck />
					</Box>
					<Text fontSize="lg" fontWeight="bold" mb="2">
						예약 완료
					</Text>
					<Text fontSize="sm" color="gray.600">
						마음에 드는 숙소를 바로 예약하세요
					</Text>
				</Box>
			</Flex>
		</Box>
	</React.Fragment>
}
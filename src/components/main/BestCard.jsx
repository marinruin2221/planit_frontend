// React
import React from "react";

// Chakra UI
import { Box , Flex , Text , Button , Image , Icon } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import "swiper/css";

export default function BestCard()
{
	return <React.Fragment>
		<Flex justify={"space-between"} pb={"4"}>
			<Box>
				<Text fontSize={"2xl"} fontWeight={"bold"}>국내 인기 여행지</Text>
				<Text>지금 안 가면 아쉬운 곳</Text>
			</Box>
			<Box>
				<Button variant={"plain"} size={"xs"} color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}}>
					<Text>More</Text>
					<Icon as={LuArrowRight}/>
				</Button>
			</Box>
		</Flex>
		<Swiper slidesPerView={"auto"} spaceBetween={20}>
			<SwiperSlide style={{width:"250px",height:"auto"}}>
				<Image w={"250px"} h={"200px"} src={"https://image.goodchoice.kr/resize_360x360/exhibition/cms/Region_Seoul_01_20231103164358.png"}/>
				<Flex direction={"column"} align={"start"} pt={"2"}>
					<Text fontSize={"md"}>펜션</Text>
					<Text fontSize={"xl"}>제주 펜션 1호점</Text>
				</Flex>
				<Flex direction={"column"} align={"end"} pt={"2"}>
					<Text fontSize={"md"}>80,000원</Text>
					<Text fontSize={"xl"}>23,000원</Text>
				</Flex>
			</SwiperSlide>
		</Swiper>
	</React.Fragment>
}
// React
import React from "react";

// Chakra UI
import { Box , Flex , Text , Button , Card , Icon , Image } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import "swiper/css";

export default function BestCard()
{
	return <React.Fragment>
		<Flex justify={"space-between"} align={"center"} pb={"4"}>
			<Text fontSize={"2xl"} fontWeight={"bold"}>국내 인기 여행지</Text>
			<Flex>
				<Button variant={"plain"} size={"sm"} color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}}>
					<Text>More</Text>
					<Icon as={LuArrowRight}/>
				</Button>
			</Flex>
		</Flex>
		<Swiper slidesPerView={"auto"} spaceBetween={20}>
			<SwiperSlide style={{width:"200px",height:"200px"}}>
				<Card.Root pos={"relative"} overflow={"hidden"} cursor={"pointer"}>
					<Box pos={"absolute"} inset={"auto auto 0 0"} w={"full"} h={"auto"} px={"4"} py={"2"} bg={"linear-gradient(to top,rgba(0,0,0,0.5),transparent)"}>
						<Text fontSize={"2xl"} fontWeight={"bold"} color={"var(--white_color)"}>서울</Text>
					</Box>
					<Image src={"https://image.goodchoice.kr/resize_360x360/exhibition/cms/Region_Seoul_01_20231103164358.png"}/>
				</Card.Root>
			</SwiperSlide>
		</Swiper>
	</React.Fragment>
}
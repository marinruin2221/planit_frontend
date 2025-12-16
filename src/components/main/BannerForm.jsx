// React
import React from "react";

// Chakra UI
import { Box , Stack , Text , Image } from "@chakra-ui/react"

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function BannerForm()
{
	return <React.Fragment>
		<Swiper pagination={true} modules={[Pagination]} spaceBetween="50">
			<SwiperSlide>
				<Box position="relative" rounded="md" overflow="hidden">
					<Image w="full" h={{base:"250px",md:"500px"}} src="https://static.yeogi.com/_next/static/media/03_Kv_PC_Light_B.fcfed8ce.webp"/>
					<Stack position="absolute" top={{base:"auto",md:"0"}} bottom={{base:"0",md:"auto"}} left="0" p={{base:"5",md:"10"}} gap={{base:"5",md:"10"}}>
						<Text fontSize={{base:"3xl",md:"5xl"}} color="var(--white_color)">지금 떠나기 좋은 순간<br/>여행의 시작은 여기서</Text>
						<Text fontSize={{base:"md",md:"xl"}} color="var(--white_color)">국내부터 해외까지, planit과 함께하세요</Text>
					</Stack>
				</Box>
			</SwiperSlide>
			<SwiperSlide>
				<Box position="relative" rounded="md" overflow="hidden">
					<Image w="full" h={{base:"250px",md:"500px"}} src="https://pages.trip.com/Hotels/images/V8HomePageBackGround.webp"/>
					<Stack position="absolute" top={{base:"auto",md:"0"}} bottom={{base:"0",md:"auto"}} left="0" p={{base:"5",md:"10"}} gap={{base:"5",md:"10"}}>
						<Text fontSize={{base:"3xl",md:"5xl"}} color="var(--white_color)">설렘을 담은 여행<br/>당신만의 일정으로</Text>
						<Text fontSize={{base:"md",md:"xl"}} color="var(--white_color)">숙소부터 일정까지 한 번에 계획하세요</Text>
					</Stack>
				</Box>
			</SwiperSlide>
		</Swiper>
	</React.Fragment>
}
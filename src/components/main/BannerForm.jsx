// React
import React from "react";

// Chakra UI
import { Flex , Text , Image } from "@chakra-ui/react";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function BannerForm()
{
	return <React.Fragment>
		<Swiper effect={"fade"} modules={[EffectFade]}>
			<SwiperSlide>
				<Flex pos={"relative"}>
					<Flex pos={"absolute"} inset={"0"} justify={"center"} align={"normal"} direction={"column"} gap={"5"} p={"20"} bg={"linear-gradient(to right,rgba(0,0,0,0.5),transparent)"}>
						<Text wordBreak={"keep-all"} fontSize={"7xl"} color={"var(--white_color)"}>여행의 시작은 여기서</Text>
						<Text wordBreak={"keep-all"} fontSize={"2xl"} color={"var(--white_color)"}>국내부터 해외까지, planit과 함께하세요</Text>
					</Flex>
					<Image w={"vw"} h={"vh"} src={"https://static.yeogi.com/_next/static/media/03_Kv_PC_Light_B.fcfed8ce.webp"}/>
				</Flex>
			</SwiperSlide>
			<SwiperSlide>
				<Flex pos={"relative"}>
					<Flex pos={"absolute"} inset={"0"} justify={"center"} align={"normal"} direction={"column"} gap={"5"} p={"20"} bg={"linear-gradient(to right,rgba(0,0,0,0.5),transparent)"}>
						<Text wordBreak={"keep-all"} fontSize={"7xl"} color={"var(--white_color)"}>당신만의 일정으로</Text>
						<Text wordBreak={"keep-all"} fontSize={"2xl"} color={"var(--white_color)"}>숙소부터 일정까지 한 번에 계획하세요</Text>
					</Flex>
					<Image w={"vw"} h={"vh"} src={"https://pages.trip.com/Hotels/images/V8HomePageBackGround.webp"}/>
				</Flex>
			</SwiperSlide>
		</Swiper>
	</React.Fragment>
}
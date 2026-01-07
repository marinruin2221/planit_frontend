import React from "react";
import {
	Flex,
	Text,
	Image
} from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function BannerCard()
{
	return <React.Fragment>
		<Swiper modules={[EffectFade]} effect={"fade"}>
			<SwiperSlide>
				<Image
					w="vw"
					h="vh"
					src="https://static.yeogi.com/_next/static/media/03_Kv_PC_Light_B.fcfed8ce.webp"
				/>
				<Flex
					direction="column"
					gap="4"
					justify="start"
					align="start"
					position="absolute"
					inset="0"
					px={{ base: "8", md: "36" }}
					py={{ base: "52", md: "48" }}
					bg={{
						base: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
						md: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))",
					}}
				>
					<Text
						lineHeight="1.2"
						wordBreak="keep-all"
						fontSize={{ base: "5xl", md: "7xl" }}
						color="white"
					>
						여행의 시작은 이곳에서.
					</Text>
					<Text
						lineHeight="1.2"
						wordBreak="keep-all"
						fontSize={{ base: "lg", md: "xl" }}
						color="white"
					>
						국내 인기 지역부터 숨은 명소까지
					</Text>
				</Flex>
			</SwiperSlide>

			<SwiperSlide>
				<Image
					w="vw"
					h="vh"
					src="https://pages.trip.com/Hotels/images/V8HomePageBackGround.webp"
				/>
				<Flex
					direction="column"
					gap="4"
					justify="start"
					align="start"
					position="absolute"
					inset="0"
					px={{ base: "8", md: "36" }}
					py={{ base: "52", md: "48" }}
					bg={{
						base: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
						md: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))",
					}}
				>
					<Text
						lineHeight="1.2"
						wordBreak="keep-all"
						fontSize={{ base: "5xl", md: "7xl" }}
						color="white"
					>
						지금 떠나기 좋은 국내 여행
					</Text>
					<Text
						lineHeight="1.2"
						wordBreak="keep-all"
						fontSize={{ base: "lg", md: "xl" }}
						color="white"
					>
						나에게 딱 맞는 일정으로 떠나보세요
					</Text>
				</Flex>
			</SwiperSlide>
		</Swiper>
	</React.Fragment>
}
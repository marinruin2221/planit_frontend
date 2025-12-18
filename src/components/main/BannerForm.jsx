// React
import React from "react";

// Chakra UI
import { Box , Flex , Text , Image } from "@chakra-ui/react";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function BannerForm()
{
	const chakra_relative = 
	{
		pos:"relative",
	};
	const chakra_absolute = 
	{
		pos:"absolute",
		inset:"0",
	};
	const chakra_images = 
	{
		w:"vw",
		h:"vh",
	};
	const chakra_typing = 
	{
		justify:"center",
		align:"normal",
		direction:"column",
		gap:
		{
			base:"3",
			md:"5",
		},
		p:
		{
			base:"5",
			md:"20",
		},
		bgGradient:
		{
			base:"linear-gradient(to bottom,rgba(0,0,0,0.5),transparent)",
			md:"linear-gradient(to right,rgba(0,0,0,0.5),transparent)",
		},
	};
	const chakra_main_text = 
	{
		lineHeight:"1.2",
		wordBreak:"keep-all",
		fontSize:
		{
			base:"5xl",
			md:"7xl",
		},
		color:"var(--white_color)",
	};
	const chakra_subs_text = 
	{
		lineHeight:"1.2",
		wordBreak:"keep-all",
		fontSize:
		{
			base:"md",
			md:"2xl",
		},
		color:"var(--white_color)",
	};

	return <React.Fragment>
		<Swiper effect={"fade"} modules={[EffectFade]}>
			<SwiperSlide>
				<Box {...chakra_relative}>
					<Flex {...chakra_absolute} {...chakra_typing}>
						<Text {...chakra_main_text}>여행의 시작은 여기서</Text>
						<Text {...chakra_subs_text}>국내부터 해외까지, planit과 함께하세요</Text>
					</Flex>
					<Image {...chakra_images} src={"https://static.yeogi.com/_next/static/media/03_Kv_PC_Light_B.fcfed8ce.webp"}/>
				</Box>
			</SwiperSlide>
			<SwiperSlide>
				<Box {...chakra_relative}>
					<Flex {...chakra_absolute} {...chakra_typing}>
						<Text {...chakra_main_text}>당신만의 일정으로</Text>
						<Text {...chakra_subs_text}>숙소부터 일정까지 한 번에 계획하세요</Text>
					</Flex>
					<Image {...chakra_images} src={"https://pages.trip.com/Hotels/images/V8HomePageBackGround.webp"}/>
				</Box>
			</SwiperSlide>
		</Swiper>
	</React.Fragment>
}
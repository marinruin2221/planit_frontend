// React
import React from "react";

// chakra UI
import { Container , Box , Text , Image } from "@chakra-ui/react"

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Components
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import SearchForm from "@components/main/SearchForm";

export default function MainPage()
{
	return <React.Fragment>
		<Header/>
		
		<Swiper navigation={true} modules={[Navigation]}>
			<SwiperSlide>
				<Box position="relative">
					<Image w="100vw" h="66vh"/>
					<Box position="absolute" top="10" left="10">
						<Text>planit 여행 사이트에 어서오세요.</Text>
						<Text>국내 부터 해외 까지 여행을 즐겨요</Text>
					</Box>
				</Box>
			</SwiperSlide>
			<SwiperSlide>
				<Box position="relative">
					<Image w="100vw" h="66vh"/>
					<Box position="absolute" top="10" left="10">
						<Text>planit 여행 사이트에 어서오세요. 1</Text>
					</Box>
				</Box>
			</SwiperSlide>
		</Swiper>
		
		<SearchForm/>

		<Footer/>
	</React.Fragment>
}
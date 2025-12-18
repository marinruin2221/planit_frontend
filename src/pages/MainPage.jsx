// React
import React from "react";

// Chakra UI
import { Container } from "@chakra-ui/react";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import "swiper/css";

// Components
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import BannerForm from "@components/main/BannerForm.jsx";
import SearchForm from "@components/main/SearchForm.jsx";
import BestCard from "@components/main/BestCard.jsx";

export default function MainPage()
{
	return <React.Fragment>
		<Header/>
		
		<BannerForm/>

		<Container maxW="1300px" pt="50px">
			<BestCard/>
		</Container>

		<Footer/>
	</React.Fragment>
}
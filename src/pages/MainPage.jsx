// React
import React from "react";

// Chakra UI
import { Container } from "@chakra-ui/react";

// Components
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import BannerForm from "@components/main/BannerForm.jsx";
import SearchForm from "@components/main/SearchForm.jsx";

export default function MainPage()
{
	return <React.Fragment>
		<Header/>
		
		<BannerForm/>
		<SearchForm/>

		<Footer/>
	</React.Fragment>
}
// React
import React from "react";

// Chakra UI
import { Container , Box } from "@chakra-ui/react"

// Components
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import BannerForm from "@components/main/BannerForm.jsx";
import SearchForm from "@components/main/SearchForm.jsx";

export default function MainPage()
{
	return <React.Fragment>
		<Header/>

		<Container maxW="1300px">
			<Box mt="10">
				<BannerForm/>
			</Box>
		</Container>
		<Container maxW="1300px">
			<Box mt="10" p="4" rounded="md" boxShadow="md">
				<SearchForm/>
			</Box>
		</Container>
		<Container maxW="1300px">
			<Box mt="10">
				TO-DO
			</Box>
		</Container>

		<Footer/>
	</React.Fragment>
}
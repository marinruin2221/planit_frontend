import React from "react";
import { Container } from "@chakra-ui/react";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import SigninForm from "@components/signin/SigninForm.jsx";

export default function SigninPage()
{
	return <React.Fragment>
		<Header/>

		<Container maxW={"1300px"} py={{ base: "100px", md: "150px" }}>
			<SigninForm/>
		</Container>

		<Footer/>
	</React.Fragment>
}
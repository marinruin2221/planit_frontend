// React
import React from "react";

// Chakra UI
import { Container } from "@chakra-ui/react";

// Components
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import TabForm from "@components/mypage/TabForm.jsx";

export default function MyPage() {
	return <React.Fragment>
		<Header />
		
		<Container maxW={"1300px"} pt={"50px"}>
			<TabForm/>
		</Container>

		<Footer />
	</React.Fragment>
}
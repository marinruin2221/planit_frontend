// React
import React from "react";
import { LuUser, LuCalendarCheck , LuMessageSquare } from "react-icons/lu";

// Chakra UI
import { Container , Tabs , Icon } from "@chakra-ui/react";

// Components
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import Information from "@components/mypage/Information.jsx";
import Breakdown from "@components/mypage/Breakdown.jsx";
import Review from "@components/mypage/Review.jsx";

export default function MyPage()
{
	return <React.Fragment>
		<Header/>
		
		<Container maxW={"1300px"} pt={"50px"}>
			<Tabs.Root defaultValue="1">
				<Tabs.List>
					<Tabs.Trigger flex={"1"} justifyContent={"center"} h={"auto"} py={"5"} fontSize={"md"} value={"1"}>
						<Icon as={LuUser}/>
						내정보
					</Tabs.Trigger>
					<Tabs.Trigger flex={"1"} justifyContent={"center"} h={"auto"} py={"5"} fontSize={"md"} value={"2"}>
						<Icon as={LuCalendarCheck}/>
						예약 내역
					</Tabs.Trigger>
					<Tabs.Trigger flex={"1"} justifyContent={"center"} h={"auto"} py={"5"} fontSize={"md"} value={"3"}>
						<Icon as={LuMessageSquare}/>
						여행 후기
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content pt={"50px"} value={"1"}>
					<Information/>
				</Tabs.Content>
				<Tabs.Content pt={"50px"} value={"2"}>
					<Breakdown/>
				</Tabs.Content>
				<Tabs.Content pt={"50px"} value={"3"}>
					<Review/>
				</Tabs.Content>
			</Tabs.Root>
		</Container>

		<Footer/>
	</React.Fragment>
}
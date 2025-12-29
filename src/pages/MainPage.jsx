import React from "react";
import {
	Container,
	Box
} from "@chakra-ui/react";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import BannerCard from "@components/main/BannerCard.jsx";
import SearchForm from "@components/main/SearchForm.jsx";
import AreaCard from "@components/main/AreaCard.jsx";
import StayCard from "@components/main/StayCard.jsx";
import EventForm from "@components/main/EventForm.jsx";
import GuideForm from "@components/main/GuideForm.jsx";

// Data
import { AreaList } from "@data/mockData";

export default function MainPage()
{
	return <React.Fragment>
		<Header />

		<Box pos="relative">
			<BannerCard />
			<Box pos="absolute" inset={{ base: "auto 0 3% 0", md: "auto 0 15% 0" }} zIndex="1">
				<Container maxW="1300px">
					<Box p="6" rounded="md" bg="var(--white_color)" boxShadow="0 10px 30px black">
						<SearchForm />
					</Box>
				</Container>
			</Box>
		</Box>
		<Container maxW="1300px" pt="60px">
			<AreaCard name={"국내 인기 지역"} data={AreaList} />
		</Container>
		<Container maxW="1300px" pt="60px">
			<StayCard name={"국내 인기 숙소"} />
		</Container>
		<Container maxW="1300px" pt="60px">
			<EventForm name={"진행중인 이벤트"} />
		</Container>
		<Container maxW="1300px" pt="60px">
			<GuideForm />
		</Container>

		<Footer />
	</React.Fragment>
}
// React
import React from "react";

// Chakra UI
import { Container } from "@chakra-ui/react";

// Components
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import BannerForm from "@components/main/BannerForm.jsx";
import SearchForm from "@components/main/SearchForm.jsx";
import AreaCard from "@components/main/AreaCard.jsx";
import StayCard from "@components/main/StayCard.jsx";

export default function MainPage()
{
	const AreaList = 
	[{
		id:1,
		name:"서울",
		image:"https://image.withstatic.com/295/32/102/6f52bd9340b54ae8bc413e18ec7259e0.png",
	},{
		id:1,
		name:"부산",
		image:"https://image.withstatic.com/143/54/40/86119cc7323b4afb89df198f85746276.jpg",
	}];
	const StayList = 
	[{
		id:1,
		type:"펜션",
		name:"제주 펜션 1호점",
		image:"https://image.withstatic.com/295/32/102/6f52bd9340b54ae8bc413e18ec7259e0.png",
		rating:4.5,
		review:1280,
		basePrice:100000,
		salePrice:50000,
	},{
		id:2,
		type:"호텔",
		name:"서울 시티 호텔",
		image:"https://image.withstatic.com/143/54/40/86119cc7323b4afb89df198f85746276.jpg",
		rating:4.7,
		review:980,
		basePrice:180000,
		salePrice:129000,
	}];

	return <React.Fragment>
		<Header/>
		
		<BannerForm/>

		<Container maxW="1300px" pt="50px">
			<AreaCard name={"국내 인기 지역"} more={true} data={AreaList}/>
		</Container>
		<Container maxW="1300px" pt="50px">
			<StayCard name={"국내 인기 숙소"} more={true} data={StayList}/>
		</Container>

		<Footer/>
	</React.Fragment>
}
// React
import React from "react";

// Chakra UI
import { Container , Box } from "@chakra-ui/react";

// Components
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import BannerCard from "@components/main/BannerCard.jsx";
import SearchForm from "@components/main/SearchForm.jsx";
import AreaCard from "@components/main/AreaCard.jsx";
import StayCard from "@components/main/StayCard.jsx";
import EventForm from "@components/main/EventForm.jsx";
import TagForm from "@components/main/TagForm.jsx";

export default function MainPage()
{
	const AreaList = 
	[{
		id: 1,
		subject: "서울",
		content: "도심 속 럭셔리 호텔 & 문화의 중심",
		image: "https://picsum.photos/seed/seoul/600/800",
	},{
		id: 2,
		subject: "부산",
		content: "낮에는 바다, 밤에는 야경",
		image: "https://picsum.photos/seed/busan/600/800",
	},{
		id: 3,
		subject: "대구",
		content: "미식과 쇼핑이 살아있는 도시",
		image: "https://picsum.photos/seed/daegu/600/800",
	},{
		id: 4,
		subject: "인천",
		content: "바다와 도심이 만나는 관문 도시",
		image: "https://picsum.photos/seed/incheon/600/800",
	},{
		id: 5,
		subject: "광주",
		content: "예술과 맛의 도시",
		image: "https://picsum.photos/seed/gwangju/600/800",
	},{
		id: 6,
		subject: "대전",
		content: "과학과 자연이 어우러진 도시",
		image: "https://picsum.photos/seed/daejeon/600/800",
	},{
		id: 7,
		subject: "울산",
		content: "산과 바다를 품은 산업 도시",
		image: "https://picsum.photos/seed/ulsan/600/800",
	},{
		id: 8,
		subject: "세종",
		content: "여유로운 휴식의 행정 도시",
		image: "https://picsum.photos/seed/sejong/600/800",
	},{
		id: 9,
		subject: "경기",
		content: "도심 가까운 힐링 여행지",
		image: "https://picsum.photos/seed/gyeonggi/600/800",
	},{
		id: 10,
		subject: "강원",
		content: "산과 바다, 사계절 자연 여행",
		image: "https://picsum.photos/seed/gangwon/600/800",
	},{
		id: 11,
		subject: "충북",
		content: "조용한 자연 속 힐링 여행",
		image: "https://picsum.photos/seed/chungbuk/600/800",
	},{
		id: 12,
		subject: "충남",
		content: "서해 바다와 온천의 여유",
		image: "https://picsum.photos/seed/chungnam/600/800",
	},{
		id: 13,
		subject: "전북",
		content: "한옥과 미식의 매력",
		image: "https://picsum.photos/seed/jeonbuk/600/800",
	},{
		id: 14,
		subject: "전남",
		content: "자연과 바다가 살아있는 여행지",
		image: "https://picsum.photos/seed/jeonnam/600/800",
	},{
		id: 15,
		subject: "경북",
		content: "역사와 전통을 품은 지역",
		image: "https://picsum.photos/seed/gyeongbuk/600/800",
	},{
		id: 16,
		subject: "경남",
		content: "바다와 도시가 어우러진 여행",
		image: "https://picsum.photos/seed/gyeongnam/600/800",
	},{
		id: 17,
		subject: "제주",
		content: "자연이 선물한 최고의 휴양지",
		image: "https://picsum.photos/seed/jeju/600/800",
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
	const EventList = 
	[{
		id:1,
		image:"https://contents.verygoodtour.com/Images/pc/package/main/pc_banner_14962.jpg",
	},{
		id:2,
		image:"https://image6.yanolja.com/cx-ydm/kzYJoRc7Eo9itmL8",
	},{
		id:3,
		image:"https://image6.yanolja.com/cx-ydm/qQ2a8GlG3dDs2sv0",
	},{
		id:4,
		image:"https://image6.yanolja.com/cx-ydm/gfgPQFZbAVMKIUQD",
	}];
	const SidoList = 
	[
		{ id: 1, name: "서울", link: "" },
		{ id: 2, name: "부산", link: "" },
		{ id: 3, name: "대구", link: "" },
		{ id: 4, name: "인천", link: "" },
		{ id: 5, name: "광주", link: "" },
		{ id: 6, name: "대전", link: "" },
		{ id: 7, name: "울산", link: "" },
		{ id: 8, name: "세종", link: "" },
		{ id: 9, name: "경기", link: "" },
		{ id: 10, name: "강원", link: "" },
		{ id: 11, name: "충북", link: "" },
		{ id: 12, name: "충남", link: "" },
		{ id: 13, name: "전북", link: "" },
		{ id: 14, name: "전남", link: "" },
		{ id: 15, name: "경북", link: "" },
		{ id: 16, name: "경남", link: "" },
		{ id: 17, name: "제주", link: "" },
	];

	return <React.Fragment>
		<Header/>

		<Box pos={"relative"}>
			<BannerCard/>
			<Box pos={"absolute"} inset={"auto 5% 15% 5%"} zIndex={"1"} p={"5"} rounded={"sm"} bg={"var(--white_color)"}>
				<SearchForm/>
			</Box>
		</Box>


		<Container maxW={"1300px"} pt={"50px"}>
			<AreaCard name={"국내 인기 지역"} data={AreaList}/>
		</Container>
		<Container maxW={"1300px"} pt={"50px"}>
			<StayCard name={"국내 인기 숙소"} data={StayList}/>
		</Container>
		<Container maxW={"1300px"} pt={"50px"}>
			<EventForm data={EventList}/>
		</Container>
		<Container maxW={"1300px"} pt={"50px"}>
			<TagForm name={"국내 지역"} data={SidoList}/>
		</Container>
		<Container maxW={"1300px"} pt={"50px"}>
			<TagForm name={"국내 도시"} data={SidoList}/>
		</Container>
		<Container maxW={"1300px"} pt={"50px"}>
			<TagForm name={"국내 숙소"} data={SidoList}/>
		</Container>

		<Footer/>
	</React.Fragment>
}
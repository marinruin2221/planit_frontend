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
import GuideForm from "@components/main/GuideForm.jsx";

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
		image:"https://image6.yanolja.com/cx-ydm/kzYJoRc7Eo9itmL8",
	},{
		id:2,
		image:"https://image6.yanolja.com/cx-ydm/qQ2a8GlG3dDs2sv0",
	},{
		id:3,
		image:"https://image6.yanolja.com/cx-ydm/gfgPQFZbAVMKIUQD",
	},{
		id:4,
		image:"https://image6.yanolja.com/cx-ydm/Tv7mRL1cDUvQlWxD",
	}];

	return <React.Fragment>
		<Header/>

		<Box pos="relative">
			<BannerCard/>
			<Box pos="absolute" inset={{ base: "auto 0 3% 0", md: "auto 0 15% 0" }} zIndex="1">
				<Container maxW="1300px">
					<Box p="6" rounded="md" bg="var(--white_color)" boxShadow="0 10px 30px black">
						<SearchForm/>
					</Box>
				</Container>
			</Box>
		</Box>
		<Container maxW="1300px" pt="60px">
			<AreaCard name={"국내 인기 지역"} data={AreaList}/>
		</Container>
		<Container maxW="1300px" pt="60px">
			<StayCard name={"국내 인기 숙소"} data={StayList}/>
		</Container>
		<Container maxW="1300px" pt="60px">
			<EventForm data={EventList}/>
		</Container>
		<Container maxW="1300px" pt="60px">
			<StayCard name={"리뷰가 증명한 인기 숙소"} data={StayList}/>
		</Container>
		<Container maxW="1300px" pt="60px">
			<StayCard name={"합리적인 가격의 인기 숙소"} data={StayList}/>
		</Container>
		<Container maxW="1300px" pt="60px">
			<GuideForm/>
		</Container>

		<Footer/>
	</React.Fragment>
}
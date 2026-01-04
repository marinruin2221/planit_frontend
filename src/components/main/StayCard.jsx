import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
	Box,
	Flex,
	Text,
	Image,
	Icon
} from "@chakra-ui/react";

import { Swiper , SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { getFallbackImage } from "@utils/imageUtils";

export default function StayCard({name,data})
{
	const [stay, setStay] = useState([]);

	const view = (code) => {
		location.href = "/detail/" + code;
	};
	const category = (code) => {
		if (!code) return '숙박';
		// 호텔 (B02010100)
		if (code === 'B02010100') return '호텔';
		// 콘도미니엄 (B02010200)
		if (code === 'B02010200') return '콘도미니엄';
		// 유스호스텔 (B02010300)
		if (code === 'B02010300') return '유스호스텔';
		// 펜션 (B02010400)
		if (code === 'B02010400') return '펜션';
		// 모텔 (B02010500)
		if (code === 'B02010500') return '모텔';
		// 민박 (B02010600)
		if (code === 'B02010600') return '민박';
		// 게스트하우스 (B02010700)
		if (code === 'B02010700') return '게스트하우스';
		// 홈스테이 (B02010800)
		if (code === 'B02010800') return '홈스테이';
		// 서비스드레지던스 (B02010900)
		if (code === 'B02010900') return '서비스드레지던스';
		// 한옥 (B02011000)
		if (code === 'B02011000') return '한옥';
		// 캠핑장 (B02011100)
		if (code === 'B02011100') return '캠핑장';
		// 글램핑 (B02011200)
		if (code === 'B02011200') return '글램핑';
		// 카라반 (B02011300)
		if (code === 'B02011300') return '카라반';
		// 기타 숙박 (B02011600)
		if (code === 'B02011600') return '기타';
		// 야영장/오토캠핑장 (A03020200 - 레포츠 카테고리)
		if (code === 'A03020200') return '야영장';
		// 기타 숙박 (알 수 없는 코드)
		return '숙박';
	};
	const rating = (contentid) => {
		if (!contentid) return { score: 7.5, reviewCount: 50, label: '추천해요' };

		let hash = 0;
		const str = String(contentid);

		for(let i = 0; i < str.length; i++)
		{
			hash = ((hash << 5) - hash) + str.charCodeAt(i);
			hash = hash & hash;
		}

		const score = (Math.abs(hash % 61) + 30) / 10;
		const reviewCount = (Math.abs((hash >> 8) % 111)) + 10;

		return { score: score.toFixed(1), reviewCount };
	};

	useEffect(() => {
		(async () => {
			const response = await fetch("/api/main/bestGoodStay",{method:"POST"});
			const data = await response.json();

			setStay([...data]);
		})();
	}, []);

	return <React.Fragment>
		<Flex pb={"4"}>
			<Text fontSize={"2xl"} fontWeight={"bold"}>{name}</Text>
		</Flex>
		<Swiper modules={[FreeMode]} freeMode={true} slidesPerView={"auto"} spaceBetween={"20"}>
			{stay.map((e, i) => (
				<SwiperSlide key={i} style={{width:"250px",height:"auto"}}>
					<Box cursor={"pointer"} onClick={() => view(e.contentId)}>
						<Box rounded={"md"} overflow={"hidden"}>
							<Image w={"250px"} h={"150px"} transition={"0.5s"} _hover={{transform:"scale(1.1)"}} src={e.firstimage || getFallbackImage(e.cat3)} />
						</Box>
						<Box pt={"4"}>
							<Text truncate fontSize={"xs"} color={"var(--brand_color)"}>{category(e.cat3)}</Text>
							<Text truncate fontSize={"xl"} color={"var(--black_color)"}>{e.title}</Text>
						</Box>
						<Box pt={"4"}>
							<Flex justify={"space-between"} align={"end"}>
								<Flex gap={"1"}>
									{(() => {
										const { score, reviewCount } = rating(e.contentId);

										return <React.Fragment>
											<Icon color={"var(--star_color)"} as={FaStar}/>
											<Text color={"var(--text_light_gray)"}>{score}</Text>
											<Text color={"var(--text_light_gray)"}>({reviewCount.toLocaleString()})</Text>
										</React.Fragment>
									})()}
								</Flex>
								<Box>
									<Text truncate textAlign={"end"} fontSize={"xl"} color={"var(--brand_color)"}>{e.minPrice.toLocaleString()}원</Text>
								</Box>
							</Flex>
						</Box>
					</Box>
				</SwiperSlide>
			))}
		</Swiper>
	</React.Fragment>
}
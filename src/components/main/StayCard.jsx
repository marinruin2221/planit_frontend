import React, { useEffect } from "react";
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

export default function StayCard({name,data})
{
	return <React.Fragment>
		<Flex pb={"4"}>
			<Text fontSize={"2xl"} fontWeight={"bold"}>{name}</Text>
		</Flex>
		<Swiper modules={[FreeMode]} freeMode={true} slidesPerView={"auto"} spaceBetween={"20"}>
			{data.map((e,i)=>(
			<SwiperSlide key={i} style={{width:"250px",height:"auto"}}>
				<Box cursor={"pointer"}>
					<Box rounded={"md"} overflow={"hidden"}>
						<Image w={"250px"} h={"150px"} transition={"0.5s"} _hover={{transform:"scale(1.1)"}} src={e.image}/>
					</Box>
					<Box pt={"4"}>
						<Text truncate fontSize={"xs"} color={"var(--brand_color)"}>{e.type}</Text>
						<Text truncate fontSize={"xl"} color={"var(--black_color)"}>{e.name}</Text>
					</Box>
					<Box pt={"4"}>
						<Flex justify={"space-between"} align={"end"}>
							<Flex gap={"1"}>
								<Icon color={"var(--star_color)"} as={FaStar}/>
								<Text color={"var(--text_light_gray)"}>{e.rating}</Text>
								<Text color={"var(--text_light_gray)"}>({e.review.toLocaleString()})</Text>
							</Flex>
							<Box>
								<Text truncate textAlign={"end"} fontSize={"xs"} color={"var(--text_light_gray)"} textDecor={"line-through"}>{e.basePrice.toLocaleString()}원</Text>
								<Text truncate textAlign={"end"} fontSize={"xl"} color={"var(--brand_color)"}>{e.salePrice.toLocaleString()}원</Text>
							</Box>
						</Flex>
					</Box>
				</Box>
			</SwiperSlide>
			))}
		</Swiper>
	</React.Fragment>
}
// React
import React from "react";

// Chakra UI
import { Box , Flex , Text , Button , Image , Icon } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import "swiper/css";

export default function StayCard({name,more,data})
{
	return <React.Fragment>
		<Flex justify={"space-between"} align={"center"} pb={"4"}>
			<Box>
				<Text fontSize={"2xl"} fontWeight={"bold"}>{name}</Text>
			</Box>
			{more && (
			<Box>
				<Button variant={"plain"} size={"xs"} color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}}>
					<Text>More</Text>
					<Icon as={LuArrowRight}/>
				</Button>
			</Box>
			)}
		</Flex>
		<Swiper slidesPerView={"auto"} spaceBetween={"20"}>
			{data.map((e)=>(
			<SwiperSlide style={{width:"250px",height:"auto"}}>
				<Box cursor={"pointer"}>
					<Image w={"250px"} h={"150px"} rounded={"md"} src={e.image}/>
					<Box pt={"2"}>
						<Text truncate textAlign={"start"} fontSize={"md"} color={"var(--brand_color)"}>{e.type}</Text>
						<Text truncate textAlign={"start"} fontSize={"xl"} color={"var(--black_color)"}>{e.name}</Text>
					</Box>
					<Box pt={"2"}>
						<Flex justify={"space-between"} align={"end"}>
							<Flex gap={"1"}>
								<Icon color={"var(--star_color)"} as={FaStar}/>
								<Text color={"var(--text_light_gray)"}>{e.rating}</Text>
								<Text color={"var(--text_light_gray)"}>({e.review.toLocaleString()})</Text>
							</Flex>
							<Box>
								<Text truncate textAlign={"end"} fontSize={"md"} color={"var(--text_light_gray)"} textDecor={"line-through"}>{e.basePrice.toLocaleString()}원</Text>
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
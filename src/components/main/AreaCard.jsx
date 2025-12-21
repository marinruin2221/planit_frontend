// React
import React from "react";

// Chakra UI
import { Box , Flex , Text , Button , Image , Icon } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import "swiper/css";

export default function AreaCard({name,more,data})
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
					<Image w={"250px"} h={"350px"} rounded={"md"} src={e.image}/>
					<Box>
						<Text>{e.name}</Text>
					</Box>
				</Box>
			</SwiperSlide>
			))}
		</Swiper>
	</React.Fragment>
}
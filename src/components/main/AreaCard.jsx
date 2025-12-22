// React
import React from "react";

// Chakra UI
import { Box , Flex , Text , Button , Image , Icon } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function AreaCard({name,data})
{
	return <React.Fragment>
		<Flex justify={"space-between"} align={"center"} pb={"4"}>
			<Box>
				<Text fontSize={"2xl"} fontWeight={"bold"}>{name}</Text>
			</Box>
			<Box>
				<Button variant={"plain"} size={"xs"} color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}}>
					<Text>More</Text>
					<Icon as={LuArrowRight}/>
				</Button>
			</Box>
		</Flex>
		<Swiper modules={[FreeMode]} freeMode={true} slidesPerView={"auto"} spaceBetween={"20"}>
			{data.map((e)=>(
			<SwiperSlide style={{width:"250px",height:"auto"}}>
				<Box cursor={"pointer"}>
					<Image w={"250px"} h={"350px"} rounded={"md"} filter={"brightness(0.5)"} src={e.image}/>
					<Box pos={"absolute"} inset={"auto 0 0 0"} p={"4"}>
						<Text fontSize={"xl"} color={"var(--white_color)"}>{e.subject}</Text>
						<Text fontSize={"sm"} color={"var(--white_color)"}>{e.content}</Text>
					</Box>
				</Box>
			</SwiperSlide>
			))}
		</Swiper>
	</React.Fragment>
}
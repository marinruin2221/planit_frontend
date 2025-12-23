// React
import React from "react";

// Chakra UI
import { Box , Flex , Text , Image } from "@chakra-ui/react";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function AreaCard({name,data})
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
						<Image w={"250px"} h={"350px"} filter={"brightness(0.5)"} transition={"0.5s"} _hover={{transform:"scale(1.1)"}} src={e.image}/>
					</Box>
					<Box pos={"absolute"} inset={"auto 0 0 0"} p={"4"}>
						<Text fontSize={"xl"} color={"var(--white_color)"}>{e.subject}</Text>
						<Text fontSize={"xs"} color={"var(--white_color)"}>{e.content}</Text>
					</Box>
				</Box>
			</SwiperSlide>
			))}
		</Swiper>
	</React.Fragment>
}
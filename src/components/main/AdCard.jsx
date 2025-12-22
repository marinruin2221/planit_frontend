// React
import React from "react";

// Chakra UI
import { Box , Image } from "@chakra-ui/react";

// Swiper
import { Swiper , SwiperSlide } from "swiper/react";
import "swiper/css";

export default function AdCard({data})
{
	return <React.Fragment>
		<Swiper>
			{data.map((e)=>(
			<SwiperSlide>
				<Box rounded={"md"} overflow={"hidden"} cursor={"pointer"}>
					<Image w={"full"} h={"200px"} transition={"0.5s"} _hover={{transform:"scale(1.1)"}} src={e.image}/>
				</Box>
			</SwiperSlide>
			))}
		</Swiper>
	</React.Fragment>
}
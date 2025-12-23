// React
import React from "react";

// Chakra UI
import { Box , Flex , Image } from "@chakra-ui/react";

export default function EventForm({data})
{
	return <React.Fragment>
		<Flex gap={"5"} flexWrap={"wrap"}>
			{data.map((e,i)=>(
			<Box key={i} flex={i == 0 ? "auto" : "1"} rounded={"md"} overflow={"hidden"} cursor={"pointer"}>
				<Image transition={"0.5s"} _hover={{transform:"scale(1.1)"}} src={e.image}/>
			</Box>
			))}
		</Flex>
	</React.Fragment>
}
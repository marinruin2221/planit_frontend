// React
import React from "react";

// Chakra UI
import { Flex , Grid , GridItem , Text , Link } from "@chakra-ui/react";

export default function TagForm({name,data})
{
	return <React.Fragment>
		<Flex pb={"4"}>
			<Text fontSize={"2xl"} fontWeight={"bold"}>{name}</Text>
		</Flex>
		<Grid templateColumns={"repeat(5,1fr)"} gap={"4"}>
			{data.map((e,i)=>(
			<GridItem key={i}>
				<Link outline={"none"} textDecor={"none"} color={"var(--text_gray)"} _hover={{color:"var(--brand_color)"}} href={e.link}>{e.name}</Link>
			</GridItem>
			))}
		</Grid>
	</React.Fragment>
}
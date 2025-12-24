// React
import React from "react";

// Chakra UI
import { Flex, Box, Image } from "@chakra-ui/react";

export default function EventForm({data})
{
	return <React.Fragment>
		<Flex gap={5} flexWrap="wrap">
			{data.map((e, i) => (
			<Box key={i} flex={i === 0 ? "0 0 100%" : "1 1 calc(33.333% - 20px)"} rounded="md" overflow="hidden" cursor="pointer">
				<Image width="100%" height="auto" src={e.image} transition="0.5s" _hover={{transform:"scale(1.1)"}}/>
			</Box>
			))}
		</Flex>
	</React.Fragment>
}
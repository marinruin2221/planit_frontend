import React from "react";
import {
	Box,
	Flex,
	Image
} from "@chakra-ui/react";

export default function EventForm({data})
{
	return <React.Fragment>
		<Flex gap={5} flexWrap="wrap" direction={{ base: "column", md: "row" }}>
			{data.map((e, i) => (
				<Box
					key={i}
					rounded="md"
					overflow="hidden"
					cursor="pointer"
					flex={{
						base: "0 0 100%",
						md: i === 0
							? "0 0 100%"
							: "1 1 calc(33.333% - 20px)",
					}}
				>
					<Image
						width="100%"
						height="150px"
						src={e.image}
						transition="0.5s"
						_hover={{ transform: "scale(1.1)" }}
					/>
				</Box>
			))}
		</Flex>
	</React.Fragment>
}
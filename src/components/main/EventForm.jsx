import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import {
	Box,
	Flex,
	Text,
	Button,
	Image
} from "@chakra-ui/react";

export default function EventForm()
{
	const [event,setEvent] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://localhost:5002/api/main/eventSelect",{method:"GET"})
		.then(res => res.json())
		.then(data => {
			setEvent(data);
		})
		.catch(err => console.error(err));
	}, []);

	return <React.Fragment>
		<Flex justify={"space-between"} pb={"4"}>
			<Text fontSize={"2xl"} fontWeight={"bold"}>진행중인 이벤트</Text>
			<Button size={"xs"} color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}} onClick={() => navigate(`/event`)}>
				More
				<LuArrowRight/>
			</Button>
		</Flex>
		<Flex gap="5" flexWrap="wrap" direction={{ base: "column", md: "row" }}>
			{event.map((e, i) => (
				<Box
					key={i}
					rounded="md"
					overflow="hidden"
					cursor="pointer"
					flex="1"
					onClick={() => navigate(`/event/${e.id}`)}
				>
					<Image
						width="100%"
						height="150px"
						src={e.imageUrl}
						transition="0.5s"
						_hover={{ transform: "scale(1.1)" }}
					/>
				</Box>
			))}
		</Flex>
	</React.Fragment>
}
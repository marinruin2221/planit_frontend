// React
import React from "react";

// Chakra UI
import { Flex , Text , Tabs } from "@chakra-ui/react";

export default function TabForm()
{
	return <React.Fragment>
		<Flex mb={"6"}>
			<Text fontSize={"3xl"} fontWeight={"bold"}>Mypage</Text>
		</Flex>
		<Tabs.Root>
			<Tabs.List>
				<Tabs.Trigger value="1">내정보</Tabs.Trigger>
				<Tabs.Trigger value="2">예약내역</Tabs.Trigger>
				<Tabs.Trigger value="3">여행후기</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="1">
				1
			</Tabs.Content>
			<Tabs.Content value="2">
				2
			</Tabs.Content>
			<Tabs.Content value="3">
				3
			</Tabs.Content>
		</Tabs.Root>
	</React.Fragment>
}
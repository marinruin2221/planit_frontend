import React, { useState, useEffect } from "react";
import
{
	Text,
	Stack,
	HStack,
	Button,
} from "@chakra-ui/react";

export default function Information()
{
	const [information, setInformation] = useState(null);

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:5002/api/mypage/information",{
				method:"POST",
				headers:
				{
					"Content-Type":"application/json"
				},
				body:JSON.stringify
				({
					userId:localStorage.getItem("userId"),
				}),
			});
			const data = await response.json();
			
			setInformation(data);
		})();
	}, []);

	if(!information){ return <React.Fragment>로딩중...</React.Fragment> }

	return <React.Fragment>
		
		<Text fontSize="3xl" fontWeight="bold" mb="6">내정보</Text>
		<Stack gap="5">
			<Stack>
				<Text color="gray.500">아이디</Text>
				<Text>{information.userId}</Text>
			</Stack>
			<Stack>
				<Text color="gray.500">닉네임</Text>
				<Text>{information.name}</Text>
			</Stack>
			<Stack>
				<Text color="gray.500">이메일</Text>
				<Text>{information.email}</Text>
			</Stack>
			<Stack>
				<Text color="gray.500">생년월일</Text>
				<HStack>
					<Text>{information.birthY}년</Text>
					<Text>{information.birthM}월</Text>
					<Text>{information.birthD}일</Text>
				</HStack>
			</Stack>
			<Stack>
				<Text color="gray.500">성별</Text>
				<Text>{information.gender == "M" ? "남자" : information.gender == "F" ? "여자" : "기타"}</Text>
			</Stack>
			<HStack>
				<Button variant="plain" flex="1" color="var(--white_color)" bg="var(--brand_color)" _hover={{bg:"var(--brand_hover_color)"}}>회원정보 수정</Button>
				<Button variant="outline" flex="1">회원탈퇴</Button>
			</HStack>
		</Stack>
	</React.Fragment>
}
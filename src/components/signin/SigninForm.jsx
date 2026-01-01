import React, { useState } from "react";
import {
	Box,
	Text,
	Stack,
	Field,
	Input,
	Button,
	HStack
} from "@chakra-ui/react";

export default function SigninForm()
{
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");

	const signin = () => {
		fetch("http://localhost:5002/api/signin/signin",{
			method:"POST",
			headers:
			{
				"Content-Type":"application/json"
			},
			body:JSON.stringify
			({
				userId:id,
				userPw:pw,
			}),
		})
		.then(res => res.json())
		.then(data => {
			if(data.result == "Y")
			{
				localStorage.setItem("token", data.token);
				localStorage.setItem("id", data.id);
				localStorage.setItem("userId", data.userId);
				localStorage.setItem("userPw", data.userPw);

				location.href = "/main";
			}
			else
			{
				alert("아이디나 비밀번호를 확인해 주세요.");
			}
		});
	}

	const naver = () => console.log("네이버 로그인 클릭");
	const kakao = () => console.log("카카오 로그인 클릭");
	const google = () => console.log("구글 로그인 클릭");

	return <React.Fragment>
		<Stack maxW="400px" m="auto" gap="5" p="5" bg="white">
			<Box>
				<Text fontSize="3xl" fontWeight="bold" textAlign="center">로그인</Text>
			</Box>

			<Field.Root required>
				<Field.Label>아이디</Field.Label>
				<Input type="text" name="id" placeholder="아이디를 입력하세요" value={id} onChange={(e) => setId(e.target.value)}/>
			</Field.Root>

			<Field.Root required>
				<Field.Label>비밀번호</Field.Label>
				<Input type="password" name="pw" placeholder="비밀번호를 입력하세요" value={pw} onChange={(e) => setPw(e.target.value)}/>
			</Field.Root>

			<Button color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}} onClick={signin}>로그인</Button>

			<Text textAlign="center" fontSize="sm" color="gray.500">또는 소셜 계정으로 로그인</Text>

			<HStack>
				<Button bg="#03C75A" color="white" flex="1" _hover={{bg:"#02A64E"}} onClick={naver}>네이버</Button>
				<Button bg="#FFCD00" color="white" flex="1" _hover={{bg:"#E6B800"}} onClick={kakao}>카카오</Button>
				<Button bg="#4285F4" color="white" flex="1" _hover={{bg:"#357AE8"}} onClick={google}>구글</Button>
			</HStack>
		</Stack>
	</React.Fragment>
}
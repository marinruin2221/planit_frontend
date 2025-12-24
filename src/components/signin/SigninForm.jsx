// React
import React, { useState } from "react";

// Chakra UI
import { Box, Text, Stack, Field, Input, Button, HStack } from "@chakra-ui/react";

export default function SigninForm() {
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");

	const handleLogin = () => {
		console.log("아이디:", id);
		console.log("비밀번호:", pw);
	};

	const handleNaverLogin = () => {
		console.log("네이버 로그인 클릭");
	};

	const handleKakaoLogin = () => {
		console.log("카카오 로그인 클릭");
	};

	const handleGoogleLogin = () => {
		console.log("구글 로그인 클릭");
	};

	return <React.Fragment>
		<Stack maxW={"400px"} m={"auto"} gap={5} p={5} bg="white" borderRadius="xl" boxShadow="lg">
			<Box>
				<Text fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"}>로그인</Text>
			</Box>

			<Field.Root required>
				<Field.Label>아이디</Field.Label>
				<Input
					name="id"
					placeholder="아이디를 입력하세요"
					value={id}
					onChange={(e) => setId(e.target.value)}
				/>
			</Field.Root>

			<Field.Root required>
				<Field.Label>비밀번호</Field.Label>
				<Input
					name="pw"
					type="password"
					placeholder="비밀번호를 입력하세요"
					value={pw}
					onChange={(e) => setPw(e.target.value)}
				/>
			</Field.Root>

			<Button
				color={"var(--white_color)"}
				bg={"var(--brand_color)"}
				onClick={handleLogin}
				_hover={{ bg: "var(--brand_hover_color)" }}
			>
				로그인
			</Button>

			<Text textAlign="center" fontSize="sm" color="gray.500">
				또는 소셜 계정으로 로그인
			</Text>

			<HStack spacing={4} justify="center">
				<Button
					bg="#03C75A"
					color="white"
					flex={1}
					onClick={() => handleNaverLogin()}
					_hover={{ bg: "#02A64E" }}
				>
					네이버
				</Button>
				<Button
					bg="#FFCD00"
					color="white"
					flex={1}
					onClick={() => handleKakaoLogin()}
					_hover={{ bg: "#E6B800" }}
				>
					카카오
				</Button>
				<Button
					bg="#4285F4"
					color="white"
					flex={1}
					onClick={() => handleGoogleLogin()}
					_hover={{ bg: "#357AE8" }}
				>
					구글
				</Button>
			</HStack>
		</Stack>
	</React.Fragment>
}
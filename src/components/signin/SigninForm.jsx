import React, { useState } from "react";
import {
	Box,
	Text,
	Stack,
	Field,
	Input,
	Button,
	HStack,
	Dialog,
	Portal
} from "@chakra-ui/react";
import ErrorDialog from "@components/common/ErrorDialog.jsx";
import { getErrorMessage } from "@src/utils/httpError.js";

export default function SigninForm()
{
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const [findId, setFindId] = useState("");
	const [findEmail, setFindEmail] = useState("");
	const [findBirthY, setFindBirthY] = useState("");
	const [findBirthM, setFindBirthM] = useState("");
	const [findBirthD, setFindBirthD] = useState("");
	const [find, setFind] = useState("");

	const [errorOpen, setErrorOpen] = useState(false);
	const [errorTitle, setErrorTitle] = useState("로그인 실패");
	const [errorMessage, setErrorMessage] = useState("");

	const openError = (title, message) => {
		setErrorTitle(title || "요청 실패");
		setErrorMessage(message || "알 수 없는 오류가 발생했습니다.");
		setErrorOpen(true);
	};

	const signin = async () => {
		try {
		  const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
			  userId: id,
			  password: pw,
			}),
		  });
	
		  if (!res.ok) {
			const msg = await getErrorMessage(res, "아이디나 비밀번호를 확인해 주세요.");
			openError("로그인 실패", msg);
			return;
		  }
	
		  const data = await res.json();

		  localStorage.setItem("userId", data.userId);
		  localStorage.setItem("name", data.name ?? "");
		  localStorage.setItem("email", data.email ?? "");
	
		  // ✅ 로그인 성공 후 이동
		  location.href = "/main";
		} catch (e) {
		  console.error(e);
		  alert("로그인 중 오류가 발생했습니다.");
		}
	  };
	
	  const signup = () => {
		location.href = "/signup";
	  };
	
	  const findid = async () => {
		try {
		  const res = await fetch("/api/auth/findid", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  email: findEmail,
			  birthY: findBirthY,
			  birthM: findBirthM,
			  birthD: findBirthD,
			}),
		  });
	
		  const data = await res.json();

		  setFind(data.result);
	
		  if (data.result === "Y") {
			setFindId(data.userId);
		  }
		} catch (e) {
		  console.error(e);
		  alert("아이디 찾기 중 오류가 발생했습니다.");
		}
	  };
	
	  const findReset = () => {
		setFind("");
		setFindId("");
	  };

	const naver = () => console.log("네이버 로그인 클릭");
	const kakao = () => console.log("카카오 로그인 클릭");
	const google = () => console.log("구글 로그인 클릭");

	return <React.Fragment>
		<ErrorDialog
			isOpen={errorOpen}
			title={errorTitle}
			message={errorMessage}
			onClose={() => setErrorOpen(false)}
		/>
		<Stack maxW="400px" m="auto" gap="8" p="5" bg="white">
			<Box>
				<Text fontSize="3xl" fontWeight="bold" textAlign="center">로그인</Text>
			</Box>
			<Stack gap="4">
				<Field.Root required>
					<Field.Label>아이디</Field.Label>
					<Input type="text" name="id" placeholder="아이디를 입력하세요" value={id} onChange={(e) => setId(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") signin(); }} />
				</Field.Root>
				<Field.Root required>
					<Field.Label>비밀번호</Field.Label>
					<Input type="password" name="pw" placeholder="비밀번호를 입력하세요" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") signin(); }} />
				</Field.Root>
			</Stack>
			<Stack gap="4">
				<Dialog.Root placement="center">
					<Dialog.Trigger asChild>
						<Text textAlign="end" fontSize="xs" color="gray.500" cursor="pointer" _hover={{ textDecoration: "underline", color: "gray.700" }}>아이디 찾기</Text>
					</Dialog.Trigger>
					<Portal>
						<Dialog.Backdrop />
						<Dialog.Positioner>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Title>아이디 찾기</Dialog.Title>
								</Dialog.Header>
								<Dialog.Body>
									<Stack gap="5">
										<Stack>
											<Text color="gray.500">이메일</Text>
											<Input variant="outline" placeholder="email@example.com" onChange={(e) => setFindEmail(e.target.value)} />
										</Stack>
										<Stack>
											<Text color="gray.500">생년월일</Text>
											<HStack>
												<Input variant="outline" placeholder="YYYY" onChange={(e) => setFindBirthY(e.target.value)} />
												<Input variant="outline" placeholder="MM" onChange={(e) => setFindBirthM(e.target.value)} />
												<Input variant="outline" placeholder="DD" onChange={(e) => setFindBirthD(e.target.value)} />
											</HStack>
										</Stack>
										{(() => {
											if(find == "Y")
											{
												return <React.Fragment>
													<Box p="5" textAlign="center" rounded="md" bg="gray.50">
														<Text fontSize="sm" color="gray.600">당신의 아이디는</Text>
														<Text fontSize="lg" fontWeight="bold" color="var(--brand_color)" mt="2">{findId}</Text>
													</Box>
												</React.Fragment>
											}
											if(find == "N")
											{
												return <React.Fragment>
													<Box p="5" textAlign="center" rounded="md" bg="gray.50">
														<Text fontSize="sm" color="gray.600">아이디를 찾지 못했습니다.</Text>
														<Text fontSize="sm" color="gray.600" mt="2">이메일, 생년월일을 다시 한번 확인해 주세요.</Text>
													</Box>
												</React.Fragment>
											}
											if(find == "W")
											{
												return <React.Fragment>
													<Box p="5" textAlign="center" rounded="md" bg="gray.50">
														<Text fontSize="sm" color="gray.600">회원탈퇴한 아이디 입니다.</Text>
													</Box>
												</React.Fragment>
											}
										})()}
									</Stack>
								</Dialog.Body>
								<Dialog.Footer>
									<Dialog.ActionTrigger asChild>
										<Button variant="outline" onClick={findReset}>취소</Button>
									</Dialog.ActionTrigger>
									<Button onClick={findid}>찾기</Button>
								</Dialog.Footer>
							</Dialog.Content>
						</Dialog.Positioner>
					</Portal>
				</Dialog.Root>
				<Button variant="subtle" color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}} onClick={signin}>로그인</Button>
				<Button variant="outline" onClick={signup}>회원가입</Button>
			</Stack>
			<Stack gap="4">
				<Text textAlign="center" fontSize="sm" color="gray.500">또는 소셜 계정으로 로그인</Text>
				<HStack>
					<Button bg="#03C75A" color="white" flex="1" _hover={{bg:"#02A64E"}} onClick={naver}>네이버</Button>
					<Button bg="#FFCD00" color="white" flex="1" _hover={{bg:"#E6B800"}} onClick={kakao}>카카오</Button>
					<Button bg="#4285F4" color="white" flex="1" _hover={{bg:"#357AE8"}} onClick={google}>구글</Button>
				</HStack>
			</Stack>
		</Stack>
	</React.Fragment>
}
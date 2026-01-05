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

	const signin = async () => {
		try {
		  const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			// ✅ [핵심] 세션 쿠키(JSESSIONID) 주고받기 위해 반드시 필요
			credentials: "include",
			body: JSON.stringify({
			  // ✅ 백엔드 LoginRequestDTO에 맞춤
			  userId: id,
			  password: pw,
			}),
		  });
	
		  // ✅ [수정] 기존 코드의 data.result("Y/N/W") 방식이 아니라
		  //         HTTP 상태코드 + message(JSON)를 기준으로 처리합니다.
		  if (!res.ok) {
			let msg = "아이디나 비밀번호를 확인해 주세요.";
			try {
			  const err = await res.json();
			  if (err?.message) msg = err.message;
			} catch {
			  const text = await res.text();
			  if (text) msg = text;
			}
			alert(msg);
			return;
		  }
	
		  // 성공 응답: LoginResponseDTO (예: {id, userId, name, email})
		  const data = await res.json();
	
		  // ✅ [선택] 세션 방식이라 토큰 저장은 불필요하지만,
		  //         프론트에서 사용자 표시 등에 쓰려면 최소 정보만 저장해도 됩니다.
		  //         (원치 않으면 이 블록 삭제해도 됩니다)
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
	
	  // ✅ [주의] 아래 '아이디 찾기' API는 기존 백엔드(/api/signin/findid) 기준입니다.
	  //          지금 당신 백엔드가 이 엔드포인트를 아직 제공하지 않으면,
	  //          이 기능은 동작하지 않습니다.
	  //          (백엔드에 /api/auth/find-id 같은 API를 추가하면 그에 맞춰 수정해야 함)
	  const findid = async () => {
		try {
		  const res = await fetch("/api/signin/findid", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			credentials: "include",
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
											<Input variant="outline" onChange={(e) => setFindEmail(e.target.value)} />
										</Stack>
										<Stack>
											<Text color="gray.500">생년월일</Text>
											<HStack>
												<Input variant="outline" onChange={(e) => setFindBirthY(e.target.value)} />
												<Input variant="outline" onChange={(e) => setFindBirthM(e.target.value)} />
												<Input variant="outline" onChange={(e) => setFindBirthD(e.target.value)} />
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
// React
import React from "react";

// Chakra UI
import { Box , Text , Stack , Field , Input , Button } from "@chakra-ui/react";

export default function SigninForm()
{
	return <React.Fragment>
		<Stack maxW={"400px"} m={"auto"} py={"40"} gap={"5"}>
			<Box>
				<Text fontSize={"3xl"} fontWeight={"bold"}>로그인</Text>
			</Box>
			<Field.Root required>
				<Field.Label>
					아이디
				</Field.Label>
				<Input name="id" placeholder={"아이디를 입력하세요"}/>
			</Field.Root>
			<Field.Root required>
				<Field.Label>
					비밀번호
				</Field.Label>
				<Input name="pw" placeholder={"비밀번호를 입력하세요"}/>
			</Field.Root>
			<Button color={"var(--white_color)"} bg={"var(--brand_color)"}>로그인</Button>
		</Stack>
	</React.Fragment>
}
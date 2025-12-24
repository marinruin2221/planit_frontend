// React
import React from "react";

// Chakra UI
import { Box , Text , Stack , HStack , Field , Input , Button , RadioGroup } from "@chakra-ui/react";

export default function Information()
{
	return <React.Fragment>
		<Stack maxW={"400px"} m={"auto"} gap={"5"}>
			<Box>
				<Text fontSize={"3xl"} fontWeight={"bold"}>내정보</Text>
			</Box>
			<Field.Root required>
				<Field.Label>
					아이디
					<Field.RequiredIndicator/>
				</Field.Label>
				<Input name="id" placeholder={"아이디를 입력하세요"}/>
				<Field.ErrorText>아이디는 필수 입력입니다.</Field.ErrorText>
			</Field.Root>
			<Field.Root required>
				<Field.Label>
					닉네임
					<Field.RequiredIndicator/>
				</Field.Label>
				<Input name="name" placeholder={"닉네임을 입력하세요"}/>
			</Field.Root>
			<Field.Root required>
				<Field.Label>
					비밀번호
					<Field.RequiredIndicator/>
				</Field.Label>
				<Input name="pw" placeholder={"비밀번호를 입력하세요"}/>
			</Field.Root>
			<Field.Root required>
				<Field.Label>
					비밀번호 재입력
					<Field.RequiredIndicator/>
				</Field.Label>
				<Input name="pw_re" placeholder={"비밀번호를 다시 입력하세요"}/>
			</Field.Root>
			<Field.Root required>
				<Field.Label>
					이메일
					<Field.RequiredIndicator/>
				</Field.Label>
				<Input name="email" placeholder={"email@example.com"}/>
			</Field.Root>
			<Field.Root required>
				<Field.Label>
					생년월일
				</Field.Label>
				<HStack>
					<Input name="yyyy" placeholder={"YYYY"}/>
					<Input name="mm" placeholder={"MM"}/>
					<Input name="dd" placeholder={"DD"}/>
				</HStack>
			</Field.Root>
			<Field.Root required>
				<Field.Label>
					성별
					<Field.RequiredIndicator/>
				</Field.Label>
				<RadioGroup.Root>
					<HStack gap="3">
						<RadioGroup.Item
							name="gender"
							value="male"
							px="6"
							py="3"
							border="1px solid"
							borderColor="gray.300"
							borderRadius="md"
							cursor="pointer"
							transition="all 0.2s"
							_hover={{
							borderColor: "var(--brand_color)",
							}}
							_checked={{
							bg: "var(--brand_color)",
							borderColor: "var(--brand_color)",
							color: "white",
							fontWeight: "medium",
							}}
						>
							<RadioGroup.ItemHiddenInput />
							<RadioGroup.ItemIndicator display="none" />
							<RadioGroup.ItemText>남자</RadioGroup.ItemText>
						</RadioGroup.Item>
						<RadioGroup.Item
							name="gender"
							value="female"
							px="6"
							py="3"
							border="1px solid"
							borderColor="gray.300"
							borderRadius="md"
							cursor="pointer"
							transition="all 0.2s"
							_hover={{
							borderColor: "var(--brand_color)",
							}}
							_checked={{
							bg: "var(--brand_color)",
							borderColor: "var(--brand_color)",
							color: "white",
							fontWeight: "medium",
							}}
						>
							<RadioGroup.ItemHiddenInput />
							<RadioGroup.ItemIndicator display="none" />
							<RadioGroup.ItemText>여자</RadioGroup.ItemText>
						</RadioGroup.Item>
					</HStack>
				</RadioGroup.Root>
			</Field.Root>
			<HStack>
				<Button variant={"plain"} flex={"auto"} color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}}>회원정보 수정</Button>
				<Button variant={"plain"} flex={"1"} border={"1px solid var(--brand_color)"} color={"var(--brand_color)"}>회원탈퇴</Button>
			</HStack>
		</Stack>
	</React.Fragment>
}
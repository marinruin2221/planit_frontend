import React, { useState } from "react";
import {
	Box,
	Text,
	Stack,
	HStack,
	Input,
	Button,
	RadioGroup
} from "@chakra-ui/react";

export default function Information()
{
	const [form, setForm] = useState({
		id: "",
		name: "",
		pw: "",
		pw_re: "",
		email: "",
		yyyy: "",
		mm: "",
		dd: "",
		gender: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const validate = () => {
		const newErrors = {};
		if (!form.id) newErrors.id = "아이디는 필수 입력입니다.";
		if (!form.name) newErrors.name = "닉네임은 필수 입력입니다.";
		if (!form.pw) newErrors.pw = "비밀번호는 필수 입력입니다.";
		if (form.pw !== form.pw_re) newErrors.pw_re = "비밀번호가 일치하지 않습니다.";
		if (!form.email) newErrors.email = "이메일은 필수 입력입니다.";
		if (!form.gender) newErrors.gender = "성별을 선택해주세요.";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (!validate()) return;
		console.log("폼 제출", form);
		alert("회원정보가 수정되었습니다");
	};

	const handleDelete = () => {
		if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
			alert("회원탈퇴 처리되었습니다.");
		}
	};

	return <React.Fragment>
		<Box maxW="400px" m="auto">
			<Text fontSize="3xl" fontWeight="bold" mb="6">내정보</Text>
			<Stack gap="5">
				{/* 아이디 */}
				<Stack spacing="1">
					<Text fontWeight="medium">아이디 <Text as="span" color="red.500">*</Text></Text>
					<Input
						name="id"
						placeholder="아이디를 입력하세요"
						value={form.id}
						onChange={handleChange}
					/>
					{errors.id && <Text color="red.500" fontSize="sm">{errors.id}</Text>}
				</Stack>

				{/* 닉네임 */}
				<Stack spacing="1">
					<Text fontWeight="medium">닉네임 <Text as="span" color="red.500">*</Text></Text>
					<Input
						name="name"
						placeholder="닉네임을 입력하세요"
						value={form.name}
						onChange={handleChange}
					/>
					{errors.name && <Text color="red.500" fontSize="sm">{errors.name}</Text>}
				</Stack>

				{/* 비밀번호 */}
				<Stack spacing="1">
					<Text fontWeight="medium">비밀번호 <Text as="span" color="red.500">*</Text></Text>
					<Input
						type="password"
						name="pw"
						placeholder="비밀번호를 입력하세요"
						value={form.pw}
						onChange={handleChange}
					/>
					{errors.pw && <Text color="red.500" fontSize="sm">{errors.pw}</Text>}
				</Stack>

				{/* 비밀번호 재입력 */}
				<Stack spacing="1">
					<Text fontWeight="medium">비밀번호 재입력 <Text as="span" color="red.500">*</Text></Text>
					<Input
						type="password"
						name="pw_re"
						placeholder="비밀번호를 다시 입력하세요"
						value={form.pw_re}
						onChange={handleChange}
					/>
					{errors.pw_re && <Text color="red.500" fontSize="sm">{errors.pw_re}</Text>}
				</Stack>

				{/* 이메일 */}
				<Stack spacing="1">
					<Text fontWeight="medium">이메일 <Text as="span" color="red.500">*</Text></Text>
					<Input
						name="email"
						placeholder="email@example.com"
						value={form.email}
						onChange={handleChange}
					/>
					{errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
				</Stack>

				{/* 생년월일 */}
				<Stack spacing="1">
					<Text>생년월일</Text>
					<HStack>
						<Input name="yyyy" placeholder="YYYY" value={form.yyyy} onChange={handleChange} />
						<Input name="mm" placeholder="MM" value={form.mm} onChange={handleChange} />
						<Input name="dd" placeholder="DD" value={form.dd} onChange={handleChange} />
					</HStack>
				</Stack>

				{/* 성별 */}
				<Stack spacing="1">
					<Text>성별 <Text as="span" color="red.500">*</Text></Text>
					<RadioGroup.Root onValueChange={(value) => setForm(prev => ({ ...prev, gender: value }))}>
						<HStack>
							<RadioGroup.Item
								value="1"
								name="gender"
								px="6"
								py="3"
								border="1px solid"
								borderColor="gray.300"
								borderRadius="md"
								cursor="pointer"
								_hover={{borderColor:"var(--brand_color)"}}
								_checked={{borderColor:"var(--brand_color)",bg:"var(--brand_color)",color:"var(--white_color)"}}
							>
								<RadioGroup.ItemHiddenInput />
								<RadioGroup.ItemText>남자</RadioGroup.ItemText>
							</RadioGroup.Item>
							<RadioGroup.Item
								value="2"
								name="gender"
								px="6"
								py="3"
								border="1px solid"
								borderColor="gray.300"
								borderRadius="md"
								cursor="pointer"
								_hover={{borderColor:"var(--brand_color)"}}
								_checked={{borderColor:"var(--brand_color)",bg:"var(--brand_color)",color:"var(--white_color)"}}
							>
								<RadioGroup.ItemHiddenInput />
								<RadioGroup.ItemText>여자</RadioGroup.ItemText>
							</RadioGroup.Item>
						</HStack>
					</RadioGroup.Root>
					{errors.gender && <Text color="red.500" fontSize="sm">{errors.gender}</Text>}
				</Stack>

				{/* 버튼 */}
				<HStack>
					<Button
						flex="auto"
						color="var(--white_color)"
						bg="var(--brand_color)"
						_hover={{ bg: "var(--brand_hover_color)" }}
						onClick={handleSubmit}
					>
						회원정보 수정
					</Button>
					<Button
						flex="1"
						border="1px solid var(--brand_color)"
						color="var(--brand_color)"
						bg="white"
						onClick={handleDelete}
					>
						회원탈퇴
					</Button>
				</HStack>
			</Stack>
		</Box>
	</React.Fragment>
}
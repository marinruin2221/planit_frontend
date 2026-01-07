import React, { useState, useEffect } from "react";
import {
	Text,
	Stack,
	HStack,
	Button,
	Input,
	NativeSelect,
	Dialog,
	Portal
} from "@chakra-ui/react";

import { logout } from "@src/data/auth.js";

export default function Information()
{
	const [information, setInformation] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [form, setForm] = useState({});

	// ⭐ 원본 백업용 state 추가
	const [originForm, setOriginForm] = useState(null);

	useEffect(() => {
		(async () => {
			const response = await fetch("/api/mypage/information", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: localStorage.getItem("userId") }),
			});
			const data = await response.json();

			setInformation(data);
			setForm({ ...data, userId: localStorage.getItem("userId") });
		})();
	}, []);

	if (!information) return <React.Fragment>로딩중...</React.Fragment>;

	const handleChange = (field, value) => {
		setForm(prev => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		const response = await fetch("/api/mypage/informationUpdate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		const data = await response.json();

		if (data.emailOverlapYN == "Y")
		{
			alert("중복된 이메일입니다.");
		}
		else
		{
			setInformation(form);
			setEditMode(false);
		}
	};

	const handleWithdraw = async () => {
		await fetch("/api/mypage/withdraw", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: localStorage.getItem("userId") }),
		});

		localStorage.removeItem("userId");
		localStorage.removeItem("name");
		localStorage.removeItem("email");

		await logout();
		location.href = "/main";
	};

	return <React.Fragment>
		<Text fontSize="3xl" fontWeight="bold" mb="6">내정보</Text>
		<Stack gap="5">
			<Stack>
				<Text color="gray.500">아이디</Text>
				<Input variant="subtle" value={form.userId} readOnly />
			</Stack>

			<Stack>
				<Text color="gray.500">닉네임</Text>
				<Input
					variant={editMode ? "outline" : "subtle"}
					value={form.name}
					readOnly={!editMode}
					onChange={e => handleChange("name", e.target.value)}
				/>
			</Stack>

			<Stack>
				<Text color="gray.500">이메일</Text>
				<Input
					variant={editMode ? "outline" : "subtle"}
					value={form.email}
					readOnly={!editMode}
					onChange={e => handleChange("email", e.target.value)}
				/>
			</Stack>

			<Stack>
				<Text color="gray.500">생년월일</Text>
				<HStack>
					<Input
						variant={editMode ? "outline" : "subtle"}
						value={form.birthY}
						readOnly={!editMode}
						onChange={e => handleChange("birthY", e.target.value)}
					/>
					<Input
						variant={editMode ? "outline" : "subtle"}
						value={form.birthM}
						readOnly={!editMode}
						onChange={e => handleChange("birthM", e.target.value)}
					/>
					<Input
						variant={editMode ? "outline" : "subtle"}
						value={form.birthD}
						readOnly={!editMode}
						onChange={e => handleChange("birthD", e.target.value)}
					/>
				</HStack>
			</Stack>

			<Stack>
				<Text color="gray.500">성별</Text>
				{editMode ? (
					<NativeSelect.Root>
						<NativeSelect.Field
							value={form.gender}
							onChange={e => handleChange("gender", e.target.value)}
						>
							<option value="M">남자</option>
							<option value="F">여자</option>
						</NativeSelect.Field>
						<NativeSelect.Indicator />
					</NativeSelect.Root>
				) : (
					<Input variant="subtle" value={form.gender === "M" ? "남자" : "여자"} readOnly />
				)}
			</Stack>

			<HStack>
				{editMode ? (
					<React.Fragment>
						<Button flex="1" bg="var(--brand_color)" color="white" onClick={handleSave}>
							저장
						</Button>

						{/* ⭐ 취소 시 원본 복구 */}
						<Button
							flex="1"
							variant="outline"
							onClick={() => {
								setForm(originForm);
								setEditMode(false);
							}}
						>
							취소
						</Button>
					</React.Fragment>
				) : (
					<React.Fragment>
						{/* ⭐ 수정 시작 시 원본 백업 */}
						<Button
							flex="1"
							bg="var(--brand_color)"
							color="white"
							onClick={() => {
								setOriginForm(form);
								setEditMode(true);
							}}
						>
							회원정보 수정
						</Button>

						<Dialog.Root placement="center">
							<Dialog.Trigger asChild>
								<Button variant="outline" flex="1">회원탈퇴</Button>
							</Dialog.Trigger>
							<Portal>
								<Dialog.Backdrop />
								<Dialog.Positioner>
									<Dialog.Content>
										<Dialog.Header>
											<Dialog.Title>회원탈퇴 확인</Dialog.Title>
										</Dialog.Header>
										<Dialog.Body>
											<Text>정말 회원탈퇴를 하시겠습니까?</Text>
										</Dialog.Body>
										<Dialog.Footer>
											<Dialog.ActionTrigger asChild>
												<Button variant="outline">취소</Button>
											</Dialog.ActionTrigger>
											<Dialog.ActionTrigger asChild>
												<Button onClick={handleWithdraw}>확인</Button>
											</Dialog.ActionTrigger>
										</Dialog.Footer>
									</Dialog.Content>
								</Dialog.Positioner>
							</Portal>
						</Dialog.Root>
					</React.Fragment>
				)}
			</HStack>
		</Stack>
	</React.Fragment>
}
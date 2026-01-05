import React, { useEffect, useState } from "react";
import { Box, Container, Table, Text } from "@chakra-ui/react";

export default function UserDebugPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const API_BASE = "http://localhost:5002";
        const res = await fetch(`${API_BASE}/api/dev/users`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        setUsers(data);
      } catch (e) {
        setError(e.message || "불러오기 실패");
      }
    })();
  }, []);

  return (
    <Box bg="gray.50" py={10}>
      <Container maxW="900px">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          (개발용) 가입된 유저 목록
        </Text>

        {error && <Text color="red.500">{error}</Text>}

        <Table.Root variant="outline" size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>아이디</Table.ColumnHeader>
              <Table.ColumnHeader>이름/닉네임</Table.ColumnHeader>
              <Table.ColumnHeader>비밀번호</Table.ColumnHeader>
              <Table.ColumnHeader>이메일</Table.ColumnHeader>
              <Table.ColumnHeader>생년월일</Table.ColumnHeader>
              <Table.ColumnHeader>성별</Table.ColumnHeader>
              <Table.ColumnHeader>탈퇴</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((u) => (
              <Table.Row key={u.id}>
                <Table.Cell>{u.id}</Table.Cell>
                <Table.Cell>{u.userId}</Table.Cell>
                <Table.Cell>{u.name}</Table.Cell>
                <Table.Cell>{u.userPw}</Table.Cell>
                <Table.Cell>{u.email}</Table.Cell>
                <Table.Cell>
                  {u.birthY}-{u.birthM}-{u.birthD}
                </Table.Cell>
                <Table.Cell>{u.gender}</Table.Cell>
                <Table.Cell>{u.deleteYN}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    </Box>
  );
}

import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import SignupForm from "@components/signup/SignupForm.jsx";

export default function SignupPage() {
  return (
    <React.Fragment>
      <Header />

      <Box bg="gray.50" py={10}>
        <Container maxW="520px">
          <Box
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            rounded="lg"
            p={6}
          >
            <Text fontSize="2xl" fontWeight="bold" color="gray.900" mb={1}>
              회원가입
            </Text>
            <Text fontSize="sm" color="gray.500" mb={6}>
              아래 정보를 입력하고 약관에 동의해 주세요.
            </Text>

            <SignupForm />
          </Box>
        </Container>
      </Box>

      <Footer />
    </React.Fragment>
  );
}
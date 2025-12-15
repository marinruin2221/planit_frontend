import React from "react";

import { Box, SimpleGrid, Image, Text, Container, Input, Button, HStack } from "@chakra-ui/react";

import { LuPhone, LuMail, LuBot } from "react-icons/lu";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";

export default function CustomerservicePage()
{
	return <React.Fragment>
		<Header/>
		<Container maxW="55%" py={10}>
            <Text fontSize="3xl" fontWeight="bold" mb={1}>
                고객센터
            </Text>
            <Text fontSize="sm" fontWeight="bold" mb={6} color="gray.400">
                무엇이든 편하게 물어보세요!
            </Text>
            <Box
                bg="gray.100"
                borderRadius="md"
                p={6}
            >
                <HStack justify="space-between" align="center">
                    <Box>
                        <HStack spacing={3}>
                            <LuPhone size={20} color="#4A5568" />
                            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                                1234-1234
                            </Text>
                        </HStack>
                        <HStack spacing={3} mb={4}>
                            <LuMail size={20} color="#4A5568" />
                            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                                planitreserve@gmail.com
                            </Text>
                        </HStack>
                        <HStack spacing={3}>
                            <Text fontSize="sm" fontWeight="bold" mb={0} color="gray.400">
                                고객행복센터(전화): 오전 9시 ~ 새벽 3시 운영<br/>
                                이메일 문의: 오전 9시 ~ 오후 6시 운영
                            </Text>
                        </HStack>
                    </Box>
                    <Button
                        bg="#dd6b20"
                        color="white"
                        size="2xl"
                        fontSize="2xl"
                        fontWeight="bold"
                        _hover={{ bg: "#c05621" }}
                    >
                        <HStack spacing={2}>
                            <LuBot size={22} />
                            <Text>AI 상담</Text>
                        </HStack>
                    </Button>
                </HStack>
                
            </Box>
        </Container>
		<Footer/>
	</React.Fragment>
}
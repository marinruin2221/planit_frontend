import React from "react";

import { Box, SimpleGrid, Image, Text, Container, Input, Button, HStack, Accordion } from "@chakra-ui/react";

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
                                help@planitreserve.com
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
            <Text mt={10} mb={4} fontSize="xl" fontWeight="bold">
                자주 묻는 질문
            </Text>

            <Accordion.Root multiple>
                <Accordion.Item value="q1" mb={3}>
                    <Accordion.ItemTrigger py={4} _expanded={{ bg: "gray.50" }}>
                        <Box flex="1" textAlign="left" fontWeight="bold">
                            [숙소] 예약을 취소하고 싶어요.
                        </Box>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody pb={4} color="gray.600" fontSize="sm">
                            예약취소는  앱/웹 &gt; 내정보 &gt; 예약/구매내역에서 직접 가능합니다.
                            <br/><br/>
                            예약/결제 진행 당시 안내된 취소/환불 규정에 따라 처리되며, 취소수수료가 발생할 경우 취소수수료를 차감한 금액으로 환불 처리됩니다.
                            일부 숙소에 한해 취소가 가능한 시점이나 앱/웹에서 취소가 불가할 수 있으니 이 경우에는 고객행복센터로 요청해 주시길 바랍니다.
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item value="q2" mb={3}>
                    <Accordion.ItemTrigger py={4} _expanded={{ bg: "gray.50" }}>
                        <Box flex="1" textAlign="left" fontWeight="bold">
                            [공통] 천재지변/감염병으로 인한 예약취소는 어떻게 하나요?
                        </Box>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody pb={4} color="gray.600" fontSize="sm">
                            천재지변(기상악화), 법정 감염병 등 불가항력적인 사유로 제휴점 이용이 불가할 경우 고객행복센터로 예약내역 및 증빙서류(결항확인서, e-티켓, 진단확인서 등)를 보내주시면 확인 후 예약취소 가능 여부를 확인해 드립니다.
                            <br/><br/>
                            다만, 당사는 판매 중개 플랫폼의 입장으로 제휴점에 대하여 취소/환불을 강제할 수 없어 각 제휴점의 규정에 근거하여 상황에 따라 수수료가 발생하거나 취소가 어려울 수 있는 점 양해 부탁드립니다.
                            <br/><br/>
                            [접수방법]
                            - 이메일 : help@planitreserve.com (예약자명, 예약번호, 숙소명, 체크인 날짜 필수)
                            - 카카오톡 : 카카오톡 내 플러스 친구 &gt; 플랜잇 고객행복센터 추가
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item value="q3" >
                    <Accordion.ItemTrigger py={4} _expanded={{ bg: "gray.50" }}>
                        <Box flex="1" textAlign="left" fontWeight="bold">
                            [숙소] 예약대기 건 예약취소하고 싶어요.
                        </Box>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody pb={4} color="gray.600" fontSize="sm">
                            예약 대기중에는 여기어때 고객행복센터에 예약취소 요청해주시길 바랍니다.
                            <br/><br/>
                            단, 예약확정이 될 경우 수수료가 발생하거나 예약취소가 불가할 수 있습니다.
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

        </Container>
		<Footer/>
	</React.Fragment>
}
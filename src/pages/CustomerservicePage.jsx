import React from "react";

import { Box, SimpleGrid, Image, Text, Container, Input, Button, HStack, Accordion } from "@chakra-ui/react";

import { LuPhone, LuMail, LuBot } from "react-icons/lu";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";

export default function CustomerservicePage()
{
    const faqs = [
        {
          value: "q1",
          title: "[숙소] 예약을 취소하고 싶어요.",
          body: (
            <>
              예약취소는 앱/웹 &gt; 내정보 &gt; 예약/구매내역에서 직접 가능합니다.
              <br /><br />
              예약/결제 진행 당시 안내된 취소/환불 규정에 따라 처리되며, 취소수수료가 발생할 경우 취소수수료를 차감한 금액으로 환불 처리됩니다.
              일부 숙소에 한해 취소가 가능한 시점이나 앱/웹에서 취소가 불가할 수 있으니 이 경우에는 고객행복센터로 요청해 주시길 바랍니다.
            </>
          ),
        },
        {
          value: "q2",
          title: "[공통] 천재지변/감염병으로 인한 예약취소는 어떻게 하나요?",
          body: (
            <>
              천재지변(기상악화), 법정 감염병 등 불가항력적인 사유로 제휴점 이용이 불가할 경우 고객행복센터로 예약내역 및 증빙서류(결항확인서, e-티켓, 진단확인서 등)를 보내주시면 확인 후 예약취소 가능 여부를 확인해 드립니다.
              <br /><br />
              다만, 당사는 판매 중개 플랫폼의 입장으로 제휴점에 대하여 취소/환불을 강제할 수 없어 각 제휴점의 규정에 근거하여 상황에 따라 수수료가 발생하거나 취소가 어려울 수 있는 점 양해 부탁드립니다.
              <br /><br />
              [접수방법]
              <br />
              - 이메일 : help@planitreserve.com (예약자명, 예약번호, 숙소명, 체크인 날짜 필수)
              <br />
              - 카카오톡 : 카카오톡 내 플러스 친구 &gt; 플랜잇 고객행복센터 추가
            </>
          ),
        },
        {
          value: "q3",
          title: "[숙소] 예약대기 건 예약취소하고 싶어요.",
          body: (
            <>
              예약 대기중에는 여기어때 고객행복센터에 예약취소 요청해주시길 바랍니다.
              <br /><br />
              단, 예약확정이 될 경우 수수료가 발생하거나 예약취소가 불가할 수 있습니다.
            </>
          ),
        },
        {
          value: "q4",
          title: "[숙소] 체크인날짜/객실타입을 변경하고 싶어요.",
          body: (
            <>
              예약 결제 완료 후 날짜 및 객실타입 등 부분 변경은 불가합니다.
              <br /><br />
              예약취소와 동일하게 취소 및 환불 규정에 따라 처리되므로 예약취소가 가능한 기간에는 예약취소 후 재결제 하셔서 이용 부탁드립니다.
              <br /><br />
              만약, 예약취소가 불가하거나 수수료가 발생하는 경우라면 고객행복센터로 문의해주시길 바랍니다.
            </>
          ),
        },
        {
          value: "q5",
          title: "[공통] 현금영수증 발급받고 싶어요.",
          body: (
            <>
                현금영수증은 현금성 결제수단으로 결제 시 발급이 가능합니다.
                <br /><br />
                결제 단계에서 현금영수증을 신청하면 자동으로 발행되지만,
                신청을 누락했거나 발행받지 못한 경우라면 영수증 확인 후 국세청에서 자진발급분을 등록해 주시길 바랍니다.
                <br /><br />
                [네이버페이]
                - 결제 단계에서 현금영수증 신청하면 자동으로 발행 (19년 12월 26일 시행)
                - 자진발급 : 네이버페이 &gt; 결제내역 &gt; 주문건 &gt; 주문상세정보 &gt; 영수증 발급내역 &gt; 현금영수증 확인
                - 단, 19년 12월 26일 10시 이전 결제 건은 여기어때 고객행복센터로 요청
                <br /><br />
                [간편계좌이체 / TOSS / PAYCO]
                - 결제 단계에서 현금영수증 신청하면 자동으로 발행
                - 단, 간편계좌이체의 경우 신청 누락 시 여기어때 고객행복센터로 요청
                <br /><br />
                [카카오페이] 
                - 카카오페이머니 결제 시 자동으로 발행
                - 자진발급 : 카카오톡 &gt; pay &gt; 우측톱니바퀴(나의 카카오페이) &gt; 이용내역 &gt; 결제 &gt; 개별 상세내역 &gt; 현금영수증 확인
            </>
          ),
        },
        {
          value: "q6",
          title: "[공통] 영수증/거래내역서 발급받고 싶어요.",
          body: (
            <>
                예약 정보와 결제 정보가 기재되어 있는 영수증 또는 거래내역서는 아래의 경로를 통하여 발급받으실 수 있습니다.
                <br/><br/>
                ■ 영수증
                - 여기어때 App &gt; 내 정보 &gt; 예약 내역 &gt; 예약 상세 화면 내 결제 증빙 보기 선택 &gt; 영수증 보기
                ※ 네이버페이 결제 시 결제사 페이지에서 확인 가능
                <br/><br/>
                ■ 거래내역서
                - 여기어때 App &gt; 내 정보 &gt; 예약 내역 &gt; 예약 상세 화면 내 결제 증빙 보기 선택 &gt; 거래내역서 받기 &gt; 수령할 메일 주소 입력 후 발송
                ※ 소득 증빙 자료로 사용 불가하며(단순 거래 확인 용도이며 법적 효력 없음) 
                ※ 예약 완료(이용 확정), 이용 완료, 예약 취소 건에 대해서 발송 가능(예약 실패, 예약 대기 발송 불가)
            </>
          ),
        },
      ];
      
      // 제목에서 [] 카테고리만 추출
      const getCategory = (title) => {
        const m = title.match(/^\[([^\]]+)\]/);
        return m ? m[1] : "기타";
      };
      
      const priorityOrder = ["공통", "숙소"]; // 원하는 순서

        const extracted = Array.from(new Set(faqs.map((f) => getCategory(f.title))));

        const sortedCategories = [
        ...priorityOrder.filter((c) => extracted.includes(c)),
        ...extracted.filter((c) => !priorityOrder.includes(c)),
        ];

        const categories = ["전체", ...sortedCategories];

      
      const [activeFaqCategory, setActiveFaqCategory] = React.useState("전체");
      
      const filteredFaqs =
        activeFaqCategory === "전체"
          ? faqs
          : faqs.filter((f) => getCategory(f.title) === activeFaqCategory);
      
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
                            <Text fontSize="2xl" fontWeight="bold">
                                1234-1234
                            </Text>
                        </HStack>
                        <HStack spacing={3} mb={4}>
                            <LuMail size={20} color="#4A5568" />
                            <Text fontSize="2xl" fontWeight="bold">
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

            <HStack spacing={2} flexWrap="wrap" mb={4}>
                {categories.map((cat) => {
                    const isActive = activeFaqCategory === cat;
                    return (
                    <Button
                        key={cat}
                        size="md"
                        fontWeight="bold"
                        fontSize="md"
                        variant={isActive ? "solid" : "outline"}
                        borderRadius="full"
                        onClick={() => setActiveFaqCategory(cat)}
                        bg={isActive ? "#dd6b20" : "transparent"}
                        color={isActive ? "white" : "gray.700"}
                        borderColor={isActive ? "#dd6b20" : "gray.300"}
                        _hover={{ bg: isActive ? "#dd6b20" : "gray.100" }}
                    >
                        {cat}
                    </Button>
                    );
                })}
            </HStack>

            <Accordion.Root collapsible>
                {filteredFaqs.map((faq) => (
                    <Accordion.Item
                    key={faq.value}
                    value={faq.value}
                    mb={0}
                    borderBottom="1px solid"
                    borderColor="#DD6B20"
                    >
                    <Accordion.ItemTrigger py={6} _expanded={{ bg: "gray.100" }} _hover={{bg:"gray.100"}}>
                        <Box flex="1" textAlign="left" fontWeight="bold">
                        {faq.title}
                        </Box>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>

                    <Accordion.ItemContent>
                        <Accordion.ItemBody pb={4} color="gray.600" fontSize="sm">
                        {faq.body}
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </Container>
		<Footer/>
	</React.Fragment>
}
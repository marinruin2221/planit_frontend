import React, { useState } from "react";
import { Box, Text, Container, Button, HStack, Accordion } from "@chakra-ui/react";
import { LuPhone, LuMail, LuBot } from "react-icons/lu";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import { faqs } from "@data/faqData.jsx";
import AIRecommendationWindow from "@components/ai/AIRecommendationWindow.jsx";

export default function CustomerservicePage() {
  const [isAIWindowOpen, setIsAIWindowOpen] = useState(false);

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

  return (
    <React.Fragment>
      <Header />
      <Container maxW={{ base: "100%", md: "70%", lg: "55%" }} py={10} px={{ base: 4, md: 0 }}>
        <Text fontSize="3xl" fontWeight="bold" mb={1}>
          고객센터
        </Text>
        <Text fontSize="sm" fontWeight="bold" mb={6} color="gray.400">
          무엇이든 편하게 물어보세요!
        </Text>
        <Box bg="gray.100" borderRadius="md" p={6}>
          <HStack justify="space-between" align="center" flexDir={{ base: "column", md: "row" }}>
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
                  고객행복센터(전화): 오전 9시 ~ 새벽 3시 운영<br />
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
              onClick={() => setIsAIWindowOpen(true)}
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
              <Accordion.ItemTrigger py={6} _expanded={{ bg: "gray.100" }} _hover={{ bg: "gray.100" }}>
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
      <Footer />
      <AIRecommendationWindow
        isOpen={isAIWindowOpen}
        onClose={() => setIsAIWindowOpen(false)}
      />
    </React.Fragment>
  );
}
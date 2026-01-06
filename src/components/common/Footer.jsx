// @components/common/Footer.jsx
"use client";

import React from "react";
import { Box, Container, SimpleGrid, Text, HStack, Link, Separator } from "@chakra-ui/react";
import { LuPhone, LuMail, LuMapPin, LuInstagram, LuGithub, LuYoutube } from "react-icons/lu";

export default function Footer() {
  return (
    <Box as="footer" mt={16} bg="gray.100" color="gray.700">
      <Container maxW="70%" py={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {/* Brand */}
          <Box>
            <Text fontSize="md" fontWeight="bold" color="gray.700">
              플랜잇.
            </Text>
            <Text mt={3} fontSize="xs" color="gray.500" lineHeight="tall">
              숙소 예약과 여행 계획을 더 간편하게.
              <br />
              빠른 상담과 정확한 안내를 제공합니다.
            </Text>
          </Box>

          {/* Links */}
          <Box>
            <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={3}>
              바로가기
            </Text>
            <Box fontSize="xs" color="gray.500">
				<Link href="/event" color="gray.500" _hover={{ color: "#dd6b20" }} display="block" mb={2} focusRing="none">
					이벤트
				</Link>
				<Link href="/customerservice" color="gray.500" _hover={{ color: "#dd6b20" }} display="block" mb={2} focusRing="none">
					고객센터
				</Link>
				<Link href="/agreement" color="gray.500" _hover={{ color: "#dd6b20" }} display="block" mb={2} focusRing="none">
					이용약관
				</Link>
				<Link href="/privacy" color="gray.500" _hover={{ color: "#dd6b20" }} display="block" focusRing="none">
					개인정보처리방침
				</Link>
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={3}>
              고객행복센터
            </Text>

            <HStack spacing={3} mb={2} color="gray.500">
              <LuPhone size={15} />
              <Text fontSize="xs">1234-1234 (09:00 ~ 03:00)</Text>
            </HStack>

            <HStack spacing={3} mb={3} color="gray.500">
              <LuMail size={15} />
              <Text fontSize="xs">help@planitreserve.com</Text>
            </HStack>

            <HStack spacing={3} color="gray.500">
              <LuMapPin size={15} />
              <Text fontSize="xs">서울특별시 노원구 상계로1길 34 세일학원 5층</Text>
            </HStack>

            <HStack spacing={4} mt={5} color="gray.300">
              <Link href="#" aria-label="Instagram" _hover={{ color: "#dd6b20" }} focusRing="none">
                <LuInstagram size={20} />
              </Link>
              <Link href="#" aria-label="GitHub" _hover={{ color: "#dd6b20" }} focusRing="none">
                <LuGithub size={20} />
              </Link>
              <Link href="#" aria-label="YouTube" _hover={{ color: "#dd6b20" }} focusRing="none">
                <LuYoutube size={20} />
              </Link>
            </HStack>
          </Box>
        </SimpleGrid>

        <Separator my={8} borderColor="gray.400" />

        <HStack justify="space-between" flexWrap="wrap" rowGap={2} >
          <Text fontSize="xs" color="gray.400">
            © {new Date().getFullYear()} Planit. All rights reserved.
          </Text>
          <Text fontSize="xs" color="gray.400">
            대표: 프로젝트C팀 · 사업자등록번호: 000-00-00000
          </Text>
        </HStack>
      </Container>
    </Box>
  );
}

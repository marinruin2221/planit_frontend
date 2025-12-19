import React from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * 약관 본문을 작은 스크롤 박스에 출력하는 컴포넌트
 */
export default function TermsCard({ title, content }) {
  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      rounded="md"
      p={3}
    >
      <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
        {title}
      </Text>

      <Box
        borderWidth="1px"
        borderColor="gray.100"
        rounded="md"
        bg="gray.50"
        p={3}
        maxH="140px"
        overflowY="auto"
      >
        <Text fontSize="xs" color="gray.700" whiteSpace="pre-wrap" lineHeight="tall">
          {content}
        </Text>
      </Box>
    </Box>
  );
}
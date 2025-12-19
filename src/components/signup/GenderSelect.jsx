import React, { useMemo } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

const OPTIONS = [
  { value: "male", label: "남" },
  { value: "female", label: "여" },
];

export default function GenderSelect({ value, onChange }) {
  const status = useMemo(() => {
    if (value === "male") {
      return { ok: true, message: "남을 선택했습니다." };
    }
    if (value === "female") {
      return { ok: true, message: "여를 선택했습니다." };
    }
    return { ok: false, message: "성별을 선택해 주세요." };
  }, [value]);

  return (
    <Box>
      <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
        성별 <span className="text-red-500">(필수)</span>
      </Text>

      <HStack spacing={2} wrap="wrap">
        {OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <Button
              key={opt.value}
              type="button"
              size="sm"
              variant={selected ? "solid" : "outline"}
              bg={selected ? "var(--brand_color)" : "transparent"}
              color={selected ? "white" : "gray.700"}
              borderColor={selected ? "var(--brand_color)" : "gray.300"}
              _hover={{
                bg: selected ? "var(--brand_color)" : "gray.50",
                borderColor: "var(--brand_color)",
              }}
              onClick={() => onChange?.(opt.value)}
            >
              {opt.label}
            </Button>
          );
        })}
      </HStack>

      <Text fontSize="xs" color={status.ok ? "gray.500" : "red.500"} mt={2}>
        {status.message}
      </Text>
    </Box>
  );
}
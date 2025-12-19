import React, { useMemo } from "react";
import { Box, HStack, Input, Text } from "@chakra-ui/react";

function onlyDigits(value) {
  return (value || "").replace(/\D/g, "");
}

export default function BirthInput({ value, onChange }) {
  const v = value || { year: "", month: "", day: "" };

  const isValid = useMemo(() => {
    const y = Number(v.year);
    const m = Number(v.month);
    const d = Number(v.day);

    if (!v.year || !v.month || !v.day) return false;
    if (v.year.length !== 4) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1900 || y > 2100) return false;
    return true;
  }, [v.year, v.month, v.day]);

  const set = (key, next) => {
    onChange?.({ ...v, [key]: next });
  };

  return (
    <Box>
      <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
        생년월일
      </Text>

      <HStack spacing={2}>
        <Input
          value={v.year}
          onChange={(e) => set("year", onlyDigits(e.target.value).slice(0, 4))}
          placeholder="YYYY"
          inputMode="numeric"
          autoComplete="bday-year"
        />
        <Input
          value={v.month}
          onChange={(e) => set("month", onlyDigits(e.target.value).slice(0, 2))}
          placeholder="MM"
          inputMode="numeric"
          autoComplete="bday-month"
        />
        <Input
          value={v.day}
          onChange={(e) => set("day", onlyDigits(e.target.value).slice(0, 2))}
          placeholder="DD"
          inputMode="numeric"
          autoComplete="bday-day"
        />
      </HStack>

      <Text fontSize="xs" color={isValid ? "gray.500" : "gray.400"} mt={2}>
        {isValid ? "입력 형식이 올바릅니다." : "예: 1999 / 12 / 31"}
      </Text>
    </Box>
  );
}
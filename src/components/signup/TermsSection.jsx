import React, { useMemo } from "react";
import { Box, Stack, Text, Checkbox } from "@chakra-ui/react";
import { getTosContent } from "@src/data/tos.js";
import TermsCard from "@components/signup/TermsCard.jsx";

const TERMS = [
  { id: "agreement", title: "이용약관", required: true },
  { id: "privacyconsent", title: "개인정보 수집 및 이용 동의", required: true },
  { id: "age14", title: "만 14세 이상 확인", required: true },
  { id: "location", title: "위치 기반 서비스 이용 약관 동의", required: false },
  { id: "marketing", title: "마케팅 알림 수신 동의", required: false },
];

export default function TermsSection({ value, onChange }) {
  const contents = useMemo(() => {
    const map = {};
    for (const t of TERMS) map[t.id] = getTosContent(t.id);
    return map;
  }, []);

  const requiredTerms = useMemo(() => TERMS.filter((t) => t.required), []);

  const allChecked = TERMS.every((t) => !!value?.[t.id]);
  const requiredChecked = requiredTerms.every((t) => !!value?.[t.id]);

  const setAll = (checked) => {
    const next = {};
    for (const t of TERMS) next[t.id] = !!checked;
    onChange(next);
  };

  const setRequired = (checked) => {
    const next = { ...(value || {}) };
    for (const t of requiredTerms) next[t.id] = !!checked;
    onChange(next);
  };

  const setOne = (id, checked) => {
    onChange({ ...(value || {}), [id]: !!checked });
  };

  return (
    <Box>
      <Text fontSize="md" fontWeight="bold" color="gray.800" mb={3}>
        약관 동의
      </Text>

      <Box
        borderWidth="1px"
        borderColor="gray.200"
        rounded="md"
        bg="white"
        p={3}
      >
        <Box className="flex items-center justify-between gap-3 flex-wrap">
          <Checkbox.Root
            checked={allChecked}
            onCheckedChange={(e) => setAll(!!e.checked)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control className="border-gray-300 data-[checked]:bg-[var(--brand_color)] data-[checked]:border-[var(--brand_color)] w-4 h-4 rounded border flex items-center justify-center transition-colors">
              <Checkbox.Indicator className="text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="w-2.5 h-2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label className="text-sm font-semibold text-gray-800">
              전체 동의
            </Checkbox.Label>
          </Checkbox.Root>

          <Checkbox.Root
            checked={requiredChecked}
            onCheckedChange={(e) => setRequired(!!e.checked)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control className="border-gray-300 data-[checked]:bg-[var(--brand_color)] data-[checked]:border-[var(--brand_color)] w-4 h-4 rounded border flex items-center justify-center transition-colors">
              <Checkbox.Indicator className="text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="w-2.5 h-2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label className="text-sm font-semibold text-gray-800">
              필수 동의
            </Checkbox.Label>
          </Checkbox.Root>
        </Box>

        <Text fontSize="xs" color="gray.500" mt={2}>
          필수 약관 3개에 동의해야 가입을 진행할 수 있습니다.
        </Text>
      </Box>

      <Stack spacing={3} mt={4}>
        {TERMS.map((t) => (
          <Box key={t.id}>
            <Checkbox.Root
              checked={!!value?.[t.id]}
              onCheckedChange={(e) => setOne(t.id, !!e.checked)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control className="border-gray-300 data-[checked]:bg-[var(--brand_color)] data-[checked]:border-[var(--brand_color)] w-4 h-4 rounded border flex items-center justify-center transition-colors">
                <Checkbox.Indicator className="text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="w-2.5 h-2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </Checkbox.Indicator>
              </Checkbox.Control>

              <Checkbox.Label className="text-sm text-gray-700">
                {t.title}{" "}
                <span className={t.required ? "text-red-500" : "text-gray-400"}>
                  ({t.required ? "필수" : "선택"})
                </span>
              </Checkbox.Label>
            </Checkbox.Root>

            <Box mt={2}>
              <TermsCard title={t.title} content={contents[t.id]} />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
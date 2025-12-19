import React, { useMemo, useState } from "react";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import BirthInput from "@components/signup/BirthInput.jsx";
import GenderSelect from "@components/signup/GenderSelect.jsx";
import TermsSection from "@components/signup/TermsSection.jsx";
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
  validateUserId,
} from "@src/data/signupcheck.js";

const REQUIRED_TERM_IDS = ["agreement", "privacyconsent", "age14"];

function isNonEmpty(value) {
  return !!String(value || "").trim();
}

export default function SignupForm() {
  const [form, setForm] = useState({
    username: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    email: "",
    birth: { year: "", month: "", day: "" },
    gender: "",
    terms: {},
  });

  const [touched, setTouched] = useState({
    username: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
    email: false,
  });

  const touch = (key) => setTouched((prev) => ({ ...prev, [key]: true }));

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const requiredTermsOk = useMemo(() => {
    const t = form.terms || {};
    return REQUIRED_TERM_IDS.every((id) => !!t[id]);
  }, [form.terms]);

  const genderOk = useMemo(() => {
    return form.gender === "male" || form.gender === "female";
  }, [form.gender]);

  const validation = useMemo(() => {
    const username = isNonEmpty(form.username)
      ? validateUserId(form.username)
      : { ok: false, message: "아이디는 필수 입력입니다." };

    const nickname = isNonEmpty(form.nickname)
      ? validateNickname(form.nickname)
      : { ok: false, message: "닉네임은 필수 입력입니다." };

    const password = isNonEmpty(form.password)
      ? validatePassword(form.password)
      : { ok: false, message: "비밀번호는 필수 입력입니다." };

    const passwordConfirm = isNonEmpty(form.passwordConfirm)
      ? validatePasswordConfirm(form.password, form.passwordConfirm)
      : { ok: false, message: "비밀번호 재입력은 필수 입력입니다." };

    const email = isNonEmpty(form.email)
      ? validateEmail(form.email)
      : { ok: false, message: "이메일은 필수 입력입니다." };

    return { username, nickname, password, passwordConfirm, email };
  }, [form.username, form.nickname, form.password, form.passwordConfirm, form.email]);

  const requiredInputsOk = useMemo(() => {
    return (
      isNonEmpty(form.username) &&
      isNonEmpty(form.nickname) &&
      isNonEmpty(form.password) &&
      isNonEmpty(form.passwordConfirm) &&
      isNonEmpty(form.email)
    );
  }, [form.username, form.nickname, form.password, form.passwordConfirm, form.email]);

  const validationsOk = useMemo(() => {
    return Object.values(validation).every((r) => !!r?.ok);
  }, [validation]);

  const canSubmit = requiredInputsOk && validationsOk && genderOk && requiredTermsOk;

  const showMessage = (key, value) => touched[key] || isNonEmpty(value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    // 실제 요청/연동은 하지 않음(초안). 상태 확인용 로그만 남김.
    // eslint-disable-next-line no-console
    console.log("signup draft payload", form);

    alert("회원가입 폼 입력/약관 동의 상태가 준비되었습니다. (요청은 보내지 않음)");
  };

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Stack spacing={4}>
        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
            아이디 <span className="text-red-500">(필수)</span>
          </Text>
          <Input
            value={form.username}
            onChange={(e) => {
              touch("username");
              update({ username: e.target.value });
            }}
            onBlur={() => touch("username")}
            placeholder="아이디를 입력하세요"
            autoComplete="username"
          />
          {showMessage("username", form.username) && (
            <Text fontSize="xs" color={validation.username.ok ? "gray.500" : "red.500"} mt={2}>
              {validation.username.message}
            </Text>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
            닉네임 <span className="text-red-500">(필수)</span>
          </Text>
          <Input
            value={form.nickname}
            onChange={(e) => {
              touch("nickname");
              update({ nickname: e.target.value });
            }}
            onBlur={() => touch("nickname")}
            placeholder="닉네임을 입력하세요"
            autoComplete="nickname"
          />
          {showMessage("nickname", form.nickname) && (
            <Text fontSize="xs" color={validation.nickname.ok ? "gray.500" : "red.500"} mt={2}>
              {validation.nickname.message}
            </Text>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
            비밀번호 <span className="text-red-500">(필수)</span>
          </Text>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => {
              touch("password");
              update({ password: e.target.value });
            }}
            onBlur={() => touch("password")}
            placeholder="비밀번호를 입력하세요"
            autoComplete="new-password"
          />
          {showMessage("password", form.password) && (
            <Text fontSize="xs" color={validation.password.ok ? "gray.500" : "red.500"} mt={2}>
              {validation.password.message}
            </Text>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
            비밀번호 재입력 <span className="text-red-500">(필수)</span>
          </Text>
          <Input
            type="password"
            value={form.passwordConfirm}
            onChange={(e) => {
              touch("passwordConfirm");
              update({ passwordConfirm: e.target.value });
            }}
            onBlur={() => touch("passwordConfirm")}
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
          />
          {showMessage("passwordConfirm", form.passwordConfirm) && (
            <Text
              fontSize="xs"
              color={validation.passwordConfirm.ok ? "gray.500" : "red.500"}
              mt={2}
            >
              {validation.passwordConfirm.message}
            </Text>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
            이메일 <span className="text-red-500">(필수)</span>
          </Text>
          <Input
            value={form.email}
            onChange={(e) => {
              touch("email");
              update({ email: e.target.value });
            }}
            onBlur={() => touch("email")}
            placeholder="email@example.com"
            autoComplete="email"
            inputMode="email"
          />
          {showMessage("email", form.email) && (
            <Text fontSize="xs" color={validation.email.ok ? "gray.500" : "red.500"} mt={2}>
              {validation.email.message}
            </Text>
          )}
        </Box>

        <BirthInput value={form.birth} onChange={(birth) => update({ birth })} />

        <GenderSelect value={form.gender} onChange={(gender) => update({ gender })} />

        <TermsSection value={form.terms} onChange={(terms) => update({ terms })} />

        <Button
          type="submit"
          size="lg"
          bg="var(--brand_color)"
          color="white"
          _hover={{ bg: "#C05621" }}
          isDisabled={!canSubmit}
        >
          가입하기
        </Button>

        {!requiredTermsOk && (
          <Text fontSize="xs" color="gray.500" textAlign="center">
            필수 약관(3개)에 동의해야 가입하기 버튼이 활성화됩니다.
          </Text>
        )}

        {!genderOk && (
          <Text fontSize="xs" color="gray.500" textAlign="center">
            성별(남/여)을 선택해야 가입하기 버튼이 활성화됩니다.
          </Text>
        )}
      </Stack>
    </Box>
  );
}
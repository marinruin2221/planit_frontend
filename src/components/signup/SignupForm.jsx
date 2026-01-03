import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const onSubmit = async(e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      username: form.username,
      nickname: form.nickname,
      password: form.password,
      email: form.email,
      birth: form.birth,   // {year, month, day}
      gender: form.gender, // "male" | "female"
      terms: form.terms,
    };

    try {
      const API_BASE = "http://localhost:5002";
  
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 쿠키 기반 인증을 쓰게 되면 credentials가 필요할 수 있습니다.
        // 지금은 회원가입만이라 필수는 아니지만, CORS 설정에 allowCredentials true라면 붙이는 게 깔끔합니다.
        credentials: "include",
        body: JSON.stringify(payload),
      });
  
      // 서버가 201을 주도록 만들었으니 보통 2xx면 성공 처리
      if (!res.ok) {
        // 응답이 JSON일 수도, 아닐 수도 있으니 안전하게 처리
        const text = await res.text();
        throw new Error(text || `회원가입 실패 (HTTP ${res.status})`);
      }
  
      const data = await res.json(); // SignupResponseDTO 기대
      // eslint-disable-next-line no-console
      console.log("signup success", data);
  
      alert("회원가입이 완료되었습니다.");
      // 완료 후 로그인 페이지로 이동
      navigate("/signin");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
  
      // 서버가 지금 IllegalArgumentException을 던지면 응답 바디가 단순 텍스트일 수 있습니다.
      setSubmitError(err?.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
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
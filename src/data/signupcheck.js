/**
 * 회원가입 입력값 검증 함수 모음
 * - 각 함수는 { ok: boolean, message: string } 반환
 */

/** 아이디: 4~20자, 영문/숫자 */
export function validateUserId(value) {
  if (!value) {
    return { ok: false, message: "아이디를 입력해 주세요." };
  }

  const regex = /^[a-zA-Z0-9]{4,20}$/;
  if (!regex.test(value)) {
    return {
      ok: false,
      message: "아이디는 4~20자의 영문 또는 숫자여야 합니다.",
    };
  }

  return { ok: true, message: "사용 가능한 아이디 형식입니다." };
}

/** 닉네임: 2~12자 */
export function validateNickname(value) {
  if (!value) {
    return { ok: false, message: "닉네임을 입력해 주세요." };
  }

  if (value.length < 2 || value.length > 12) {
    return {
      ok: false,
      message: "닉네임은 2~12자 이내로 입력해 주세요.",
    };
  }

  return { ok: true, message: "사용 가능한 닉네임입니다." };
}

/** 비밀번호: 8자 이상, 영문/숫자/특수문자 중 2종 이상 */
export function validatePassword(value) {
  if (!value) {
    return { ok: false, message: "비밀번호를 입력해 주세요." };
  }

  if (value.length < 8) {
    return {
      ok: false,
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    };
  }

  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[^a-zA-Z0-9]/.test(value);

  const typeCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

  if (typeCount < 2) {
    return {
      ok: false,
      message: "영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.",
    };
  }

  return { ok: true, message: "안전한 비밀번호입니다." };
}

/** 비밀번호 확인 */
export function validatePasswordConfirm(password, passwordConfirm) {
  if (!passwordConfirm) {
    return { ok: false, message: "비밀번호를 다시 입력해 주세요." };
  }

  if (password !== passwordConfirm) {
    return {
      ok: false,
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  return { ok: true, message: "비밀번호가 일치합니다." };
}

/** 이메일 */
export function validateEmail(value) {
  if (!value) {
    return { ok: false, message: "이메일을 입력해 주세요." };
  }

  const regex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!regex.test(value)) {
    return {
      ok: false,
      message: "올바른 이메일 형식이 아닙니다.",
    };
  }

  return { ok: true, message: "사용 가능한 이메일 형식입니다." };
}

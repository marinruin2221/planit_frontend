/**
 * 회원가입 입력값 검증 함수 모음 (임시 구현)
 * - 요구사항: 각 함수는 { ok: boolean, message: string } 형태 반환
 * - 현재 단계: 백엔드/정책 확정 전이므로 항상 ok=true 반환
 */

export function validateUserId(value) {
  return {
    ok: true,
    message: "아이디 검증이 완료되었습니다. (임시: 항상 통과)",
  };
}

export function validateNickname(value) {
  return {
    ok: true,
    message: "닉네임 검증이 완료되었습니다. (임시: 항상 통과)",
  };
}

export function validatePassword(value) {
  return {
    ok: true,
    message: "비밀번호 검증이 완료되었습니다. (임시: 항상 통과)",
  };
}

export function validatePasswordConfirm(password, passwordConfirm) {
  return {
    ok: true,
    message: "비밀번호 재입력 검증이 완료되었습니다. (임시: 항상 통과)",
  };
}

export function validateEmail(value) {
  return {
    ok: true,
    message: "이메일 검증이 완료되었습니다. (임시: 항상 통과)",
  };
}
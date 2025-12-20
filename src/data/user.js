// @src/data/user.js

/**
 * 임시 로그인 상태 체크 함수
 * - 반환 형태: { success: boolean, user: object | null }
 * - 기본값은 로그인 실패(success:false)
 *
 * 백엔드 연동 전까지는 이 파일을 통해서만 로그인 상태를 흉내냅니다.
 */
export function getLoginStatus() {
  return {
    success: false,
    user: null,
  };
}
// src/utils/httpError.js
export async function getErrorMessage(res, fallback = "요청에 실패했습니다.") {
    let msg = fallback;
  
    // 1) JSON 우선
    try {
      const data = await res.clone().json();
      if (data?.message) return String(data.message);
      if (data?.error) return String(data.error);
    } catch {}
  
    // 2) 텍스트 fallback
    try {
      const text = await res.clone().text();
      if (text) return text;
    } catch {}
  
    // 3) 상태코드 기반 기본 문구
    if (res.status === 401) return "아이디 또는 비밀번호가 올바르지 않습니다.";
    if (res.status === 403) return "요청 권한이 없습니다.";
    if (res.status === 409) return "이미 사용 중인 정보가 있습니다.";
    if (res.status >= 500) return "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  
    return msg;
  }
  
export async function fetchMe() {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) return { loggedIn: false };
    return res.json();
  }
  
  export async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  }
  
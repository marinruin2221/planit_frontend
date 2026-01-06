import React, { useMemo, useState, useEffect, useRef } from "react";
import { NavLink, Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Container, HStack, Button, Link, Text } from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi";

// ✅ 세션 로그인 상태 확인용 API
import { fetchMe, logout } from "@src/data/auth.js";

function Logo({ size = 28, style }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <Box
        as="span"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w={`${size}px`}
        h={`${size}px`}
        color="gray.600"
        aria-label="Planit"
      >
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.15" />
          <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        </svg>
      </Box>
    );
  }

  return (
    <img
      src="/images/planitLogo-transparent.png"
      alt="Planit"
      style={{ height: size, width: "auto", ...style }}
      onError={() => setHasError(true)}
    />
  );
}

export default function Header({ mainYN = false }) {
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const [hideHeader, setHideHeader] = useState(false);

  // ✅ 로그인 상태 (세션 기준)
  const [me, setMe] = useState({ loggedIn: false });
  const [loading, setLoading] = useState(true);

  const menuItems = useMemo(
    () => [
      { label: "국내숙소", to: "/list" },
      { label: "예약조회", to: "/signin" },
      { label: "이벤트", to: "/event" },
      { label: "고객센터", to: "/customerservice" },
    ],
    []
  );

  // ✅ 헤더 마운트 시 로그인 상태 확인
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchMe(); // /api/auth/me
      setMe(data);
      setLoading(false);
    })();
  }, []);

  // ✅ 로그아웃 처리 (세션 무효화)
  const handleLogout = async () => {
    await logout();                 // /api/auth/logout
    setMe({ loggedIn: false });     // 즉시 UI 반영
    navigate("/main");
  };

  /* ===== 기존 스크롤/마우스 로직 유지 ===== */
  useEffect(() => {
    if (!mainYN) {
      setHideHeader(false);
      return;
    }
    const handleScroll = () => {
      if (window.scrollY > 0) setHideHeader(false);
      else setHideHeader(true);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mainYN]);

  useEffect(() => {
    if (!mainYN) return;
    const THRESHOLD = 80;
    const handleMouseMove = (e) => {
      if (window.scrollY > 0) return;
      const header = headerRef.current;
      if (!header) return;
      const rect = header.getBoundingClientRect();
      if (e.clientY <= rect.bottom + THRESHOLD) setHideHeader(false);
      else setHideHeader(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mainYN]);

  return (
    <>
      {mainYN && hideHeader && (
        <Box position="fixed" top="0" left="0" right="0" height="40px" zIndex={49} />
      )}

      <Box
        ref={headerRef}
        as="header"
        w="full"
        bg="gray.50"
        borderBottom="1px solid"
        borderColor="gray.200"
        position={mainYN ? "fixed" : "sticky"}
        top="0"
        zIndex={50}
        transform={mainYN && hideHeader ? "translateY(-100%)" : "translateY(0)"}
        transition="transform 0.3s ease"
      >
        <Container
          maxW={{ base: "100%", lg: "70%" }}
          py={4}
          px={{ base: 4, lg: 0 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left */}
          <HStack spacing={{ base: 4, md: 6 }}>
            <Link as={RouterLink} to="/main" _hover={{ textDecoration: "none" }} focusRing="none">
              <Logo size={60} style={{ marginTop: "-10px" }} />
            </Link>

            <HStack as="nav" gap={{ base: 3, md: 6 }} ml={10}>
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  as={NavLink}
                  to={item.to}
                  fontSize="lg"
                  fontWeight="500"
                  color="gray.700"
                  _hover={{ color: "var(--brand_color)" }}
                  _activeLink={{ color: "var(--brand_color)" }}
                  focusRing="none"
                >
                  {item.label}
                </Link>
              ))}
            </HStack>
          </HStack>

          {/* Right */}
          <HStack spacing={4}>
            {!loading && me.loggedIn ? (
              <>
                {/* ✅ 닉네임 표시 */}
                <Text fontSize="sm" color="gray.700">
                  <b>{me.nickname}</b>님 반갑습니다
                </Text>

                <Link as={RouterLink} to="/mypage">
                  마이페이지
                </Link>

                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            ) : (
              !loading && (
                <Link
                  as={RouterLink}
                  to="/signin"
                  fontSize="xl"
                  _hover={{ color: "var(--brand_color)" }}
                  focusRing="none"
                >
                  <FiLogIn size={22} />
                </Link>
              )
            )}
          </HStack>
        </Container>
      </Box>
    </>
  );
}

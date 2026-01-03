import React, { useMemo, useState, useEffect, useRef } from "react";
import { NavLink, Link as RouterLink, useNavigate } from "react-router-dom";

import { Box, Container, HStack, Button, Link } from "@chakra-ui/react";

import { getLoginStatus } from "@src/data/user.js";

import { FiLogIn } from "react-icons/fi";

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
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
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

  const [hideHeader, setHideHeader] = useState(false);

  const headerRef = useRef(null);

  const menuItems = useMemo(
    () => [
      { label: "국내숙소", to: "/list" },
      { label: "예약조회", to: "/signin" },
      { label: "이벤트", to: "/event" },
      { label: "고객센터", to: "/customerservice" },
    ],
    []
  );

  const loginStatus = getLoginStatus();
  const isLoggedIn = loginStatus?.success === true;

  const handleLogout = () => {
    navigate("/main");
  };

  useEffect(() => {
    if (!mainYN) {
      setHideHeader(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHideHeader(false); // 스크롤 내리면 항상 표시
      } else {
        setHideHeader(true); // 최상단이면 기본 숨김
      }
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
      const mouseY = e.clientY;

      if (mouseY <= rect.bottom + THRESHOLD) {
        setHideHeader(false);
      } else {
        setHideHeader(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mainYN]);

  return (
    <React.Fragment>
      {mainYN && hideHeader && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          height="40px"
          zIndex={49}
          onMouseEnter={() => setHideHeader(false)}
        />
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
        transform={
          mainYN && hideHeader
            ? "translateY(-100%)"
            : "translateY(0)"
        }
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
          <HStack spacing={{ base: 4, md: 6 }} alignItems="center">
            <Link
              as={RouterLink}
              to="/main"
              _hover={{ textDecoration: "none" }}
              display="inline-flex"
              alignItems="center"
              focusRing="none"
            >
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
                  px="1"
                  py="2"
                  color="gray.700"
                  _hover={{ textDecoration: "none", color: "var(--brand_color)" }}
                  _activeLink={{ color: "var(--brand_color)" }}
                  focusRing="none"
                >
                  {item.label}
                </Link>
              ))}
            </HStack>
          </HStack>

          {/* Right */}
          <HStack spacing={{ base: 3, md: 5 }} alignItems="center">
            {isLoggedIn ? (
              <HStack spacing={2}>
                <Link as={RouterLink} to="/mypage" _hover={{ textDecoration: "none" }}>
                  마이페이지
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              </HStack>
            ) : (
              <Link
                as={RouterLink}
                to="/signin"
                fontSize="xl"
                fontWeight="medium"
                _hover={{ textDecoration: "none", color: "var(--brand_color)" }}
                focusRing="none"
              >
                <FiLogIn size={22} />
              </Link>
            )}
          </HStack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
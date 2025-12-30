import React, { useMemo, useState } from "react";
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
      // className="h-7 w-auto"
      style={{ height: size, width: "auto", ...style }}
      onError={() => setHasError(true)}
    />
  );
}

export default function Header() {
  const navigate = useNavigate();

  const menuItems = useMemo(
    () => [
      // { label: "메인", to: "/main" },
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
    // 임시 로그아웃 동작 (백엔드/상태관리 연동 전)
    navigate("/main");
  };

  return (
    <Box
      as="header"
      w="full"
      bg="gray.50"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex={50}
    >
      <Container
        maxW={{ base: "100%", lg: "70%" }}
        py={4}
        px={{ base: 4, lg: 0 }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Left: icon -> menu */}
        <HStack spacing={{ base: 4, md: 6 }} alignItems="center">
            <Link
              as={RouterLink}
              to="/main"
              _hover={{ textDecoration: "none" }}
              display="inline-flex"
              alignItems="center"
            >
              <Logo size={60} style={{ marginTop: "-10px" }}/>
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
              >
                {item.label}
              </Link>
            ))}
          </HStack>
        </HStack>

        {/* Right: logo(svg) + auth */}
        <HStack spacing={{ base: 3, md: 5 }} alignItems="center">

          {isLoggedIn ? (
            <HStack spacing={2}>
              <Link
                as={RouterLink}
                to="/mypage"
                className="text-sm font-medium text-gray-700 hover:text-[var(--brand_color)] px-1 py-2"
                _hover={{ textDecoration: "none" }}
              >
                마이페이지
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-gray-700 hover:text-[var(--brand_color)]"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </HStack>
          ) : (
            <Link
              as={RouterLink}
              to="/signin"
              // className="text-sm font-medium text-gray-700 hover:text-[var(--brand_color)] px-1 py-2"
              fontSize="xl"
              fontWeight="medium"
              _hover={{ textDecoration: "none", color: "var(--brand_color)" }}
              // _hover={{ textDecoration: "none" }}
            >
              <FiLogIn size={22} />
            </Link>
          )}
        </HStack>
      </Container>
    </Box>
  );
}
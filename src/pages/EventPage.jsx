"use client"

import React, { useState, useEffect, useMemo } from "react";

import { Box, SimpleGrid, Image, Text, Container, Input, Button, HStack, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { LuSearch, LuRotateCcw } from "react-icons/lu";
import { events } from "../data/events";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";

export default function EventPage()
{
    const categories = [
        "전체",
        "모텔",
        "호텔리조트",
        "펜션·캠핑·게하",
        "공간대여",
    ];
    
    const [activeCategory, setActiveCategory] = useState("전체");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 9;

    const [searchText, setSearchText] = useState("");
    const [appliedSearchText, setAppliedSearchText] = useState("");

    const applySearch = () => {
        setAppliedSearchText(searchText.trim());
    };
    
    // const filteredEvents =
    //     activeCategory === "전체"
    //       ? events
    //       : events.filter((e) => e.category === activeCategory);

    const filteredEvents = useMemo(() => {
        const q = appliedSearchText.trim().toLowerCase();
    
        return events.filter((e) => {
            const matchCategory = activeCategory === "전체" || e.category === activeCategory;
            const matchTitle = q === "" || e.title.toLowerCase().includes(q);
            return matchCategory && matchTitle;
        });
    }, [events, activeCategory, appliedSearchText]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, appliedSearchText]);

    const totalPages = Math.ceil(filteredEvents.length / perPage) || 1;
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pagedEvents = filteredEvents.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const resetSearch = () => {
        setSearchText("");
        setAppliedSearchText("");
    };

    return (
        <React.Fragment>
            <Header />
                <Container  maxW="1300px" py={10}>
                    {/* 페이지 제목 */}
                    <Text fontSize="3xl" fontWeight="bold" mb={6}>
                        이벤트
                    </Text>

                    {/* 검색창 */}
                    <HStack mb={8} spacing={3}>
                        <Input
                            placeholder="이벤트 검색"
                            height="45px"
                            fontSize="md"
                            borderRadius="md"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") applySearch();
                            }}
                        />
                        <Button
                            height="45px"
                            px={6}
                            colorScheme="blue"
                            borderRadius="md"
                            bgColor={"#dd6b20"}
                            fontSize="lg"
                            fontWeight="bold"
                            onClick={applySearch}
                        >
                            <LuSearch size={20} />
                        </Button>
                        <Button
                            height="45px"
                            px={6}
                            variant="outline"
                            borderRadius="md"
                            fontSize="md"
                            onClick={resetSearch}
                        >
                            <LuRotateCcw size={20} />
                        </Button>
                    </HStack>

                    {/* 카테고리 버튼 */}
                    <HStack mb={8} spacing={2} flexWrap="wrap">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                            <Button
                                key={cat}
                                size="sm"
                                fontWeight="bold"
                                variant={isActive ? "solid" : "outline"}
                                borderRadius="full"
                                onClick={() => setActiveCategory(cat)}
                                bg={isActive ? "#dd6b20" : "transparent"}
                                color={isActive ? "white" : "gray.700"}
                                borderColor={isActive ? "#dd6b20" : "gray.300"}
                                _hover={{
                                bg: isActive ? "#dd6b20" : "gray.100",
                                }}
                            >
                                {cat}
                            </Button>
                            );
                        })}
                    </HStack>

                    {/* 이벤트 카드들 */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gapX={8} gapY={12}>
                        {pagedEvents.map((e) => (
                            <LinkBox
                                key={e.id}
                                // borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                _hover={{ transform: "scale(1.05)" }}
                                transition="all 0.2s"
                                cursor="pointer"
                            >
                                <Image src={e.image} alt={e.title} />

                                <Box p={4}>
                                    <LinkOverlay as={RouterLink} to={`/events/${e.id}`}>
                                        {/* <Text fontSize="xl" fontWeight="semibold">
                                            {e.title}
                                        </Text> */}
                                        <Text mt={0} fontSize="sm" color="gray.600">
                                            {e.period}
                                        </Text>
                                    </LinkOverlay>
                                </Box>
                            </LinkBox>
                        ))}
                    </SimpleGrid>
                    <HStack mt={10} spacing={2} justify="center">
                        {/* 이전 버튼 */}
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePageChange(currentPage - 1)}
                            isDisabled={currentPage === 1}
                            borderRadius="full"
                            borderColor="gray.300"
                            color="gray.700"
                            _hover={{ bg: "gray.100" }}
                        >
                            이전
                        </Button>

                        {/* 번호 버튼들 */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            const isActive = page === currentPage;
                            return (
                            <Button
                                key={page}
                                size="sm"
                                borderRadius="full"
                                variant={isActive ? "solid" : "outline"}
                                bg={isActive ? "#dd6b20" : "transparent"}
                                color={isActive ? "white" : "gray.700"}
                                borderColor={isActive ? "#dd6b20" : "gray.300"}
                                _hover={{
                                bg: isActive ? "#dd6b20" : "gray.100",
                                }}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                            );
                        })}

                        {/* 다음 버튼 */}
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePageChange(currentPage + 1)}
                            isDisabled={currentPage === totalPages}
                            borderRadius="full"
                            borderColor="gray.300"
                            color="gray.700"
                            _hover={{ bg: "gray.100" }}
                        >
                            다음
                        </Button>
                    </HStack>
                </Container>
            <Footer />
        </React.Fragment>
    );
}
"use client";

import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Image, Text, Button, Stack, Badge } from "@chakra-ui/react";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import { events } from "../data/events";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = useMemo(() => {
    const id = Number(eventId);
    return events.find((e) => e.id === id);
  }, [eventId]);

  return (
    <React.Fragment>
      <Header />

      <Container maxW="900px" py={10}>
        <Stack spacing={6}>

          {!event ? (
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                이벤트를 찾을 수 없습니다.
              </Text>
              <Button mt={4} bg="#dd6b20" color="white" onClick={() => navigate("/events")}>
                목록으로
              </Button>
            </Box>
          ) : (
            <Box>
              <Image src={event.image} alt={event.title} borderRadius="lg" />

              <Stack mt={5} spacing={2}>
                <Badge w="fit-content" bg="#dd6b20" color="white" borderRadius="full" px={3} py={1}>
                  {event.category}
                </Badge>

                <Text fontSize="2xl" fontWeight="bold">
                  {event.title}
                </Text>

                <Text color="gray.600" fontSize="xs">{event.period}</Text>

                <Box h="1px" bg="gray.200" my={3} />

                {/* 더미에 description 넣어두면 여기서 보여줄 수 있음 */}
                <Text color="gray.700" lineHeight="1.8">
                  {event.description ?? "상세 설명이 아직 없습니다."}
                </Text>
              </Stack>
            </Box>
          )}
          <Button
            alignSelf="flex-start"
            variant="outline"
            borderRadius="full"
            onClick={() => navigate(-1)}
            mt={10}
          >
            뒤로
          </Button>
        </Stack>
      </Container>

      <Footer />
    </React.Fragment>
  );
}

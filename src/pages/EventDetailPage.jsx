"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Image, Text, Button, Stack, Badge } from "@chakra-ui/react";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
// import { events } from "../data/events";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const res = await fetch(
          `http://localhost:5001/api/events/${eventId}`,
          { signal: controller.signal }
        );

        if (res.status === 404) {
          setNotFound(true);
          setEvent(null);
          return;
        }

        if (!res.ok) {
          throw new Error(`EVENT_DETAIL_FAILED: ${res.status}`);
        }

        const data = await res.json();
        setEvent(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
    return () => controller.abort();
  }, [eventId]);

  return (
    <React.Fragment>
      <Header />

      <Container maxW="900px" py={10}>
        <Stack spacing={6}>

          {loading && (
            <Text fontSize="sm" color="gray.600">
              불러오는 중...
            </Text>
          )}

          {!loading && notFound && (
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                이벤트를 찾을 수 없습니다.
              </Text>
              <Button
                mt={4}
                bg="#dd6b20"
                color="white"
                onClick={() => navigate("/event")}
              >
                목록으로
              </Button>
            </Box>
          )}

          {!loading && !notFound && event && (
            <Box>
              <Image src={event.imageUrl} alt={event.title} borderRadius="lg" />

              <Stack mt={5} spacing={2}>
                <Badge w="fit-content" bg="#dd6b20" color="white" borderRadius="full" px={3} py={1}>
                  {event.category}
                </Badge>

                <Text fontSize="2xl" fontWeight="bold">
                  {event.title}
                </Text>

                <Text color="gray.600" fontSize="xs">
                  {new Date(event.startAt).toLocaleDateString()} ~{" "}
                  {new Date(event.endAt).toLocaleDateString()}
                </Text>

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

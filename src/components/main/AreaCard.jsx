// React
import React from "react";
import { useNavigate } from "react-router-dom";

// Chakra UI
import { Box, Flex, Text, Image } from "@chakra-ui/react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function AreaCard({ name, data }) {
  const navigate = useNavigate();

  const handleSearch = (sido) => {
    navigate(`/list?keyword=${encodeURIComponent(sido)}`);
  };

  return (
    <>
      <Flex pb="4">
        <Text fontSize="2xl" fontWeight="bold">
          {name}
        </Text>
      </Flex>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}       // ✅ 한 화면에 5개
        slidesPerGroup={1}      // ✅ 하나씩 이동
        spaceBetween={20}
        loop={true}
        speed={600}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          // 📱 모바일
          0: {
            slidesPerView: 1.2,
          },
          // 📱 태블릿
          768: {
            slidesPerView: 3,
          },
          // 💻 데스크탑
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {data.map((e, i) => (
          <SwiperSlide key={i}>
            <Box
              cursor="pointer"
              position="relative"
              onClick={() => handleSearch(e.subject)}
            >
              <Box rounded="md" overflow="hidden">
                <Image
                  w="100%"
                  h="350px"
                  src={e.image}
                  objectFit="cover"
                  filter="brightness(0.5)"
                  transition="0.5s"
                  _hover={{ transform: "scale(1.1)" }}
                />
              </Box>

              <Box position="absolute" bottom="0" left="0" right="0" p="4">
                <Text fontSize="lg" color="var(--white_color)">
                  {e.subject}
                </Text>
                <Text fontSize="xs" color="var(--white_color)">
                  {e.content}
                </Text>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
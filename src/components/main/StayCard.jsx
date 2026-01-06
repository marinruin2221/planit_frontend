import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";
import {
  Box,
  Flex,
  Text,
  Image,
  Icon,
  Button
} from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { getFallbackImage } from "@utils/imageUtils";

export default function StayCard({ name }) {
  const [stay, setStay] = useState([]);

  const view = (code) => {
    location.href = "/detail/" + code;
  };

  const category = (code) => {
    if (!code) return "숙박";
    if (code === "B02010100") return "호텔";
    if (code === "B02010200") return "콘도미니엄";
    if (code === "B02010300") return "유스호스텔";
    if (code === "B02010400") return "펜션";
    if (code === "B02010500") return "모텔";
    if (code === "B02010600") return "민박";
    if (code === "B02010700") return "게스트하우스";
    if (code === "B02010800") return "홈스테이";
    if (code === "B02010900") return "서비스드레지던스";
    if (code === "B02011000") return "한옥";
    if (code === "B02011100") return "캠핑장";
    if (code === "B02011200") return "글램핑";
    if (code === "B02011300") return "카라반";
    if (code === "B02011600") return "기타";
    if (code === "A03020200") return "야영장";
    return "숙박";
  };

  const rating = (contentid) => {
    if (!contentid) return { score: 7.5, reviewCount: 50 };

    let hash = 0;
    const str = String(contentid);

    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash &= hash;
    }

    const score = (Math.abs(hash % 61) + 30) / 10;
    const reviewCount = Math.abs((hash >> 8) % 111) + 10;

    return { score: score.toFixed(1), reviewCount };
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/main/bestGoodStay", { method: "POST" });
      const data = await response.json();
      setStay([...data]);
    })();
  }, []);

  return (
    <>
		<Flex justify={"space-between"} pb={"4"}>
			<Text fontSize={"2xl"} fontWeight={"bold"}>{name}</Text>
			<Button size={"xs"} color={"var(--white_color)"} bg={"var(--brand_color)"} _hover={{bg:"var(--brand_hover_color)"}} onClick={() => navigate(`/event`)}>
				More
				<LuArrowRight/>
			</Button>
		</Flex>

      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView={5}     // ✅ 한 화면에 5개
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {stay.map((e, i) => (
          <SwiperSlide key={i}>
            <Box cursor="pointer" onClick={() => view(e.contentId)}>
              <Box rounded="md" overflow="hidden">
                <Image
                  w="100%"
                  h="150px"
                  objectFit="cover"
                  transition="0.5s"
                  _hover={{ transform: "scale(1.1)" }}
                  src={e.firstimage || getFallbackImage(e.cat3)}
                />
              </Box>

              <Box pt="4">
                <Text truncate fontSize="xs" color="var(--brand_color)">
                  {category(e.cat3)}
                </Text>
                <Text truncate fontSize="lg" color="var(--black_color)">
                  {e.title}
                </Text>
              </Box>

              <Box pt="3">
                <Flex justify="space-between" align="end">
                  <Flex gap="1" align="center">
                    {(() => {
                      const { score, reviewCount } = rating(e.contentId);
                      return (
                        <>
                          <Icon color="var(--star_color)" as={FaStar} />
                          <Text color="var(--text_light_gray)">
                            {score}
                          </Text>
                          <Text color="var(--text_light_gray)">
                            ({reviewCount.toLocaleString()})
                          </Text>
                        </>
                      );
                    })()}
                  </Flex>

                  <Text
                    truncate
                    fontSize="lg"
                    fontWeight="bold"
                    color="var(--brand_color)"
                  >
                    {e.minPrice.toLocaleString()}원
                  </Text>
                </Flex>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
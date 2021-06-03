import React, { useEffect, useState } from "react";
import {
  Text, Box, Img, SlideFade, Progress
} from "@chakra-ui/react";
import useWindowDimensions from "./WindowDimensions";

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function Slide() {
  const { width } = useWindowDimensions();
  const [slideNum, setSlideNum] = useState(null);
  const [slideCount, setSlideCount] = useState(null);

  useEffect(() => {
    if (slideNum === null) {
      setSlideNum(1);
    }
    if (slideCount < 100) {
      wait(75).then(() => setSlideCount(slideCount + 1));
    } else if (slideCount === 100) {
      setSlideCount(0);
      switch (slideNum) {
        case 1:
          setSlideNum(2);
          break;
        case 2:
          setSlideNum(1);
          break;
      }
    }
  }, [slideCount])

  return (
    <>
      {
        slideNum === 1 &&
        <SlideFade in={true} offsetY="-100px">
          <Img pointerEvents="none" opacity="0.5" filter="blur(0.75px) grayscale(25%)" position="absolute" src="/visi.png" width={width} />
          <Box ml="8vw" mr="10vw" position="absolute" letterSpacing={{ base: "1px", xl: "2px" }} fontWeight="semibold" zIndex="2" pointerEvents="none">
            <Text mt="18.5vw" mb='2vw' color="white" fontSize={{ base: "xs", lg: "2xl", xl: "4xl" }}>
              MEWUJUDKAN PROGRAM STUDI SISTEM INFORMASI YANG DIAKUI DI KAWASAN ASIA TENGGARA DAN BERKARAKTER ISLAMI PADA TAHUN 2027
            </Text>
            <Text color="white" fontSize={{ base: "xs", lg: "xl", xl: "2xl" }}>
              Visi
            </Text>
            <Progress mt="2vw" value={slideCount} size="xs" max={100} min={0} colorScheme="teal" width="300px" isAnimated hasStripe />
          </Box>
        </SlideFade>
      }
      {
        slideNum === 2 &&
        <SlideFade in={true} offsetY="-100px">
          <Img pointerEvents="none" opacity="0.5" filter="blur(0.75px) grayscale(25%)" position="absolute" src="/misi.png" width={width} />
          <Box ml="8vw" mr="10vw" position="absolute" letterSpacing={{ base: "1px", xl: "2px" }} fontWeight="semibold" zIndex="2" pointerEvents="none">
            <Text mt="18.5vw" mb='2vw' color="white" fontSize={{ base: "xs", lg: "2xl", xl: "4xl" }}>
              MELAKUKAN PENELITIAN DALAM BIDANG SISTEM INFORMASI YANG DIDASARKAN DENGAN NILAI-NILAI ISLAMI YANG DAPAT MENSEJAHTERAKAN MASYARAKAT
            </Text>
            <Text color="white" fontSize={{ base: "xs", lg: "xl", xl: "2xl" }}>
              Misi
            </Text>
            <Progress mt="2vw" value={slideCount} size="xs" max={100} min={0} colorScheme="teal" width="300px" isAnimated hasStripe />
          </Box>
        </SlideFade>
      }
    </>
  );
}
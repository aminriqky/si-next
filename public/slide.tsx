import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  SlideFade,
  Progress,
  AspectRatio,
  useControllableState,
  Image
} from "@chakra-ui/react";

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

interface SlideShowProps {
  gambar: string;
  text: string;
  vimi: string;
}

const SlideShow: React.FC<SlideShowProps> = React.memo((props) => {
  return (
    <SlideFade in={true}>
      <AspectRatio
        pointerEvents="none"
        opacity="0.5"
        filter="grayscale(25%)"
        pos="absolute"
        h="760px"
        w="100%"
      >
        <Image
          src={props.gambar}
          pos="absolute"
          maxH={{ base: "27%", md: "54%", xl: "88%", "2xl": "100%" }}
          w="100%"
          alt="Gambar Visi & Misi"
        />
      </AspectRatio>
      <Box
        ml="8vw"
        mr="10vw"
        position="absolute"
        letterSpacing={{ base: "1px", xl: "2px" }}
        fontWeight="semibold"
        zIndex="2"
        pointerEvents="none"
      >
        <Text
          mt="18.5vw"
          mb="2vw"
          color="white"
          fontSize={{ base: "xs", lg: "2xl", xl: "4xl" }}
        >
          {props.text}
        </Text>
        <Text color="white" fontSize={{ base: "xs", lg: "xl", xl: "2xl" }}>
          {props.vimi}
        </Text>
        {props.children}
      </Box>
    </SlideFade>
  );
});

SlideShow.displayName = "SlideShow";

export default function Slide() {
  const [slideNum, setSlideNum] = useState(1);
  const [slideCount, setSlideCount] = useControllableState({ defaultValue: 0 });

  useEffect(() => {
    if (slideCount < 100) {
      wait(75).then(() => setSlideCount(slideCount + 1));
    } else if (slideCount === 100) {
      setSlideCount(0);
      if (slideNum === 1) {
        setSlideNum(2);
      } else if (slideNum === 2) {
        setSlideNum(3);
      } else if (slideNum === 3) {
        setSlideNum(4);
      } else if (slideNum === 4) {
        setSlideNum(1);
      }
    }
  }, [slideNum, slideCount, setSlideCount]);

  return (
    <React.Fragment>
      {slideNum === 1 && (
        <SlideShow
          gambar="/visi.png"
          vimi="Visi"
          text="MEWUJUDKAN PROGRAM STUDI SISTEM INFORMASI YANG DIAKUI DI KAWASAN ASIA TENGGARA DAN BERKARAKTER ISLAMI PADA TAHUN 2027"
        >
          <Progress
            role="progressbar"
            mt="2vw"
            value={slideCount}
            size="xs"
            max={100}
            min={0}
            aria-label="progressbar"
            colorScheme="teal"
            width="300px"
            isAnimated
            hasStripe
          />
        </SlideShow>
      )}
      {slideNum === 2 && (
        <SlideShow
          gambar="/misi.png"
          vimi="Misi"
          text="MELAKUKAN PENELITIAN DALAM BIDANG SISTEM INFORMASI YANG DIDASARKAN DENGAN NILAI-NILAI ISLAMI YANG DAPAT MENSEJAHTERAKAN MASYARAKAT"
        >
          <Progress
            role="progressbar"
            mt="2vw"
            value={slideCount}
            size="xs"
            max={100}
            min={0}
            aria-label="progressbar"
            colorScheme="teal"
            width="300px"
            isAnimated
            hasStripe
          />
        </SlideShow>
      )}
      {slideNum === 3 && (
        <SlideShow
          gambar="/sertifikat.png"
          vimi="Sertifikat Akreditasi Prodi SI"
          text="Terakreditasi B"
        >
          <Progress
            role="progressbar"
            mt="2vw"
            value={slideCount}
            size="xs"
            max={100}
            min={0}
            aria-label="progressbar"
            colorScheme="teal"
            width="300px"
            isAnimated
            hasStripe
          />
        </SlideShow>
      )}
      {slideNum === 4 && (
        <SlideShow
          gambar="/eid.jpeg"
          vimi="Mohon Maaf Lahir & Batin"
          text="Selamat Hari Raya Idul Fitri 1443 H"
        >
          <Progress
            role="progressbar"
            mt="2vw"
            value={slideCount}
            size="xs"
            max={100}
            min={0}
            aria-label="progressbar"
            colorScheme="teal"
            width="300px"
            isAnimated
            hasStripe
          />
        </SlideShow>
      )}
    </React.Fragment>
  );
}
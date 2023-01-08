import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  SlideFade,
  Progress,
  AspectRatio,
  useControllableState,
  Img,
} from "@chakra-ui/react";
import { wait } from "../public/func";

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
        opacity="0.7"
        pos="absolute"
        h="760px"
        w="100%"
      >
        <Img
          src={props.gambar}
          pos="absolute"
          maxH={{ base: "27%", md: "54%", xl: "88%", "2xl": "100%" }}
          w="100%"
          alt="Gambar Slide"
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

interface SlideProps extends SlideShowProps {
  data: number;
  length: number;
}

export default function SlidePage(props: SlideProps) {
  const [slideNum, setSlideNum] = useState(0);
  const [slideCount, setSlideCount] = useControllableState({ defaultValue: 0 });

  useEffect(() => {
    if (slideNum < 4) {
      if (slideCount < 100) {
        wait(75).then(() => setSlideCount(slideCount + 1));
      } else if (slideCount === 100) {
        setSlideCount(0);
        setSlideNum(slideNum + 1);
      }
    } else {
      setSlideNum(0);
    }
  }, [slideNum, slideCount, setSlideCount]);

  return (
    <React.Fragment>
      {slideNum === props.data && (
        <SlideShow gambar={props.gambar} vimi={props.vimi} text={props.text}>
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

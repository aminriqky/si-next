import React, {useEffect, useState} from "react";
import {Box, Button, Flex, Icon, Img, Link, SlideFade, Text,} from "@chakra-ui/react";
import {FcNews} from "@react-icons/all-files/fc/FcNews";
import {useRouter} from "next/router";
import {wait} from "./func";

interface SlideShowProps {
  gambar: string;
  dylink: string;
  judul: string;
  detail: string;
}

const SlideShow = React.memo<SlideShowProps>((props) => {
  const router = useRouter();

  return (
    <SlideFade in={true} offsetX="150px">
      <Box
        mt={{base: "5vw", xl: 0}}
        ml="10vw"
        mr="10vw"
        letterSpacing={{base: "1px", xl: "2px"}}
      >
        <Flex flexDir={{base: "column", xl: "row"}} alignItems="center">
          <Img
            src={props.gambar}
            maxW={{base: "100%", lg: "450px"}}
            h="100%"
            mr={{xl: "35px"}}
            borderRadius={15}
            alt="Thumbnail Berita"
          />
          <Flex flexDir="column">
            <Text
              fontWeight="semibold"
              color="black"
              my="15px"
              fontSize={{base: "md", lg: "xl"}}
            >
              <Link
                fontWeight="semibold"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`${props.dylink}`);
                }}
                href={props.dylink}
              >
                {props.judul}
              </Link>
            </Text>
            <Box color="gray.600" fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{__html: props.detail}}/>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </SlideFade>
  );
});

SlideShow.displayName = "SlideShow";

interface SlideButtonProps {
  handleClick: React.MouseEventHandler;
  bg: string;
}

const SlideButton = React.memo<SlideButtonProps>((props) => {
  return (
    <Button
      aria-label="Tombol Slide"
      _focus={{outline: "none"}}
      onClick={props.handleClick}
      bg={props.bg}
      _hover={{bg: "gray.500"}}
      _active={{bg: "gray.600"}}
      w="2"
      h="2"
      mx="2"
      mt="10"
      borderRadius="full"
    />
  );
});

SlideButton.displayName = "SlideButton";

interface BeritaProps {
  gambar1: string;
  judul1: string;
  detail1: string;
  dylink1: string;
  gambar2: string;
  judul2: string;
  detail2: string;
  dylink2: string;
  gambar3: string;
  judul3: string;
  detail3: string;
  dylink3: string;
  gambar4: string;
  judul4: string;
  detail4: string;
  dylink4: string;
  gambar5: string;
  judul5: string;
  detail5: string;
  dylink5: string;
}

const Berita = React.memo<BeritaProps>((props) => {
  const [slideNum, setSlideNum] = useState(1);
  const [slideCount, setSlideCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (slideCount < 125) {
      wait(75).then(() => setSlideCount(slideCount + 1));
    } else if (slideCount === 125) {
      setSlideCount(0);
      switch (slideNum) {
        case 1:
          setSlideNum(2);
          break;
        case 2:
          setSlideNum(3);
          break;
        case 3:
          setSlideNum(4);
          break;
        case 4:
          setSlideNum(5);
          break;
        case 5:
          setSlideNum(1);
          break;
      }
    }
  }, [slideCount, slideNum, setSlideCount]);

  function slideClick(num: number) {
    let color: string;

    if (slideNum === num) {
      color = "gray.400";
    } else {
      color = "gray.300";
    }

    return color;
  }

  return (
    <Flex
      bg="gray.200"
      height={{base: "750px", xl: "550px"}}
      overflow="hidden"
      flexDir="column"
    >
      <Flex mt="50px" flexDir="column">
        <Text
          ml="10vw"
          mr="10vw"
          fontSize="24"
          mb={{"2xl": "1.5%"}}
          fontWeight="medium"
        >
          <Icon as={FcNews} w="34px" h="auto"/>
          &thinsp;
          <Link
            verticalAlign="top"
            fontWeight="semibold"
            onClick={(e) => {
              e.preventDefault();
              router.push("/berita");
            }}
            href={"/berita"}
          >
            BERITA TERKINI
          </Link>
        </Text>
        {slideNum === 1 && (
          <SlideShow
            gambar={props.gambar1}
            judul={props.judul1}
            detail={props.detail1}
            dylink={props.dylink1}
          />
        )}
        {slideNum === 2 && (
          <SlideShow
            gambar={props.gambar2}
            judul={props.judul2}
            detail={props.detail2}
            dylink={props.dylink2}
          />
        )}
        {slideNum === 3 && (
          <SlideShow
            gambar={props.gambar3}
            judul={props.judul3}
            detail={props.detail3}
            dylink={props.dylink3}
          />
        )}
        {slideNum === 4 && (
          <SlideShow
            gambar={props.gambar4}
            judul={props.judul4}
            detail={props.detail4}
            dylink={props.dylink4}
          />
        )}
        {slideNum === 5 && (
          <SlideShow
            gambar={props.gambar5}
            judul={props.judul5}
            detail={props.detail5}
            dylink={props.dylink5}
          />
        )}
      </Flex>
      <Flex
        flexDir="row"
        position="absolute"
        alignSelf={{base: "center"}}
        mt={{base: 675, xl: 475}}
      >
        <SlideButton bg={slideClick(1)} handleClick={() => setSlideNum(1)}/>
        <SlideButton bg={slideClick(2)} handleClick={() => setSlideNum(2)}/>
        <SlideButton bg={slideClick(3)} handleClick={() => setSlideNum(3)}/>
        <SlideButton bg={slideClick(4)} handleClick={() => setSlideNum(4)}/>
        <SlideButton bg={slideClick(5)} handleClick={() => setSlideNum(5)}/>
      </Flex>
    </Flex>
  );
});

Berita.displayName = "Berita";

export default Berita;

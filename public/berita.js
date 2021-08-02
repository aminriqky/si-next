import React, { useEffect, useState } from "react";
import {
  Text, Box, SlideFade, Img, Flex, Icon, Link, Button
} from "@chakra-ui/react";
import { FcNews } from "react-icons/fc";

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function SlideShow(props) {
  return (
    <SlideFade in={true} offsetX="150px">
      <Box mt={{ base: "5vw", xl: 0 }} ml="8vw" mr="10vw" letterSpacing={{ base: "1px", xl: "2px" }}>
        <Flex flexDir={{ base: "column", xl: "row" }} alignItems="center">
          <Img src={props.gambar} borderRadius={15} width={{ base: "100%", xl: "450px" }}
            height="100%" mr={{ xl: "35px" }} layout="fill" objectFit="fill" />
          <Flex flexDir="column">
            <Text fontWeight="semibold" color="black" my="15px" fontSize={{ base: "md", lg: "xl" }}>
              {props.judul}
            </Text>
            <Text color="gray.600" fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: props.detail }} />
            </Text>
          </Flex>
        </Flex>
      </Box>
    </SlideFade>
  );
}


function SlideButton(props) {
  return (
    <Button _focus={{ outline: "none" }} onClick={props.handleClick}
      _hover={{ bg: "gray.400" }} _pressed={{ bg: "gray.400" }}
      mx="2" mt="10" borderRadius="full" bg="gray.300" width="2" height="2"
    />
  );
}


export default function Berita(props) {
  const [slideNum, setSlideNum] = useState(null);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (slideNum === null) {
      setSlideNum(1);
    }
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
  }, [slideCount])

  function slideClick(num) {
    setSlideNum(num);
  }

  return (
    <Flex bg="gray.200" height={{ base: "750px", xl: "550px" }} overflow="hidden" flexDir="column">
      <Flex mt="50px" flexDir="column">
        <Text ml="8vw" mr="10vw" fontSize="24" mb="1.5%" fontWeight="medium">
          <Icon as={FcNews} w="40px" h="auto" />
          &thinsp;
          <Link fontWeight="semibold" onClick={(e) => {
            e.preventDefault()
            router.push("/berita/daftar-berita")
          }}>
            BERITA TERKINI
          </Link>
        </Text>
        {
          slideNum === 1 &&
          <SlideShow gambar={props.gambar1} judul={props.judul1} detail={props.detail1} />
        }
        {
          slideNum === 2 &&
          <SlideShow gambar={props.gambar2} judul={props.judul2} detail={props.detail2} />
        }
        {
          slideNum === 3 &&
          <SlideShow gambar={props.gambar3} judul={props.judul3} detail={props.detail3} />
        }
        {
          slideNum === 4 &&
          <SlideShow gambar={props.gambar4} judul={props.judul4} detail={props.detail4} />
        }
        {
          slideNum === 5 &&
          <SlideShow gambar={props.gambar5} judul={props.judul5} detail={props.detail5} />
        }
      </Flex>
      <Flex flexDir="row" position="absolute" alignSelf={{ base: "center" }} mt={{ base: 675, xl: 435 }}>
        <SlideButton handleClick={() => slideClick(1)} />
        <SlideButton handleClick={() => slideClick(2)} />
        <SlideButton handleClick={() => slideClick(3)} />
        <SlideButton handleClick={() => slideClick(4)} />
        <SlideButton handleClick={() => slideClick(5)} />
      </Flex>
    </Flex>
  );
}
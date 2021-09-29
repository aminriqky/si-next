import React, { useEffect, useState } from "react";
import {
  Text, Box, SlideFade, Img, Flex, Icon, Link, Button
} from "@chakra-ui/react";
import { FcNews } from "react-icons/fc";
import { useRouter } from 'next/router';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const SlideShow = React.memo(props => {
  const router = useRouter();

  return (
    <SlideFade in={true} offsetX="150px">
      <Box mt={{ base: "5vw", xl: 0 }} ml="10vw" mr="10vw" letterSpacing={{ base: "1px", xl: "2px" }}>
        <Flex flexDir={{ base: "column", xl: "row" }} alignItems="center">
          <Img src={props.gambar} maxW={{ base: "100%", lg: "450px" }} h="100%"
            mr={{ xl: "35px" }} borderRadius={15} alt="Thumbnail Berita" />
          <Flex flexDir="column">
            <Text fontWeight="semibold" color="black" my="15px" fontSize={{ base: "md", lg: "xl" }}>
              <Link fontWeight="semibold" onClick={(e) => {
                e.preventDefault()
                router.push(`${props.dylink}`)
              }}>
                {props.judul}
              </Link>
            </Text>
            <Text color="gray.600" fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: props.detail }} />
            </Text>
          </Flex>
        </Flex>
      </Box>
    </SlideFade>
  );
})

const SlideButton = React.memo(props => {
  return (
    <Button aria-label="Tombol Slide" _focus={{ outline: "none" }} onClick={props.handleClick} bg={props.bg}
      _hover={{ bg: "gray.500" }} _active={{ bg: "gray.600" }} w="2" h="2" mx="2" mt="10" borderRadius="full"
    />
  );
})

const Berita = React.memo(props => {
  const [slideNum, setSlideNum] = useState(null);
  const [slideCount, setSlideCount] = useState(0);
  const router = useRouter();

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
    let color = '';

    if (slideNum === num) {
      color = 'gray.400'
    } else {
      color = 'gray.300'
    }

    return color
  }

  return (
    <Flex bg="gray.200" height={{ base: "750px", xl: "550px" }} overflow="hidden" flexDir="column">
      <Flex mt="50px" flexDir="column">
        <Text ml="10vw" mr="10vw" fontSize="24" mb={{ "2xl": "1.5%" }} fontWeight="medium">
          <Icon as={FcNews} w="40px" h="auto" />
          &thinsp;
          <Link fontWeight="semibold" onClick={(e) => {
            e.preventDefault()
            router.push("/berita")
          }}>
            BERITA TERKINI
          </Link>
        </Text>
        {
          slideNum === 1 &&
          <SlideShow gambar={props.gambar1} judul={props.judul1} detail={props.detail1} dylink={props.dylink1} />
        }
        {
          slideNum === 2 &&
          <SlideShow gambar={props.gambar2} judul={props.judul2} detail={props.detail2} dylink={props.dylink2} />
        }
        {
          slideNum === 3 &&
          <SlideShow gambar={props.gambar3} judul={props.judul3} detail={props.detail3} dylink={props.dylink3} />
        }
        {
          slideNum === 4 &&
          <SlideShow gambar={props.gambar4} judul={props.judul4} detail={props.detail4} dylink={props.dylink4} />
        }
        {
          slideNum === 5 &&
          <SlideShow gambar={props.gambar5} judul={props.judul5} detail={props.detail5} dylink={props.dylink5} />
        }
      </Flex>
      <Flex flexDir="row" position="absolute" alignSelf={{ base: "center" }} mt={{ base: 675, xl: 475 }}>
        <SlideButton bg={() => slideClick(1)} handleClick={() => setSlideNum(1)} />
        <SlideButton bg={() => slideClick(2)} handleClick={() => setSlideNum(2)} />
        <SlideButton bg={() => slideClick(3)} handleClick={() => setSlideNum(3)} />
        <SlideButton bg={() => slideClick(4)} handleClick={() => setSlideNum(4)} />
        <SlideButton bg={() => slideClick(5)} handleClick={() => setSlideNum(5)} />
      </Flex>
    </Flex>
  );
})

export default Berita;
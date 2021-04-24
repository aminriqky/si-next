import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Link, Text, SlideFade, Flex, Box, Img, Button,
  Table, Thead, Tr, Th, Tbody, Td
} from "@chakra-ui/react";
import useWindowDimensions from "../public/WindowDimensions";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { createBreakpoints } from "@chakra-ui/theme-tools";
import Menu from '../public/menu';

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function SlideText(props) {
  return (
    <Box className="slidetext">
      <Text mt={props.fromTop} mb='2vw' color="white" fontSize={props.textSlide}>
        {props.slideText}
      </Text>
      <Text mb='1vw' color="white" fontSize={props.textSlide - 8}>
        {props.slideVimi}
      </Text>
      <Box className="linePreloader" />
    </Box>);
}

function SlideShow(props) {
  return (
    <SlideFade in={props.slideShow} offsetY="20px">
      <Img className="banner" src={props.slideImg} alt="Visi & Misi" width={props.width} />
    </SlideFade>);
}

function Agenda(props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th textAlign="center" bgColor="black" color="white">
            AGENDA
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.children}
      </Tbody>
    </Table>
  );
}

function AgendaCell(props) {
  return (
    <Td display="inline-block" mx="50px">
      <Button colorScheme="white" color="black" width="60" height="auto">
        <Flex flexDirection="row">
          <Box p="2.5" m="2.5" textAlign="center" border="2px">
            <Text as="b" fontSize="lg">{props.hari}</Text>
            <Text fontSize="xs">{props.hariBulan}</Text>
          </Box>
          <Box alignSelf="center" m="2">
            <Text fontSize="md" as="b">{props.kegiatan}</Text>
            <Text fontSize="sm">{props.tanggal}</Text>
          </Box>
        </Flex>
      </Button>
    </Td>
  )
}

export default function Home() {
  const { width } = useWindowDimensions();

  const [slideShow, setSlideShow] = useState(false);
  const [slideText, setSlideText] = useState("");
  const [slideNum, setSlideNum] = useState(1);
  const [slideImg, setSlideImg] = useState(null);
  const [slideVimi, setSlideVimi] = useState("Visi");

  useEffect(() => {
    if (slideShow === false) {
      wait(1000).then(() => setSlideShow(true) & setSlideNum(slideNum + 1));
      if (slideNum === 1) {
        setSlideText("Mewujudkan program studi sistem informasi yang diakui di kawasan Asia Tenggara dan  berkarakter Islami pada tahun 2027");
        setSlideImg("visi.png")
        setSlideVimi("Visi")
      } else if (slideNum === 2) {
        setSlideText("Melaksanakan kegiatan-kegiatan akademik yang berkarakter islami");
        setSlideNum(0);
        setSlideImg("misi.png")
        setSlideVimi("Misi")
      }
      wait(7500).then(() => setSlideShow(false));
    }
  });

  function responsive() {
    let tab = null;
    if (width < 1280) {
      tab = "column"
    } else {
      tab = "row"
    }
    return tab
  }

  function fromTop() {
    let top = null;
    if (width > 1150) {
      top = '16vw'
    }
    else if (width <= 1150 & width >= 800) {
      top = '20vw'
    }
    else {
      top = '21vw'
    }
    return top
  }

  function textSlide() {
    let size = null;
    if (width > 1150) {
      size = 42
    }
    else if (width <= 1150 & width >= 800) {
      size = 26
    }
    else {
      size = 16
    }
    return size
  }

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideText={<SlideText fromTop={fromTop()} slideText={slideText.toUpperCase()} textSlide={textSlide()} slideVimi={slideVimi} />}
        slideShow={<SlideShow width={width} slideShow={slideShow} slideImg={slideImg} />}
        fromTop={fromTop()} textSlide={textSlide()}>
        <Box mt="40vw" zIndex={999} position="absolute" bg="white" w="100%" h="14vw">
          <Flex flexDirection={responsive}>
            <Agenda>
              <AgendaCell hari="RAB" hariBulan="31 MAR" kegiatan="Ujian Seminar Hasil" tanggal="31 Maret 2021" />
              <AgendaCell hari="RAB" hariBulan="31 MAR" kegiatan="Ujian Seminar Hasil" tanggal="31 Maret 2021" />
              <AgendaCell hari="RAB" hariBulan="31 MAR" kegiatan="Ujian Seminar Hasil" tanggal="31 Maret 2021" />
              <AgendaCell hari="RAB" hariBulan="31 MAR" kegiatan="Ujian Seminar Hasil" tanggal="31 Maret 2021" />
            </Agenda>
            <Box width={{ base: "100%", md: "620px" }} className="image">
              <Img src="/yt.png" alt="Logo UIN RF Putih" />
            </Box>
            <Flex flexDirection="column">
              <Box bgColor="teal.700" width={{ base: "100%", md: "380px" }} py="12" >
                <Link href="http://jurnal.radenfatah.ac.id/index.php/jusifo" ml="12" isExternal>
                  <ExternalLinkIcon mr="2" mb="1" /><b>JUSIFO</b>
                </Link>
                <Text fontSize="xs" ml="12">e-ISSN 2623-1662</Text>
                <Text fontSize="xs" ml="12">p-ISSN 2460-092X</Text>
              </Box>
              <Box bgColor="teal.600" width={{ base: "100%", md: "380px" }} py="9" >
                <Link href="https://chakra-ui.com" ml="12">
                  <ExternalLinkIcon mr="2" mb="1" /><b>Katalog Statistik</b>
                </Link>
                <Text fontSize="xs" ml="12">Tren informasi data prodi</Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Menu>
    </>
  );
}

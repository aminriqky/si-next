import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Link, Text, Flex, Box, Img, AspectRatio, useBreakpointValue,
  Table, Thead, Tr, Th, Tbody, Td, useDisclosure,
  Modal, ModalOverlay, ModalContent, SlideFade
} from "@chakra-ui/react";
import useWindowDimensions from "../public/WindowDimensions";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Menu from '../public/menu';
import ExNav from '../public/exnav'
import axios from "axios";
import dayjs from 'dayjs';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function SlideText(props) {
  return (
    <Box className="slidetext">
      <Text mt={{ base: "20vw", xl: "16vw" }} mb='2vw' color="white" fontSize={{ base: 12, xl: 38 }}>
        {props.slideText}
      </Text>
      <Text mb='1vw' color="white" fontSize={{ base: 14 - 8, lg: 24 - 8, xl: 40 - 8 }}>
        {props.slideVimi}
      </Text>
      <Box className="linePreloader" />
    </Box>
  );
}

function SlideShow(props) {
  return (
    <SlideFade in={props.slideShow} offsetY="20px">
      <Img className="banner" src={props.slideImg} alt="Visi & Misi" width={props.width} />
    </SlideFade>
  );
}

function AgendaCell(props) {
  return (
    <Td>
      <Flex flexDirection="row">
        <Box minW="60px" height="60px" mr={{ base: 2 }} m={{ xl: 2 }} textAlign="center" border="2px">
          <Text mt="10px" alignSelf="center" fontWeight="bold" fontSize="lg">{props.hari}</Text>
          <Text fontSize="xs">{props.hariBulan}</Text>
        </Box>
        <Box alignSelf="center">
          <Text fontSize={{ base: "xs", xl: "md" }}>
            <Link fontWeight="semibold" href="http://jurnal.radenfatah.ac.id/index.php/jusifo">
              {props.kegiatan}
            </Link>
          </Text>
          <Text fontSize="sm">{props.tanggal}</Text>
        </Box>
      </Flex>
    </Td>
  )
}

export default function Home() {
  const { width } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const responsive = useBreakpointValue({ base: "column", xl: "row" })
  const [daftarAgenda, setDaftarAgenda] = useState(null);
  const days = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];

  const [slideShow, setSlideShow] = useState(false);
  const [slideText, setSlideText] = useState("");
  const [slideNum, setSlideNum] = useState(1);
  const [slideImg, setSlideImg] = useState(null);
  const [slideVimi, setSlideVimi] = useState("Visi");

  useEffect(() => {
    if (daftarAgenda === null) {
      axios.get(`https://webprodi.sashi.id/api/agenda/baru`)
        .then(res => {
          const agenda = res.data;
          setDaftarAgenda(agenda);
        })
    }
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
  })

  function dots(str) {
    if (str !== null & str.length > 20) {
      return str.slice(0, 20) + "...";
    } else {
      return str
    }
  }

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu
        slideText={<SlideText slideText={slideText.toUpperCase()} slideVimi={slideVimi} />}
        slideShow={<SlideShow width={width} slideShow={slideShow} slideImg={slideImg} />}
        pageHeight="49.4vw"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW={{ base: 315, xl: 720 }} minH={{ base: 380, xl: 540 }}>
          {
            width < 1280 &&
            <iframe
              title="Profil SI"
              width="450"
              height="380"
              src="https://www.youtube.com/embed/Y3MALDulv10?rel=0"
              allowFullScreen
            />
          }
          {
            width > 1280 &&
            <iframe
              title="Profil SI"
              width="720"
              height="540"
              src="https://www.youtube.com/embed/Y3MALDulv10?rel=0"
              allowFullScreen
            />
          }
        </ModalContent>
      </Modal>
      <Flex flexDirection={responsive} zIndex="2">
        <Box overflowX="auto">
          <Table size="md">
            <Thead>
              <Tr>
                <Th colSpan="2" textAlign="center" bgColor="black" color="white">
                  AGENDA
              </Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                daftarAgenda !== null &&
                <>
                  <Tr>
                    <AgendaCell key={daftarAgenda[0].id}
                      hari={days[dayjs(daftarAgenda[0].waktu).format('d')]}
                      hariBulan={dayjs(daftarAgenda[0].waktu).format('DD/MM')}
                      kegiatan={dots(daftarAgenda[0].detail_kegiatan)}
                      tanggal={dots(daftarAgenda[0].tempat)}
                    />
                    <AgendaCell key={daftarAgenda[1].id}
                      hari={days[dayjs(daftarAgenda[1].waktu).format('d')]}
                      hariBulan={dayjs(daftarAgenda[1].waktu).format('DD/MM')}
                      kegiatan={dots(daftarAgenda[1].detail_kegiatan)}
                      tanggal={dots(daftarAgenda[1].tempat)}
                    />
                  </Tr>
                  <Tr>
                    <AgendaCell key={daftarAgenda[2].id}
                      hari={days[dayjs(daftarAgenda[2].waktu).format('d')]}
                      hariBulan={dayjs(daftarAgenda[2].waktu).format('DD/MM')}
                      kegiatan={dots(daftarAgenda[2].detail_kegiatan)}
                      tanggal={dots(daftarAgenda[2].tempat)}
                    />
                    <AgendaCell key={daftarAgenda[3].id}
                      hari={days[dayjs(daftarAgenda[3].waktu).format('d')]}
                      hariBulan={dayjs(daftarAgenda[3].waktu).format('DD/MM')}
                      kegiatan={dots(daftarAgenda[3].detail_kegiatan)}
                      tanggal={dots(daftarAgenda[3].tempat)}
                    />
                  </Tr>
                </>
              }
            </Tbody>
          </Table>
        </Box>
        <AspectRatio minW="315">
          <Box onClick={onOpen} bgImage="url(play.png)" bgSize="100px" bgRepeat="no-repeat" width="10px" bgPosition="center">
            <Img src="yt.png" sx={{ filter: "opacity(50%)" }} _hover={{ filter: "opacity(25%)" }} />
          </Box>
        </AspectRatio>
        <Flex flexDirection="column" color="white">
          <Box bgColor="teal.700" width={{ base: "100%", xl: "422px", '2xl': "609px" }} height="142px">
            <Box m="12">
              <Link href="http://jurnal.radenfatah.ac.id/index.php/jusifo" isExternal>
                <Flex flexDirection="row">
                  <ExternalLinkIcon mr="2" mb="2.5" />
                  <Text fontWeight="bold">JUSIFO</Text>
                </Flex>
              </Link>
              <Text fontSize="xs">e-ISSN 2623-1662</Text>
              <Text fontSize="xs">p-ISSN 2460-092X</Text>
            </Box>
          </Box>
          <Box bgColor="teal.600" width={{ base: "100%", xl: "422px", '2xl': "609px" }} height="116px">
            <Box mx="12" my="8">
              <Link href="https://chakra-ui.com" isExternal>
                <Flex flexDirection="row">
                  <ExternalLinkIcon mr="2" mb="2.5" />
                  <Text fontWeight="bold">Katalog Statistik</Text>
                </Flex>
              </Link>
              <Text fontSize="xs">Tren informasi data prodi</Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Flex>

      </Flex>
      <ExNav />
    </>
  );
}

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import {
  Text, Flex, Box, Img, AspectRatio, useBreakpointValue,
  Table, Thead, Tr, Th, useDisclosure, SlideFade, Icon,
  Link, Modal, ModalOverlay, ModalContent, Divider
} from "@chakra-ui/react";
import NavLink from "next/link";
import { FcTemplate, FcGraduationCap, FcApprove } from "react-icons/fc";
import useWindowDimensions from "../public/WindowDimensions";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { MdNavigateNext } from "react-icons/md"
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
      <Text mt={{ base: "20vw", xl: "18vw" }} mb='2vw' color="white" fontSize={{ base: 12, lg: 24, xl: 36 }}>
        {props.slideText}
      </Text>
      <Text mb='1vw' color="white" fontSize={{ base: 10, lg: 20, xl: 30 }}>
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
    <Flex dykey={props.dykey} flexDirection="row" flex="1">
      <Box minW="60px" height="60px" m={{ base: "3vw", xl: "1.41vw" }} textAlign="center" border="2px">
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">{props.hari}</Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize="md">
          <Link fontWeight="semibold">
            <NavLink as={props.dylink} href="/agenda/[agenda]">
              {props.kegiatan}
            </NavLink>
          </Link>
        </Text>
        <Text fontSize="sm">
          {props.tanggal}
        </Text>
      </Box>
    </Flex>
  )
}

function PengumumanCell(props) {
  return (
    <Flex dykey={props.key} flexDirection="row" flex="1">
      <Box>
        <Text fontSize="md" color="orange.800">
          <Link fontWeight="semibold">
            <NavLink as={props.dylink} href="/pengumuman/[pengumuman]">
              {props.judul}
            </NavLink>
          </Link>
        </Text>
        <Text fontSize="sm" pb="5px">
          {props.tanggal}
        </Text>
      </Box>
    </Flex>
  );
}

function KehadiranCell(props) {
  return (
    <>
      <Flex flexDir="row">
        <Img
          borderRadius="full"
          boxSize="75px"
          src={props.gambar}
          alt="Avatar"
          mr="50px"
        />
        <Flex dykey={props.key} flexDirection="row" flex="1" mt="15px">
          <Box>
            <Text fontSize="md" color="orange.800">
              <Link fontWeight="semibold">
                <NavLink as={props.dylink} href="/pengumuman/[pengumuman]">
                  {props.judul}
                </NavLink>
              </Link>
            </Text>
            <Text fontSize="sm" pb="5px">
              {props.tanggal}
            </Text>
          </Box>
        </Flex>
        {
          props.hadir === 1 &&
          <Box ml="50px" borderRadius="full" border="solid teal 2px" height="30px" mt="25px">
            <Text px="10" color="teal" fontWeight="medium">
              HADIR
            </Text>
          </Box>
        }
        {
          props.hadir !== 1 &&
          <Box ml="50px" borderRadius="full" border="solid crimson 2px" height="30px" mt="25px">
            <Text px="6" color="crimson" fontWeight="medium">
              TIDAK ADA
            </Text>
          </Box>
        }
      </Flex>
    </>
  );
}

function ArtikelCell(props) {
  return (
    <Flex my="25" px="6" key={props.dykey} flexDir="column" width={{ base: "100%", xl: "200px" }} bg="blue.600" mr="50px">
      <Text color="white" fontWeight="bold" pt="6" mb="6">
        {props.tema}
      </Text>
      <Text fontSize="sm" color="white">
        <Link fontWeight="semibold">
          <NavLink as={props.dylink} href="/artikel/[artikel]">
            {props.judul}
          </NavLink>
        </Link>
      </Text>
      <Text fontSize="xs" color="white">
        {props.children}
      </Text>
      <Text fontSize="xs" color="gray.300" pt="4px" pb="6">
        {props.tanggal}
      </Text>
    </Flex>
  );
}


export default function Home() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const responsive = useBreakpointValue({ base: "column", xl: "row" })
  const [daftarAgenda, setDaftarAgenda] = useState(null);
  const [daftarPengumuman, setDaftarPengumuman] = useState(null);
  const [daftarArtikel, setDaftarArtikel] = useState(null);
  const [daftarKehadiran, setDaftarKehadiran] = useState(null);

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
    if (daftarPengumuman === null) {
      axios.get(`https://webprodi.sashi.id/api/pengumuman/all`)
        .then(res => {
          const pengumuman = res.data;
          setDaftarPengumuman(pengumuman);
        })
    }
    if (daftarArtikel === null) {
      axios.get(`https://webprodi.sashi.id/api/article/all`)
        .then(res => {
          const artikel = res.data;
          setDaftarArtikel(artikel);
        })
    }
    if (daftarKehadiran === null) {
      axios.get(`https://webprodi.sashi.id/api/user/all`)
        .then(res => {
          const kehadiran = res.data;
          setDaftarKehadiran(kehadiran);
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

  function dots(num, str) {
    if (str !== null & str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str
    }
  }

  const agenda = (e) => {
    e.preventDefault()
    router.push('/agenda/daftar-agenda');
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
        <ModalContent minW={{ base: 315, xl: 720 }} minH={{ base: 310, xl: 540 }}>
          {
            width < 1280 &&
            <iframe
              title="Profil SI"
              width="410"
              height="310"
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
      <Flex flexDirection={responsive}>
        <Table size="md">
          <Thead>
            <Tr>
              <Th onClick={agenda} colSpan="2" textAlign="center" bgColor="black" color="white">
                AGENDA
                <Icon float="right" as={MdNavigateNext} w="15px" h="auto" />
              </Th>
            </Tr>
          </Thead>
          {
            daftarAgenda !== null &&
            <>
              <Flex flexDirection="row">
                <AgendaCell dykey={daftarAgenda[0].id}
                  hari={dayjs(daftarAgenda[0].waktu).locale('id').format('ddd').toUpperCase()}
                  hariBulan={dayjs(daftarAgenda[0].waktu).format('DD/MM')}
                  kegiatan={dots(20, daftarAgenda[0].detail_kegiatan)}
                  tanggal={dots(20, daftarAgenda[0].tempat)}
                  dylink={`/agenda/${daftarAgenda[0].id}`}
                />
                <AgendaCell dykey={daftarAgenda[1].id}
                  hari={dayjs(daftarAgenda[1].waktu).locale('id').format('ddd').toUpperCase()}
                  hariBulan={dayjs(daftarAgenda[1].waktu).format('DD/MM')}
                  kegiatan={dots(20, daftarAgenda[1].detail_kegiatan)}
                  tanggal={dots(20, daftarAgenda[1].tempat)}
                  dylink={`/agenda/${daftarAgenda[1].id}`}
                />
              </Flex>
              <Divider />
              <Flex flexDirection="row">
                <AgendaCell dykey={daftarAgenda[2].id}
                  hari={dayjs(daftarAgenda[2].waktu).locale('id').format('ddd').toUpperCase()}
                  hariBulan={dayjs(daftarAgenda[2].waktu).format('DD/MM')}
                  kegiatan={dots(20, daftarAgenda[2].detail_kegiatan)}
                  tanggal={dots(20, daftarAgenda[2].tempat)}
                  dylink={`/agenda/${daftarAgenda[2].id}`}
                />
                <AgendaCell dykey={daftarAgenda[3].id}
                  hari={dayjs(daftarAgenda[3].waktu).locale('id').format('ddd').toUpperCase()}
                  hariBulan={dayjs(daftarAgenda[3].waktu).format('DD/MM')}
                  kegiatan={dots(20, daftarAgenda[3].detail_kegiatan)}
                  tanggal={dots(20, daftarAgenda[3].tempat)}
                  dylink={`/agenda/${daftarAgenda[3].id}`}
                />
              </Flex>
              <Divider />
            </>
          }
        </Table>
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
      <Divider />
      <Flex flexDirection={responsive} my="25" mx={{ base: 25, xl: 125 }}>
        {
          daftarArtikel !== null &&
          <ArtikelCell
            dykey={daftarArtikel[0].id}
            tema="ARTIKEL"
            judul={dots(47, daftarArtikel[0].judul)}
            tanggal={dayjs(daftarArtikel[0].tanggal).locale('id').format('DD MMMM YYYY')}
          >
            <div dangerouslySetInnerHTML={{ __html: dots(200, daftarArtikel[0].detail) }} />
          </ArtikelCell>
        }
        <Flex flexDir="column" my="25" mr={{ base: 25, xl: 75 }}>
          <Text fontSize="24" py="2%" fontWeight="medium">
            <Icon as={FcTemplate} w="40px" h="auto" />
          &thinsp;
          PENGUMUMAN
        </Text>
          {
            daftarPengumuman !== null &&
            <>
              <PengumumanCell
                dykey={daftarPengumuman[0].id}
                judul={daftarPengumuman[0].judul}
                tanggal={dayjs(daftarPengumuman[0].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
              />
              <Divider />
              <PengumumanCell
                dykey={daftarPengumuman[1].id}
                judul={daftarPengumuman[1].judul}
                tanggal={dayjs(daftarPengumuman[1].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
              />
              <Divider />
              <PengumumanCell
                dykey={daftarPengumuman[2].id}
                judul={daftarPengumuman[2].judul}
                tanggal={dayjs(daftarPengumuman[2].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
              />
              <Divider />
              <PengumumanCell
                dykey={daftarPengumuman[3].id}
                judul={daftarPengumuman[3].judul}
                tanggal={dayjs(daftarPengumuman[3].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
              />
              <Divider />
              <PengumumanCell
                dykey={daftarPengumuman[4].id}
                judul={daftarPengumuman[4].judul}
                tanggal={dayjs(daftarPengumuman[4].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
              />
            </>
          }
        </Flex>
        <Flex my={{ base: 25, xl: 75 }} px="10" flexDir="column" width={{ base: "100%", xl: "300px" }} border="solid lightgray 1px">
          <Text color="gray" fontWeight="bold" pt="8" mb="4">
            INFO PENDAFTARAN
          </Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px" />
            <Link fontWeight="semibold" href="https://ltmpt.ac.id/" isExternal>
              LTMPT
            </Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px" />
            <Link fontWeight="semibold" href="https://span-ptkin.ac.id/" isExternal>
              SPAN-PTKIN
            </Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px" />
            <Link fontWeight="semibold" href="https://um-ptkin.ac.id/" isExternal>
              UM-PTKIN
            </Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="12">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px" />
            <Link fontWeight="semibold" href="http://um-mandiri.radenfatah.ac.id/" isExternal>
              UM-MANDIRI
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Divider />
      <Flex bg="gray.50" flexDirection={responsive} py="25" px={{ base: 25, xl: 125 }}>
        <Flex flexDir="column" my="25" mr={{ base: 25, xl: 75 }}>
          <Text fontSize="24" py="2%" fontWeight="medium">
            <Icon as={FcApprove} w="40px" h="auto" />
          &thinsp;
          KEHADIRAN
          </Text>
          &emsp;
          {
            daftarKehadiran !== null &&
            <>
              <KehadiranCell
                dykey={daftarKehadiran[0].id}
                gambar={`https://webprodi.sashi.id/storage/${daftarKehadiran[0].avatar}`}
                judul={daftarKehadiran[0].name}
                tanggal={daftarKehadiran[0].jabatan}
                hadir={daftarKehadiran[0].hadir}
              />
            </>
          }
        </Flex>
      </Flex>
      <Divider />
      <ExNav />
    </>
  );
}

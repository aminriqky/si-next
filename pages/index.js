import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import {
  Text, Flex, Box, Img, AspectRatio, useBreakpointValue,
  Button, useDisclosure, Icon, Divider, Link, Modal,
  ModalOverlay, ModalContent, Skeleton
} from "@chakra-ui/react";
import NavLink from "next/link";
import { FcTemplate, FcGraduationCap, FcApprove, FcGlobe } from "react-icons/fc";
import useWindowDimensions from "../public/WindowDimensions";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { MdDeveloperBoard } from "react-icons/md";
import Slide from "../public/slide";
import Menu from '../public/menu';
import ExNav from '../public/exnav';
import dayjs from 'dayjs';
import Image from 'next/image';
import { agenda } from './api/agenda';
import { pengumuman } from './api/pengumuman';
import { artikel } from './api/artikel';
import { kehadiran } from './api/kehadiran';

function AgendaCell(props) {
  return (
    <Flex ml={{ base: "12%", xl: 0 }} dykey={props.dykey} flexDirection="row" flex="1">
      <Box alignSelf="center" minW="60px" height="60px" m={{ base: "3vw", xl: "1.41vw" }} textAlign="center" border="2px">
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">{props.hari}</Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" minW="120px" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize={{ base: "sm", xl: "md" }}>
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

function AgendaLoad() {
  return (
    <Flex ml={{ base: "12%", xl: 0 }} flexDirection="row" flex="1">
      <Skeleton alignSelf="center" minW="60px" height="60px" m={{ base: "3vw", xl: "1.41vw" }} textAlign="center" border="2px" />
      <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
        <Skeleton height="20px" width={{ base: "185px", xl: "139px", "2xl": "150px" }} my="2" />
        <Skeleton height="20px" width={{ base: "185px", xl: "139px", "2xl": "150px" }} my="2" />
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
          mr={{ base: "25px", xl: "50px" }}
        />
        <Flex dykey={props.key} flexDirection="row" flex="1" mt={{ base: 0, xl: "15px" }}>
          <Box>
            <Text fontSize={{ base: "sm", xl: "md" }} color="orange.800">
              <Link fontWeight="semibold">
                <NavLink as={props.dylink} href="/pengumuman/[pengumuman]">
                  {props.judul}
                </NavLink>
              </Link>
            </Text>
            <Text fontSize="sm" pb="5px">
              {props.deskripsi}
            </Text>
          </Box>
        </Flex>
        {
          props.hadir === 1 &&
          <Box ml={{ base: "25px", xl: "100px" }} borderRadius="full" border="solid teal 2px" height="30px" mt="25px" pointerEvents="none">
            <Text px={{ base: 6, xl: 10 }} color="teal" fontWeight="medium">
              HADIR
            </Text>
          </Box>
        }
        {
          props.hadir !== 1 &&
          <Box ml={{ base: "25px", xl: "100px" }} borderRadius="full" border="solid crimson 2px" height="30px" mt="25px" pointerEvents="none">
            <Text px={{ base: 2, xl: 6 }} color="crimson" fontWeight="medium">
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
      <Text fontSize="xs" color="gray.300" pt="4px" pb="2">
        {props.tanggal}
      </Text>
      <Text fontSize="xs" color="white">
        {props.children}
      </Text>
    </Flex>
  );
}

export default function Home({ daftarAgenda, daftarPengumuman, daftarArtikel, daftarKehadiran }) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const responsive = useBreakpointValue({ base: "column", xl: "row" })
  const [daftarIframe1, setDaftarIframe1] = useState(false);
  const [daftarIframe2, setDaftarIframe2] = useState(false);

  useEffect(() => {
    setDaftarIframe1(true);
    setDaftarIframe2(true);
  }, []);

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
      <Menu pageHeight="49.4vw" slide={<Slide />} />
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
        <Flex flexDir="column">
          <Button w="100%" onClick={agenda} size="md" borderRadius="0" _hover={{ bg: "blackAlpha.800" }} bg="blackAlpha.900" color="white">
            <Icon as={MdDeveloperBoard} boxSize={5} mr="10px" />
            <Text>AGENDA</Text>
          </Button>
          <Flex flexDir={responsive} my={{ base: "15px", xl: 0 }}>
            {
              daftarAgenda !== null &&
              <>
                <Flex flexDirection="column">
                  <AgendaCell dykey={daftarAgenda[0].id}
                    hari={dayjs(daftarAgenda[0].waktu).locale('id').format('ddd').toUpperCase()}
                    hariBulan={dayjs(daftarAgenda[0].waktu).format('DD/MM')}
                    kegiatan={dots(28, daftarAgenda[0].detail_kegiatan)}
                    tanggal={dots(20, daftarAgenda[0].tempat)}
                    dylink={`/agenda/${daftarAgenda[0].id}`}
                  />
                  <AgendaCell dykey={daftarAgenda[1].id}
                    hari={dayjs(daftarAgenda[1].waktu).locale('id').format('ddd').toUpperCase()}
                    hariBulan={dayjs(daftarAgenda[1].waktu).format('DD/MM')}
                    kegiatan={dots(28, daftarAgenda[1].detail_kegiatan)}
                    tanggal={dots(20, daftarAgenda[1].tempat)}
                    dylink={`/agenda/${daftarAgenda[1].id}`}
                  />
                </Flex>
                <Flex flexDirection="column">
                  <AgendaCell dykey={daftarAgenda[2].id}
                    hari={dayjs(daftarAgenda[2].waktu).locale('id').format('ddd').toUpperCase()}
                    hariBulan={dayjs(daftarAgenda[2].waktu).format('DD/MM')}
                    kegiatan={dots(28, daftarAgenda[2].detail_kegiatan)}
                    tanggal={dots(20, daftarAgenda[2].tempat)}
                    dylink={`/agenda/${daftarAgenda[2].id}`}
                  />
                  <AgendaCell dykey={daftarAgenda[3].id}
                    hari={dayjs(daftarAgenda[3].waktu).locale('id').format('ddd').toUpperCase()}
                    hariBulan={dayjs(daftarAgenda[3].waktu).format('DD/MM')}
                    kegiatan={dots(28, daftarAgenda[3].detail_kegiatan)}
                    tanggal={dots(20, daftarAgenda[3].tempat)}
                    dylink={`/agenda/${daftarAgenda[3].id}`}
                  />
                </Flex>
              </>
            }
            {
              daftarAgenda === null &&
              <>
                <Flex flexDirection="column">
                  <AgendaLoad />
                  <AgendaLoad />
                </Flex>
                <Flex flexDirection="column">
                  <AgendaLoad />
                  <AgendaLoad />
                </Flex>
              </>
            }
          </Flex>
        </Flex>
        <AspectRatio minW="315">
          <Box onClick={onOpen} bgImage="url(play.png)" bgSize="100px" bgRepeat="no-repeat" width="10px" bgPosition="center">
            <AspectRatio sx={{ filter: "opacity(50%)" }} _hover={{ filter: "opacity(25%)" }} width="100%" height="100%">
              <Image src="/yt.png" layout="fill" objectFit="fill" />
            </AspectRatio>
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
        {
          daftarArtikel === null &&
          <Skeleton my="25" height={{ base: "225px", xl: "365px" }} flexDir="column" width={{ base: "100%", xl: "200px" }} mr="50px" />
        }
        <Flex flexDir="column" my="25" mr={{ base: 25, xl: 75 }}>
          <Text fontSize="24" py="2%" fontWeight="medium">
            <Icon as={FcTemplate} w="40px" h="auto" />
            &thinsp;
            PENGUMUMAN
          </Text>
          <Flex flexDir="column" width={{ xl: "450px", "2xl": "600px" }}>
            {
              daftarPengumuman !== null &&
              <>
                <PengumumanCell
                  dykey={daftarPengumuman[0].id}
                  judul={daftarPengumuman[0].judul}
                  tanggal={dayjs(daftarPengumuman[0].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                  dylink={`/pengumuman/${daftarPengumuman[0].id}`}
                />
                <Divider />
                <PengumumanCell
                  dykey={daftarPengumuman[1].id}
                  judul={daftarPengumuman[1].judul}
                  tanggal={dayjs(daftarPengumuman[1].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                  dylink={`/pengumuman/${daftarPengumuman[1].id}`}
                />
                <Divider />
                <PengumumanCell
                  dykey={daftarPengumuman[2].id}
                  judul={daftarPengumuman[2].judul}
                  tanggal={dayjs(daftarPengumuman[2].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                  dylink={`/pengumuman/${daftarPengumuman[2].id}`}
                />
                <Divider />
                <PengumumanCell
                  dykey={daftarPengumuman[3].id}
                  judul={daftarPengumuman[3].judul}
                  tanggal={dayjs(daftarPengumuman[3].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                  dylink={`/pengumuman/${daftarPengumuman[3].id}`}
                />
                <Divider />
                <PengumumanCell
                  dykey={daftarPengumuman[4].id}
                  judul={daftarPengumuman[4].judul}
                  tanggal={dayjs(daftarPengumuman[4].updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                  dylink={`/pengumuman/${daftarPengumuman[4].id}`}
                />
              </>
            }
            {
              daftarPengumuman === null &&
              <>
                <Skeleton display="flex" my="5px" height="50px" width={{ xl: "450px", "2xl": "600px" }} />
                <Divider />
                <Skeleton display="flex" my="5px" height="50px" width={{ xl: "450px", "2xl": "600px" }} />
                <Divider />
                <Skeleton display="flex" my="5px" height="50px" width={{ xl: "450px", "2xl": "600px" }} />
                <Divider />
                <Skeleton display="flex" my="5px" height="50px" width={{ xl: "450px", "2xl": "600px" }} />
                <Divider />
                <Skeleton display="flex" my="5px" height="50px" width={{ xl: "450px", "2xl": "600px" }} />
              </>
            }
          </Flex>
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
        <Flex flexDir="column" my="25" mr={{ base: 0, xl: 50 }}>
          {
            daftarIframe2 &&
            <iframe
              style={{ height: "299px", width: "200px" }}
              loading="lazy"
              scrolling="no"
              src="https://www.islamicfinder.org/prayer-widget/1633070/shafi/11/0/20.0/18.0"
            />
          }
        </Flex>
        <Flex flexDir="column" my="25" mr={{ base: 0, xl: 100 }}>
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
                deskripsi={daftarKehadiran[0].jabatan}
                hadir={daftarKehadiran[0].hadir}
              />
              <Divider my="10px" />
              <KehadiranCell
                dykey={daftarKehadiran[1].id}
                gambar={`https://webprodi.sashi.id/storage/${daftarKehadiran[1].avatar}`}
                judul={daftarKehadiran[1].name}
                deskripsi={daftarKehadiran[1].jabatan}
                hadir={daftarKehadiran[1].hadir}
              />
            </>
          }
          {
            daftarKehadiran === null &&
            <>
              <Flex flexDir="row">
                <Skeleton borderRadius="full" boxSize="75px" mr={{ base: "25px", xl: "50px" }} />
                <Skeleton height="50px" width={{ base: "250px", xl: "450px" }} mt="15px" />
              </Flex>
              <Divider my="10px" />
              <Flex flexDir="row">
                <Skeleton borderRadius="full" boxSize="75px" mr={{ base: "25px", xl: "50px" }} />
                <Skeleton height="50px" width={{ base: "250px", xl: "450px" }} mt="15px" />
              </Flex>
            </>
          }
        </Flex>
        <Flex flexDir="column" my="25">
          <Text fontSize="24" py="2%" fontWeight="medium">
            <Icon as={FcGlobe} w="40px" h="auto" />
            &thinsp;
            LOKASI
          </Text>
          &emsp;
          {
            daftarIframe1 &&
            <iframe
              width="100%"
              height="180px"
              loading="lazy"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?q=Fakultas+Sains+dan+Teknologi+Kampus+B+UIN+Raden+Fatah+Palembang&amp;ie=UTF8&amp;&amp;output=embed"
            />
          }
        </Flex>
      </Flex>
      <Divider />
      <ExNav />
    </>
  );
}

export async function getServerSideProps() {
  const daftarAgenda = await agenda()
  const daftarPengumuman = await pengumuman()
  const daftarArtikel = await artikel()
  const daftarKehadiran = await kehadiran()

  return {
    props: { daftarAgenda, daftarPengumuman, daftarArtikel, daftarKehadiran }
  };
}
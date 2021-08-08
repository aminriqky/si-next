import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import {
  Text, Flex, Box, AspectRatio, useBreakpointValue,
  Button, useDisclosure, Icon, Divider, Link, Modal,
  ModalOverlay, ModalContent, Skeleton
} from "@chakra-ui/react";
import { FcTemplate, FcGraduationCap, FcApprove, FcGlobe } from "react-icons/fc";
import useWindowDimensions from "../public/WindowDimensions";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { MdDeveloperBoard } from "react-icons/md";
import Menu from '../public/menu';
import ExNav from '../public/exnav';
import dayjs from 'dayjs';
import Image from 'next/image';
import dynamic from 'next/dynamic'
import { agenda } from './api/agenda';
import { pengumuman } from './api/pengumuman';
import { artikel } from './api/artikel';
import { kehadiran } from './api/kehadiran';
import { berita } from './api/berita';

const Slide = dynamic(() => import('../public/slide'));
const Berita = dynamic(() => import('../public/berita'));
const AgendaCell = dynamic(
  () => import('../public/dynamic/AgendaCell'),
  {
    loading: () =>
      <Flex ml={{ base: "12%", xl: 0 }} flexDirection="row" flex="1">
        <Skeleton alignSelf="center" minW="60px" height="60px" m={{ base: "3vw", xl: "1.41vw" }} textAlign="center" border="2px" />
        <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
          <Skeleton height="20px" width={{ base: "185px", xl: "139px", "2xl": "150px" }} my="2" />
          <Skeleton height="20px" width={{ base: "185px", xl: "139px", "2xl": "150px" }} my="2" />
        </Box>
      </Flex>
  }
)
const ArtikelCell = dynamic(
  () => import('../public/dynamic/ArtikelCell'),
  {
    loading: () =>
      <Skeleton my="25" height={{ base: "225px", xl: "365px" }} flexDir="column" width={{ base: "100%", xl: "200px" }} mr="50px" />
  }
)
const KehadiranCell = dynamic(
  () => import('../public/dynamic/KehadiranCell'),
  {
    loading: () =>
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
)
const PengumumanCell = dynamic(
  () => import('../public/dynamic/PengumumanCell'),
  {
    loading: () =>
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
)

export default function Home({ daftarAgenda, daftarPengumuman, daftarArtikel, daftarKehadiran, daftarBerita }) {
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
              src="https://www.youtube.com/embed/pVEJ-TZeRPk?rel=0"
              allowFullScreen
            />
          }
          {
            width > 1280 &&
            <iframe
              title="Profil SI"
              width="720"
              height="540"
              src="https://www.youtube.com/embed/pVEJ-TZeRPk?rel=0"
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
            <Flex flexDirection="column">
              <AgendaCell dykey={daftarAgenda[0].id}
                hari={dayjs(daftarAgenda[0].waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(daftarAgenda[0].waktu).format('DD/MM')}
                judul={dots(28, daftarAgenda[0].judul)}
                tanggal={dots(18, daftarAgenda[0].tempat)}
                dylink={`/agenda/${daftarAgenda[0].id}`}
              />
              <AgendaCell dykey={daftarAgenda[1].id}
                hari={dayjs(daftarAgenda[1].waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(daftarAgenda[1].waktu).format('DD/MM')}
                judul={dots(28, daftarAgenda[1].judul)}
                tanggal={dots(18, daftarAgenda[1].tempat)}
                dylink={`/agenda/${daftarAgenda[1].id}`}
              />
            </Flex>
            <Flex flexDirection="column">
              <AgendaCell dykey={daftarAgenda[2].id}
                hari={dayjs(daftarAgenda[2].waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(daftarAgenda[2].waktu).format('DD/MM')}
                judul={dots(28, daftarAgenda[2].judul)}
                tanggal={dots(18, daftarAgenda[2].tempat)}
                dylink={`/agenda/${daftarAgenda[2].id}`}
              />
              <AgendaCell dykey={daftarAgenda[3].id}
                hari={dayjs(daftarAgenda[3].waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(daftarAgenda[3].waktu).format('DD/MM')}
                judul={dots(28, daftarAgenda[3].judul)}
                tanggal={dots(18, daftarAgenda[3].tempat)}
                dylink={`/agenda/${daftarAgenda[3].id}`}
              />
            </Flex>
          </Flex>
        </Flex>
        <AspectRatio minW="315">
          <Box onClick={onOpen} bgImage="url(play.png)" bgSize="100px" bgRepeat="no-repeat" width="10px" bgPosition="center">
            <AspectRatio sx={{ filter: "opacity(50%)" }} _hover={{ filter: "opacity(25%)" }} width="100%" height="100%">
              <Image src="/yt.png" layout="fill" objectFit="fill" />
            </AspectRatio>
          </Box>
        </AspectRatio>
        <Flex flex="1" flexDirection="column" color="white">
          <Box bgColor="teal.700" height="55%">
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
          <Box bgColor="teal.600" height="45%">
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
      <Berita
        gambar1={`https://webprodi.sashi.id/storage/${daftarBerita[0].thumbnail}`}
        judul1={dots(65, daftarBerita[0].judul)}
        detail1={dots(675, daftarBerita[0].detail)}
        dylink1={`/berita/${daftarBerita[0].id}`}
        gambar2={`https://webprodi.sashi.id/storage/${daftarBerita[1].thumbnail}`}
        judul2={dots(65, daftarBerita[1].judul)}
        detail2={dots(675, daftarBerita[1].detail)}
        dylink2={`/berita/${daftarBerita[1].id}`}
        gambar3={`https://webprodi.sashi.id/storage/${daftarBerita[2].thumbnail}`}
        judul3={dots(65, daftarBerita[2].judul)}
        detail3={dots(675, daftarBerita[2].detail)}
        dylink3={`/berita/${daftarBerita[2].id}`}
        gambar4={`https://webprodi.sashi.id/storage/${daftarBerita[3].thumbnail}`}
        judul4={dots(65, daftarBerita[3].judul)}
        detail4={dots(675, daftarBerita[3].detail)}
        dylink4={`/berita/${daftarBerita[3].id}`}
        gambar5={`https://webprodi.sashi.id/storage/${daftarBerita[4].thumbnail}`}
        judul5={dots(65, daftarBerita[4].judul)}
        detail5={dots(675, daftarBerita[4].detail)}
        dylink5={`/berita/${daftarBerita[4].id}`}
      />
      <Divider />
      <Flex flexDirection={responsive} my="25" justifyContent="center" mx={{ base: 25, xl: 125 }}>
        <ArtikelCell
          dykey={daftarArtikel[0].id}
          tema="ARTIKEL"
          judul={dots(47, daftarArtikel[0].judul)}
          tanggal={dayjs(daftarArtikel[0].tanggal).locale('id').format('DD MMMM YYYY')}
          dylink={`/artikel/${daftarArtikel[0].id}`}
        >
          <div dangerouslySetInnerHTML={{ __html: dots(260, daftarArtikel[0].detail) }} />
        </ArtikelCell>
        <Flex flexDir="column" my="25" mr={{ base: 25, xl: 75 }}>
          <Text fontSize="24" py="2%" fontWeight="medium">
            <Icon as={FcTemplate} w="40px" h="auto" />
            &thinsp;
            <Link fontWeight="semibold" onClick={(e) => {
              e.preventDefault()
              router.push("/pengumuman/daftar-pengumuman")
            }}>
              PENGUMUMAN
            </Link>
          </Text>
          <Flex flexDir="column" width={{ xl: "450px", "2xl": "600px" }}>
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
      <Flex bg="gray.50" justifyContent="center" flexDirection={responsive} py="25" px={{ base: 25, xl: 125 }}>
        <Flex flexDir="column" w={{ base: "100%", xl: "200px" }} my="25" mr={{ base: 0, xl: 50 }}>
          {
            daftarIframe2 &&
            <iframe
              style={{ height: "295px" }}
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
            <Link fontWeight="semibold" onClick={(e) => {
              e.preventDefault()
              router.push("/kehadiran/daftar-kehadiran")
            }}>
              KEHADIRAN
            </Link>
          </Text>
          &emsp;
          <KehadiranCell
            dykey={daftarKehadiran[0].id}
            gambar={`https://webprodi.sashi.id/storage/${daftarKehadiran[0].avatar}`}
            judul={daftarKehadiran[0].name}
            deskripsi={daftarKehadiran[0].jabatan}
            hadir={daftarKehadiran[0].hadir}
            dylink={`/kehadiran/${daftarKehadiran[0].id}`}
          />
          <Divider my="10px" />
          <KehadiranCell
            dykey={daftarKehadiran[1].id}
            gambar={`https://webprodi.sashi.id/storage/${daftarKehadiran[1].avatar}`}
            judul={daftarKehadiran[1].name}
            deskripsi={daftarKehadiran[1].jabatan}
            hadir={daftarKehadiran[1].hadir}
            dylink={`/kehadiran/${daftarKehadiran[1].id}`}
          />
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

export async function getStaticProps() {
  const daftarAgenda = await agenda()
  const daftarPengumuman = await pengumuman()
  const daftarArtikel = await artikel()
  const daftarKehadiran = await kehadiran()
  const daftarBerita = await berita()

  return {
    props: { daftarAgenda, daftarPengumuman, daftarArtikel, daftarKehadiran, daftarBerita },
    revalidate: 30
  };
}
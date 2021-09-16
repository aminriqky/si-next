import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  Text, Flex, Box, AspectRatio, Button, useDisclosure, Icon,
  Divider, Link, Modal, ModalOverlay, ModalContent, Skeleton,
  useMediaQuery, Img, VisuallyHidden
} from "@chakra-ui/react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { FcTemplate, FcGraduationCap, FcApprove, FcGlobe } from "react-icons/fc";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { MdDeveloperBoard, MdEmail, MdPhone } from "react-icons/md";
import Menu from '../public/menu';
import ExNav from '../public/exnav';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { agenda } from './api/agenda';
import { pengumuman } from './api/pengumuman';
import { artikel } from './api/artikel';
import { kehadiran } from './api/kehadiran';
import { berita } from './api/berita';
import { server } from "../config";

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
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)")
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1279px)")
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    router.push('/agenda');
  }

  return (
    <React.Fragment>
      <Menu pageHeight="49.4vw" slide={<Slide />} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW={{ base: 315, xl: 720 }} minH={{ base: 310, xl: 540 }}>
          {
            isLargerThan1280 ?
              <iframe
                title="Profil SI"
                width="720"
                height="540"
                src="https://www.youtube.com/embed/pVEJ-TZeRPk?rel=0"
                allowFullScreen
              />
              :
              <iframe
                title="Profil SI"
                width="410"
                height="310"
                src="https://www.youtube.com/embed/pVEJ-TZeRPk?rel=0"
                allowFullScreen
              />
          }
        </ModalContent>
      </Modal>
      <Flex flexDir={{ base: "column", xl: "row" }}>
        <Flex flexDir="column">
          <Button w="100%" onClick={agenda} size="md" borderRadius="0" _hover={{ bg: "blackAlpha.800" }} bg="blackAlpha.900" color="white">
            <Icon as={MdDeveloperBoard} boxSize={5} mr="10px" />
            <Text>AGENDA</Text>
          </Button>
          <Flex flexDir={{ base: "column", xl: "row" }} my={{ base: "15px", xl: 0 }}>
            <Flex flexDirection="column">
              <AgendaCell dykey={daftarAgenda[0].id}
                hari={dayjs(daftarAgenda[0].waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(daftarAgenda[0].waktu).format('DD/MM')}
                judul={dots(28, daftarAgenda[0].judul)}
                tempat={dots(18, daftarAgenda[0].tempat)}
                dylink={`/agenda/${daftarAgenda[0].id}`}
              />
              <AgendaCell dykey={daftarAgenda[1].id}
                hari={dayjs(daftarAgenda[1].waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(daftarAgenda[1].waktu).format('DD/MM')}
                judul={dots(28, daftarAgenda[1].judul)}
                tempat={dots(18, daftarAgenda[1].tempat)}
                dylink={`/agenda/${daftarAgenda[1].id}`}
              />
            </Flex>
            <Flex flexDirection="column">
              <AgendaCell dykey={daftarAgenda[2].id}
                hari={dayjs(daftarAgenda[2].waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(daftarAgenda[2].waktu).format('DD/MM')}
                judul={dots(28, daftarAgenda[2].judul)}
                tempat={dots(18, daftarAgenda[2].tempat)}
                dylink={`/agenda/${daftarAgenda[2].id}`}
              />
              <AgendaCell dykey={daftarAgenda[3].id}
                hari={dayjs(daftarAgenda[3].waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(daftarAgenda[3].waktu).format('DD/MM')}
                judul={dots(28, daftarAgenda[3].judul)}
                tempat={dots(18, daftarAgenda[3].tempat)}
                dylink={`/agenda/${daftarAgenda[3].id}`}
              />
            </Flex>
          </Flex>
        </Flex>
        <AspectRatio minW="315">
          <Box onClick={onOpen} bgImage="url(play.png)" bgSize="100px" bgRepeat="no-repeat" width="10px" bgPosition="center">
            <AspectRatio sx={{ filter: "opacity(50%)" }} _hover={{ filter: "opacity(25%)" }} width="100%" height="100%">
              <Img src="/yt.png" layout="fill" objectFit="fill" alt="yt-uinrf" />
            </AspectRatio>
          </Box>
        </AspectRatio>
        <Flex flex="1" flexDirection="column" color="white">
          <Box bgColor="teal.700" height="55%">
            <Box m="10">
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
            <Box mx="10" my="6">
              <Text fontWeight="bold">Kontak & Sosial Media</Text>
              <Link aria-label="Facebook Prodi SI" mr={3} href="https://web.facebook.com/groups/si.radenfatah" isExternal>
                <Icon as={SiFacebook} w="20px" h="auto" />
              </Link>
              <Link aria-label="Instagram Prodi SI" mr={3} href="https://www.instagram.com/sisteminformasi.radenfatah/" isExternal>
                <Icon as={SiInstagram} w="20px" h="auto" />
              </Link>
              <Link aria-label="Telepon Prodi SI" mr={3} href="tel:0711-356209">
                <Icon as={MdPhone} w="20px" h="auto" />
              </Link>
              <Link aria-label="E-Mail Prodi SI" mr={3} href="mailto:si@radenfatah.ac.id">
                <Icon as={MdEmail} w="20px" h="auto" />
              </Link>
              <Link aria-label="Youtube Prodi SI" mr={3} href="https://www.youtube.com/c/SistemInformasiRadenFatah" isExternal>
                <Icon as={SiYoutube} w="20px" h="auto" />
              </Link>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Divider />
      <Berita
        gambar1={`${server}/storage/${daftarBerita[0].thumbnail}`}
        judul1={dots(65, daftarBerita[0].judul)}
        detail1={dots(670, daftarBerita[0].detail)}
        dylink1={`/berita/${daftarBerita[0].id}`}
        gambar2={`${server}/storage/${daftarBerita[1].thumbnail}`}
        judul2={dots(65, daftarBerita[1].judul)}
        detail2={dots(670, daftarBerita[1].detail)}
        dylink2={`/berita/${daftarBerita[1].id}`}
        gambar3={`${server}/storage/${daftarBerita[2].thumbnail}`}
        judul3={dots(65, daftarBerita[2].judul)}
        detail3={dots(670, daftarBerita[2].detail)}
        dylink3={`/berita/${daftarBerita[2].id}`}
        gambar4={`${server}/storage/${daftarBerita[3].thumbnail}`}
        judul4={dots(65, daftarBerita[3].judul)}
        detail4={dots(670, daftarBerita[3].detail)}
        dylink4={`/berita/${daftarBerita[3].id}`}
        gambar5={`${server}/storage/${daftarBerita[4].thumbnail}`}
        judul5={dots(65, daftarBerita[4].judul)}
        detail5={dots(670, daftarBerita[4].detail)}
        dylink5={`/berita/${daftarBerita[4].id}`}
      />
      <Divider />
      <Flex flexDir={{ base: "column", xl: "row" }} my="25" justifyContent="center" mx={{ base: 25, xl: 125 }}>
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
              router.push("/pengumuman")
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
      <Flex bg="gray.50" justifyContent="center" flexDirection={{ base: "column", xl: "row" }} py="25" px={{ base: 25, xl: 125 }}>
        <Flex flexDir="column" w={{ base: "100%", xl: "200px" }} my="4" mr={{ base: 0, xl: 13 }}>
          {
            daftarIframe2 &&
            <iframe
              title="Jadwal Sholat"
              style={{ height: "290px" }}
              loading="lazy"
              scrolling="no"
              src="https://www.islamicfinder.org/prayer-widget/1633070/shafi/11/0/20.0/18.0"
            />
          }
        </Flex>
        <Flex flexDir="column" mx={{ base: 0, xl: 25, "2xl": '48px' }}>
          <Text fontSize="24" py="2%" fontWeight="medium">
            <Icon as={FcApprove} w="40px" h="auto" />
            &thinsp;
            <Link fontWeight="semibold" onClick={(e) => {
              e.preventDefault()
              router.push("/kehadiran")
            }}>
              KEHADIRAN
            </Link>
          </Text>
          <Flex flexDir="row" flexWrap="wrap" justifyContent="center">
            <KehadiranCell
              key={daftarKehadiran[0].id}
              gambar={`${server}/storage/${daftarKehadiran[0].avatar}`}
              judul={daftarKehadiran[0].name}
              deskripsi={daftarKehadiran[0].jabatan}
              hadir={daftarKehadiran[0].hadir}
              dylink={`/kehadiran/${daftarKehadiran[0].id}`}
            />
            <KehadiranCell
              key={daftarKehadiran[1].id}
              gambar={`${server}/storage/${daftarKehadiran[1].avatar}`}
              judul={daftarKehadiran[1].name}
              deskripsi={daftarKehadiran[1].jabatan}
              hadir={daftarKehadiran[1].hadir}
              dylink={`/kehadiran/${daftarKehadiran[1].id}`}
            />
            <KehadiranCell
              key={daftarKehadiran[2].id}
              gambar={`${server}/storage/${daftarKehadiran[2].avatar}`}
              judul={daftarKehadiran[2].name}
              deskripsi={daftarKehadiran[2].jabatan}
              hadir={daftarKehadiran[2].hadir}
              dylink={`/kehadiran/${daftarKehadiran[2].id}`}
            />
            {
              isLargerThan1300 &&
              <KehadiranCell
                key={daftarKehadiran[3].id}
                gambar={`${server}/storage/${daftarKehadiran[3].avatar}`}
                judul={daftarKehadiran[3].name}
                deskripsi={daftarKehadiran[3].jabatan}
                hadir={daftarKehadiran[3].hadir}
                dylink={`/kehadiran/${daftarKehadiran[3].id}`}
              />
            }
            {
              isSmallerThan1280 &&
              <KehadiranCell
                key={daftarKehadiran[3].id}
                gambar={`${server}/storage/${daftarKehadiran[3].avatar}`}
                judul={daftarKehadiran[3].name}
                deskripsi={daftarKehadiran[3].jabatan}
                hadir={daftarKehadiran[3].hadir}
                dylink={`/kehadiran/${daftarKehadiran[3].id}`}
              />
            }
          </Flex>
        </Flex>
        <Flex flexDir="column" ml={{ base: 0, xl: 13 }}>
          <Text fontSize="24" py="4%" fontWeight="medium">
            <Icon as={FcGlobe} w="40px" h="auto" />
            &thinsp;
            LOKASI
          </Text>
          &emsp;
          {
            daftarIframe1 &&
            <iframe
              title="Lokasi Prodi SI"
              width="95%"
              height="220px"
              loading="lazy"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31874.457135338303!2d104.75533903955079!3d-3.011849799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9d2209209ceb%3A0x434396ad1d19af8a!2sFakultas%20Sains%20dan%20Teknologi%20Kampus%20B%20UIN%20Raden%20Fatah%20Palembang!5e0!3m2!1sid!2sid!4v1630623924194!5m2!1sid!2sid"
            />
          }
        </Flex>
      </Flex>
      <Divider />
      <ExNav />
      <VisuallyHidden>Created By github.com/aminriqky</VisuallyHidden>
      <VisuallyHidden>Made with Next.js & Chakra UI</VisuallyHidden>
    </React.Fragment>
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
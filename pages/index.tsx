import type {GetServerSideProps, NextPage} from "next";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Img,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
  useMediaQuery,
  VisuallyHidden,
} from "@chakra-ui/react";
import {SiFacebook} from "@react-icons/all-files/si/SiFacebook";
import {SiInstagram} from "@react-icons/all-files/si/SiInstagram";
import {SiYoutube} from "@react-icons/all-files/si/SiYoutube";
import {FcTemplate} from "@react-icons/all-files/fc/FcTemplate";
import {FcGraduationCap} from "@react-icons/all-files/fc/FcGraduationCap";
import {FcApprove} from "@react-icons/all-files/fc/FcApprove";
import {FcGlobe} from "@react-icons/all-files/fc/FcGlobe";
import {MdDeveloperBoard} from "@react-icons/all-files/md/MdDeveloperBoard";
import {MdEmail} from "@react-icons/all-files/md/MdEmail";
import {MdPhone} from "@react-icons/all-files/md/MdPhone";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import Menu from "../public/menu";
import ExNav from "../public/exnav";
import SlidePage from "../public/slide";
import Stats from "../public/stats";
import dayjs from "dayjs";
import "dayjs/locale/id";
import dynamic from "next/dynamic";
import {agenda} from "./api/agenda";
import {pengumuman} from "./api/pengumuman";
import {kehadiran} from "./api/kehadiran";
import {berita} from "./api/berita";
import {slideshow} from "./api/slideshow";
import {profil} from "./api/profil";
import {information} from "./api/information";
import {replace} from "../public/func";
import {server} from "../config";
import type {
  agenda as agendaList,
  berita as beritaList,
  info as infoList,
  kehadiran as kehadiranList,
  pengumuman as pengumumanList,
  profil as profilList,
  slide as slideList
} from "../public/types";

const Berita = dynamic(() => import("../public/berita"));
const AgendaCell = dynamic(() => import("../public/dynamic/AgendaCell"), {
  loading: () => (
    <Flex ml={{base: "12%", xl: 0}} flexDirection="row" flex="1">
      <Skeleton
        alignSelf="center"
        minW="60px"
        height="60px"
        m={{base: "3vw", xl: "1.41vw"}}
        textAlign="center"
        border="2px"
      />
      <Box alignSelf="center" m={{base: "3vw", xl: "1.41vw"}}>
        <Skeleton
          height="20px"
          width={{base: "185px", xl: "139px", "2xl": "150px"}}
          my="2"
        />
        <Skeleton
          height="20px"
          width={{base: "185px", xl: "139px", "2xl": "150px"}}
          my="2"
        />
      </Box>
    </Flex>
  ),
});
const KehadiranCell = dynamic(() => import("../public/dynamic/KehadiranCell"), {
  loading: () => (
    <React.Fragment>
      <Flex flexDir="row">
        <Skeleton
          borderRadius="full"
          boxSize="75px"
          mr={{base: "25px", xl: "50px"}}
        />
        <Skeleton
          height="50px"
          width={{base: "250px", xl: "450px"}}
          mt="15px"
        />
      </Flex>
      <Divider my="10px"/>
      <Flex flexDir="row">
        <Skeleton
          borderRadius="full"
          boxSize="75px"
          mr={{base: "25px", xl: "50px"}}
        />
        <Skeleton
          height="50px"
          width={{base: "250px", xl: "450px"}}
          mt="15px"
        />
      </Flex>
    </React.Fragment>
  ),
});
const PengumumanCell = dynamic(() => import("../public/dynamic/PengumumanCell"), {
  loading: () => (
    <React.Fragment>
      <Skeleton
        display="flex"
        my="5px"
        height="50px"
        width={{xl: "450px", "2xl": "600px"}}
      />
      <Divider/>
      <Skeleton
        display="flex"
        my="5px"
        height="50px"
        width={{xl: "450px", "2xl": "600px"}}
      />
      <Divider/>
      <Skeleton
        display="flex"
        my="5px"
        height="50px"
        width={{xl: "450px", "2xl": "600px"}}
      />
      <Divider/>
      <Skeleton
        display="flex"
        my="5px"
        height="50px"
        width={{xl: "450px", "2xl": "600px"}}
      />
      <Divider/>
      <Skeleton
        display="flex"
        my="5px"
        height="50px"
        width={{xl: "450px", "2xl": "600px"}}
      />
    </React.Fragment>
  ),
});

interface home {
  daftarAgenda: Array<agendaList>;
  daftarPengumuman: Array<pengumumanList>;
  daftarKehadiran: Array<kehadiranList>;
  daftarBerita: Array<beritaList>;
  daftarSlide: Array<slideList>;
  daftarProfil: Array<profilList>;
  daftarInfo: infoList;
}

const Home: NextPage<home> = ({
  daftarAgenda,
  daftarPengumuman,
  daftarKehadiran,
  daftarBerita,
  daftarSlide,
  daftarProfil,
  daftarInfo
}) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan1400] = useMediaQuery("(min-width: 1400px)");
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1279px)");
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [daftarIframe1, setDaftarIframe1] = useState(false);
  const [daftarIframe2, setDaftarIframe2] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setDaftarIframe1(true);
    setDaftarIframe2(true);
  }, []);

  function dots(num: number, str: string) {
    if (str !== null && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  const agenda = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/agenda");
  };

  return (
    <React.Fragment>
      <Menu
        pageHeight="49.4vw"
        slide={
          daftarSlide !== null &&
          daftarSlide.map((item, index) => {
            return (
              <SlidePage
                key={index}
                data={index}
                gambar={`${server}/storage/${item.gambar}`}
                text={item.deskripsi}
                vimi={item.judul}
                length={daftarSlide.length}
              />
            );
          })
        }
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent
          minW={{base: 315, xl: 720}}
          minH={{base: 310, xl: 540}}
        >
          {isLargerThan1280 ? (
            <iframe
              title="Profil SI"
              width="720"
              height="540"
              src="https://www.youtube.com/embed/pVEJ-TZeRPk?rel=0"
              allowFullScreen
            />
          ) : (
            <iframe
              title="Profil SI"
              width="410"
              height="310"
              src="https://www.youtube.com/embed/pVEJ-TZeRPk?rel=0"
              allowFullScreen
            />
          )}
        </ModalContent>
      </Modal>
      <Flex flexDir={{base: "column", xl: "row"}}>
        <Flex flexDir="column">
          <Button
            w="100%"
            onClick={agenda}
            size="md"
            borderRadius="0"
            _hover={{bg: "blackAlpha.800"}}
            bg="blackAlpha.900"
            color="white"
          >
            <Icon as={MdDeveloperBoard} boxSize={5} mr="10px"/>
            <Text>AGENDA</Text>
          </Button>
          <Flex
            flexDir={{base: "column", xl: "row"}}
            my={{base: "15px", xl: 0}}
          >
            <Flex flexDirection="column">
              {daftarAgenda[0] !== undefined && (
                <AgendaCell
                  key={daftarAgenda[0].id}
                  hari={dayjs(daftarAgenda[0].waktu).locale("id").format("ddd").toUpperCase()}
                  hariBulan={dayjs(daftarAgenda[0].waktu).format("DD/MM")}
                  judul={dots(28, daftarAgenda[0].judul)}
                  tempat={dots(18, daftarAgenda[0].tempat)}
                  dylink={`/agenda/${daftarAgenda[0].id}`}
                />
              )}
              {daftarAgenda[1] !== undefined && (
                <AgendaCell
                  key={daftarAgenda[1].id}
                  hari={dayjs(daftarAgenda[1].waktu).locale("id").format("ddd").toUpperCase()}
                  hariBulan={dayjs(daftarAgenda[1].waktu).format("DD/MM")}
                  judul={dots(28, daftarAgenda[1].judul)}
                  tempat={dots(18, daftarAgenda[1].tempat)}
                  dylink={`/agenda/${daftarAgenda[1].id}`}
                />
              )}
            </Flex>
            <Flex flexDirection="column">
              {daftarAgenda[2] !== undefined && (
                <AgendaCell
                  key={daftarAgenda[2].id}
                  hari={dayjs(daftarAgenda[2].waktu).locale("id").format("ddd").toUpperCase()}
                  hariBulan={dayjs(daftarAgenda[2].waktu).format("DD/MM")}
                  judul={dots(28, daftarAgenda[2].judul)}
                  tempat={dots(18, daftarAgenda[2].tempat)}
                  dylink={`/agenda/${daftarAgenda[2].id}`}
                />
              )}
              {daftarAgenda[3] !== undefined && (
                <AgendaCell
                  key={daftarAgenda[3].id}
                  hari={dayjs(daftarAgenda[3].waktu).locale("id").format("ddd").toUpperCase()}
                  hariBulan={dayjs(daftarAgenda[3].waktu).format("DD/MM")}
                  judul={dots(28, daftarAgenda[3].judul)}
                  tempat={dots(18, daftarAgenda[3].tempat)}
                  dylink={`/agenda/${daftarAgenda[3].id}`}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
        <AspectRatio minW="315">
          <Box
            onClick={onOpen}
            bgImage="url(play.png)"
            bgSize="100px"
            bgRepeat="no-repeat"
            width="10px"
            bgPosition="center"
          >
            <AspectRatio
              sx={{filter: "opacity(50%)"}}
              _hover={{filter: "opacity(25%)"}}
              width="100%"
              height="100%"
            >
              <Img src="/yt.png" objectFit="fill" alt="yt-uinrf"/>
            </AspectRatio>
          </Box>
        </AspectRatio>
        <Flex flex="1" flexDirection="column" color="white">
          <Box bgColor="teal.700" height="55%">
            <Box m="10">
              <Link
                href="http://jurnal.radenfatah.ac.id/index.php/jusifo"
                isExternal
              >
                <Flex flexDirection="row">
                  <ExternalLinkIcon mr="2" mt="0.5"/>
                  <Text fontWeight="bold">JUSIFO</Text>
                </Flex>
              </Link>
              <Text fontSize="xs">e-ISSN 2623-1662</Text>
              <Text fontSize="xs">p-ISSN 2460-092X</Text>
            </Box>
          </Box>
          <Box bgColor="teal.600" height="45%">
            <Box mx="10" my="8">
              <Link
                href="http://e-skripsi.radenfatah.ac.id/"
                isExternal
              >
                <Flex flexDirection="row">
                  <ExternalLinkIcon mr="2" mt="0.5"/>
                  <Text fontWeight="semibold">Sistem Informasi Bina Skripsi</Text>
                </Flex>
              </Link>
              <Link
                href="https://silayak.radenfatah.ac.id/"
                isExternal
              >
                <Flex flexDirection="row">
                  <ExternalLinkIcon mr="2" mt="0.5"/>
                  <Text fontWeight="semibold">Sistem Informasi Layanan Akademik Mahasiswa</Text>
                </Flex>
              </Link>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Divider/>
      <Box mx="8%" p="4%">
        <Box fontSize={{base: "xs", lg: "md"}}>
          <div dangerouslySetInnerHTML={{__html: daftarProfil[6].text}}/>
        </Box>
      </Box>
      <Berita
        gambar1={`${server}/storage/${daftarBerita[0].thumbnail}`}
        judul1={dots(65, daftarBerita[0].judul)}
        detail1={dots(670, daftarBerita[0].detail)}
        dylink1={`/berita/${replace(daftarBerita[0].judul)}`}
        gambar2={`${server}/storage/${daftarBerita[1].thumbnail}`}
        judul2={dots(65, daftarBerita[1].judul)}
        detail2={dots(670, daftarBerita[1].detail)}
        dylink2={`/berita/${replace(daftarBerita[1].judul)}`}
        gambar3={`${server}/storage/${daftarBerita[2].thumbnail}`}
        judul3={dots(65, daftarBerita[2].judul)}
        detail3={dots(670, daftarBerita[2].detail)}
        dylink3={`/berita/${replace(daftarBerita[2].judul)}`}
        gambar4={`${server}/storage/${daftarBerita[3].thumbnail}`}
        judul4={dots(65, daftarBerita[3].judul)}
        detail4={dots(670, daftarBerita[3].detail)}
        dylink4={`/berita/${replace(daftarBerita[3].judul)}`}
        gambar5={`${server}/storage/${daftarBerita[4].thumbnail}`}
        judul5={dots(65, daftarBerita[4].judul)}
        detail5={dots(670, daftarBerita[4].detail)}
        dylink5={`/berita/${replace(daftarBerita[4].judul)}`}
      />
      <Divider/>
      <Flex
        flexDir={{base: "column", xl: "row"}}
        py="25"
        justifyContent="center"
        px={{base: 25, xl: 125}}
        bg="gray.100"
      >
        <Flex
          my={{base: 25}}
          px="10"
          flexDir="column"
          bgColor="blue.600"
          width={{base: "100%", xl: "300px"}}
        >
          <Text color="white" fontWeight="bold" pt="8" mb="8">
            Kontak & Sosial Media
          </Text>
          <Text fontSize="sm" color="white" pb="2">
            <Icon as={SiFacebook} w="25px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href={daftarInfo.Info_1 ?? ""}
              isExternal
            >
              Facebook
            </Link>
          </Text>
          <Text fontSize="sm" color="white" pb="2">
            <Icon as={SiInstagram} w="25px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href={daftarInfo.Info_2 ?? ""}
              isExternal
            >
              Instagram
            </Link>
          </Text>
          <Text fontSize="sm" color="white" pb="2">
            <Icon as={MdPhone} w="25px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href={`tel:${daftarInfo.Info_3 ?? ""}`}
              isExternal
            >
              Telepon
            </Link>
          </Text>
          <Text fontSize="sm" color="white" pb="2">
            <Icon as={MdEmail} w="25px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href={`mailto:${daftarInfo.Info_4 ?? ""}`}
              isExternal
            >
              E-Mail
            </Link>
          </Text>
          <Text fontSize="sm" color="white" pb="12">
            <Icon as={SiYoutube} w="25px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href={daftarInfo.Info_5 ?? ""}
              isExternal
            >
              YouTube
            </Link>
          </Text>
        </Flex>
        <Flex flexDir="column" my="25" mx={{base: 25, xl: 75}}>
          <Text fontSize="24" py="2%" fontWeight="medium">
            <Icon as={FcTemplate} w="34px" h="auto"/>
            &thinsp;
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              onClick={(e) => {
                e.preventDefault();
                router.push("/pengumuman");
              }}
            >
              PENGUMUMAN
            </Link>
          </Text>
          <Flex flexDir="column" width={{xl: "450px", "2xl": "600px"}}>
            {daftarPengumuman[0] !== undefined && (
              <React.Fragment>
                <PengumumanCell
                  key={daftarPengumuman[0].id}
                  judul={daftarPengumuman[0].judul}
                  tanggal={dayjs(daftarPengumuman[0].updated_at).locale("id").format("dddd, DD MMMM YYYY")}
                  dylink={`/pengumuman/${replace(daftarPengumuman[0].judul)}`}
                />
                <Divider/>
              </React.Fragment>
            )}
            {daftarPengumuman[1] !== undefined && (
              <React.Fragment>
                <PengumumanCell
                  key={daftarPengumuman[1].id}
                  judul={daftarPengumuman[1].judul}
                  tanggal={dayjs(daftarPengumuman[1].updated_at).locale("id").format("dddd, DD MMMM YYYY")}
                  dylink={`/pengumuman/${replace(daftarPengumuman[1].judul)}`}
                />
                <Divider/>
              </React.Fragment>
            )}
            {daftarPengumuman[2] !== undefined && (
              <React.Fragment>
                <PengumumanCell
                  key={daftarPengumuman[2].id}
                  judul={daftarPengumuman[2].judul}
                  tanggal={dayjs(daftarPengumuman[2].updated_at).locale("id").format("dddd, DD MMMM YYYY")}
                  dylink={`/pengumuman/${replace(daftarPengumuman[2].judul)}`}
                />
                <Divider/>
              </React.Fragment>
            )}
            {daftarPengumuman[3] !== undefined && (
              <React.Fragment>
                <PengumumanCell
                  key={daftarPengumuman[3].id}
                  judul={daftarPengumuman[3].judul}
                  tanggal={dayjs(daftarPengumuman[3].updated_at).locale("id").format("dddd, DD MMMM YYYY")}
                  dylink={`/pengumuman/${replace(daftarPengumuman[3].judul)}`}
                />
                <Divider/>
              </React.Fragment>
            )}
            {daftarPengumuman[4] !== undefined && (
              <PengumumanCell
                key={daftarPengumuman[4].id}
                judul={daftarPengumuman[4].judul}
                tanggal={dayjs(daftarPengumuman[4].updated_at).locale("id").format("dddd, DD MMMM YYYY")}
                dylink={`/pengumuman/${replace(daftarPengumuman[4].judul)}`}
              />
            )}
          </Flex>
        </Flex>
        <Flex
          my={{base: 25}}
          px="10"
          flexDir="column"
          width={{base: "100%", xl: "300px"}}
          border="solid lightgray 1px"
        >
          <Text color="gray" fontWeight="bold" pt="8" mb="12">
            INFO PENDAFTARAN
          </Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href="https://snpmb.bppp.kemdikbud.go.id/"
              isExternal
            >
              SNPMB
            </Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href="https://span.ptkin.ac.id/"
              isExternal
            >
              SPAN-PTKIN
            </Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href="https://um-ptkin.ac.id/"
              isExternal
            >
              UM-PTKIN
            </Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="12">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px"/>
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              href="https://um-mandiri.radenfatah.ac.id/"
              isExternal
            >
              UM-MANDIRI
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Divider/>
      <Flex
        bg="gray.50"
        flexDirection={{base: "column", xl: "row"}}
        py="25"
        pl={{base: 25, xl: 125}}
      >
        <Flex
          flexDir="column"
          w={{base: "95%", xl: "260px"}}
          my="4"
          mr={{base: 0, xl: 13}}
        >
          {daftarIframe2 && (
            <iframe
              title="Jadwal Sholat"
              style={{height: "281px"}}
              loading="lazy"
              scrolling="no"
              src="https://timesprayer.com/widgets.php?frame=2&amp;lang=en&amp;name=palembang&amp;avachang=true&amp;time=0"
            />
          )}
        </Flex>
        <Flex flexDir="column" ml={{base: 0, xl: 25, "2xl": "50px"}}>
          <Text fontSize="20" fontWeight="medium">
            <Icon as={FcApprove} w="30px" h="auto"/>
            &thinsp;
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              onClick={(e) => {
                e.preventDefault();
                router.push("/kehadiran");
              }}
            >
              KEHADIRAN
            </Link>
          </Text>
          <Flex flexDir="row" flexWrap="wrap">
            {daftarKehadiran !== undefined &&
              daftarKehadiran.filter((item) => item.jabatan === "Ketua Program Studi").map((item) => {
                return (
                  <KehadiranCell
                    key={item.id}
                    id={item.id}
                    gambar={`${server}/storage/${item.avatar}`}
                    judul={item.name}
                    deskripsi={item.jabatan}
                    hadir={item.hadir}
                    dylink={`/kehadiran/${replace(item.name)}`}
                  />
                );
              })}
            {daftarKehadiran !== undefined &&
              daftarKehadiran.filter((item) => item.jabatan === "Sekretaris Program Studi").map((item) => {
                return (
                  <KehadiranCell
                    key={item.id}
                    id={item.id}
                    gambar={`${server}/storage/${item.avatar}`}
                    judul={item.name}
                    deskripsi={item.jabatan}
                    hadir={item.hadir}
                    dylink={`/kehadiran/${replace(item.name)}`}
                  />
                );
              })}
            {daftarKehadiran !== undefined &&
              daftarKehadiran.filter((item) => item.jabatan === "Kepala Laboratorium").map((item) => {
                return (
                  <KehadiranCell
                    key={item.id}
                    id={item.id}
                    gambar={`${server}/storage/${item.avatar}`}
                    judul={item.name}
                    deskripsi={item.jabatan}
                    hadir={item.hadir}
                    dylink={`/kehadiran/${replace(item.name)}`}
                  />
                );
              })}
            {
              daftarKehadiran !== undefined &&
              isLargerThan1400 &&
              daftarKehadiran.sort(() => Math.random() - 0.5).map((item) => {
                return (
                  <KehadiranCell
                    key={item[0].id}
                    id={item[0].id}
                    gambar={`${server}/storage/${item[0].avatar}`}
                    judul={item[0].name}
                    deskripsi={item[0].jabatan}
                    hadir={item[0].hadir}
                    dylink={`/kehadiran/${replace(item[0].name)}`}
                  />
                )
              })
            }
            {
              daftarKehadiran !== undefined &&
              isSmallerThan1280 &&
              daftarKehadiran.sort(() => Math.random() - 0.5).map((item) => {
                  return (
                    <KehadiranCell
                      key={item[0].id}
                      id={item[0].id}
                      gambar={`${server}/storage/${item[0].avatar}`}
                      judul={item[0].name}
                      deskripsi={item[0].jabatan}
                      hadir={item[0].hadir}
                      dylink={`/kehadiran/${replace(item[0].name)}`}
                    />
                  )
                }
              )}
          </Flex>
        </Flex>
        <Flex my="4" ml={{base: 0, xl: 75}}>
          <Stats/>
        </Flex>
      </Flex>
      <Flex flexDir="column">
        <Flex flexDir="row" mt={{base: "6vw", xl: "1.5vw",}} ml={{base: "3vw", xl: "1.5vw",}}>
          <Icon as={FcGlobe} w="34px" h="auto"/>
          &thinsp;
          <Text fontSize="24" fontWeight="semibold">
            LOKASI
          </Text>
        </Flex>
        &emsp;
        {daftarIframe1 && (
          <iframe
            title="Lokasi Prodi SI"
            width="100%"
            height="440px"
            loading="lazy"
            frameBorder="0"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31874.457135338303!2d104.75533903955079!3d-3.011849799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9d2209209ceb%3A0x434396ad1d19af8a!2sFakultas%20Sains%20dan%20Teknologi%20Kampus%20B%20UIN%20Raden%20Fatah%20Palembang!5e0!3m2!1sid!2sid!4v1630623924194!5m2!1sid!2sid"
          />
        )}
      </Flex>
      <Divider/>
      <ExNav/>
      <VisuallyHidden>Created By github.com/aminriqky</VisuallyHidden>
      <VisuallyHidden>Made with Next.js & Chakra UI</VisuallyHidden>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const daftarAgenda = await agenda();
  const daftarPengumuman = await pengumuman();
  const daftarKehadiran = await kehadiran();
  const daftarBerita = await berita();
  const daftarSlide = await slideshow();
  const daftarProfil = await profil();
  const daftarInfo = await information();

  return {
    props: {
      daftarAgenda,
      daftarPengumuman,
      daftarKehadiran,
      daftarBerita,
      daftarSlide,
      daftarProfil,
      daftarInfo
    }
  };
};

export default Home;

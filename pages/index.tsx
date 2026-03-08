// @ts-nocheck
import type { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Img,
  Link,
  Skeleton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { SiFacebook } from "@react-icons/all-files/si/SiFacebook";
import { SiInstagram } from "@react-icons/all-files/si/SiInstagram";
import { SiYoutube } from "@react-icons/all-files/si/SiYoutube";
import { FcTemplate } from "@react-icons/all-files/fc/FcTemplate";
import { FcGraduationCap } from "@react-icons/all-files/fc/FcGraduationCap";
import { FcGlobe } from "@react-icons/all-files/fc/FcGlobe";
import { MdDeveloperBoard } from "@react-icons/all-files/md/MdDeveloperBoard";
import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { MdPhone } from "@react-icons/all-files/md/MdPhone";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Menu from "../public/menu";
import ExNav from "../public/exnav";
import SlidePage from "../public/slide";
import Loading from "../public/loading";
import Stats from "../public/stats";
import dayjs from "dayjs";
import "dayjs/locale/id";
import dynamic from "next/dynamic";
// import { agenda } from "./api/agenda"; // BAGIAN AGENDA DIKOMENTARI
import { pengumuman } from "./api/pengumuman";
import { kehadiran } from "./api/kehadiran";
import { berita } from "./api/berita";
import { slideshow } from "./api/slideshow";
import { profil } from "./api/profil";
import { information } from "./api/information";
import { replace } from "../public/func";
import { server } from "../config";
import type {
  agenda as agendaList,
  berita as beritaList,
  info as infoList,
  kehadiran as kehadiranList,
  pengumuman as pengumumanList,
  profil as profilList,
  slide as slideList,
} from "../public/types";

const Berita = dynamic(() => import("../public/berita"));

/* BAGIAN AGENDA DIKOMENTARI */
/*
const AgendaCell = dynamic(() => import("../public/dynamic/AgendaCell"), {
  loading: () => (
    <React.Fragment>
      <Flex ml={{ base: "12%", xl: 0 }} flexDirection="row" flex="1">
        <Skeleton
          alignSelf="center"
          minW="60px"
          height="60px"
          m={{ base: "3vw", xl: "1.41vw" }}
          textAlign="center"
          border="2px"
        />
        <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
          <Skeleton
            height="20px"
            width={{ base: "185px", xl: "139px", "2xl": "150px" }}
            my="2"
          />
          <Skeleton
            height="20px"
            width={{ base: "185px", xl: "139px", "2xl": "150px" }}
            my="2"
          />
        </Box>
      </Flex>
    </React.Fragment>
  ),
});
*/

const PengumumanCell = dynamic(
  () => import("../public/dynamic/PengumumanCell"),
  {
    loading: () => (
      <React.Fragment>
        <Skeleton
          display="flex"
          my="5px"
          height="50px"
          width={{ base: "100%", xl: "450px", "2xl": "600px" }}
        />
        <Divider />
        <Skeleton
          display="flex"
          my="5px"
          height="50px"
          width={{ base: "100%", xl: "450px", "2xl": "600px" }}
        />
        <Divider />
        <Skeleton
          display="flex"
          my="5px"
          height="50px"
          width={{ base: "100%", xl: "450px", "2xl": "600px" }}
        />
      </React.Fragment>
    ),
  },
);

const DosenCard = ({ name, jabatan, avatar }: { name: string; jabatan: string; avatar: string }) => (
  <Flex
    align="center"
    bg="white"
    rounded="lg"
    shadow="sm"
    p={{ base: 3, md: 4 }}
    _hover={{ shadow: "md", transform: "translateY(-2px)" }}
    transition="all 0.2s"
    w="100%"
  >
    <Box
      w={{ base: "50px", md: "60px" }}
      h={{ base: "50px", md: "60px" }}
      borderRadius="full"
      flexShrink={0}
      bgSize="cover"
      bgPosition="center"
      bgImage={`url(${avatar})`}
      border="2px solid"
      borderColor="blue.100"
    />
    <Box ml={3} minW={0}>
      <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }} noOfLines={1} color="gray.800">
        {name}
      </Text>
      <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" noOfLines={1}>
        {jabatan}
      </Text>
    </Box>
  </Flex>
);

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
  daftarInfo,
}) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [daftarIframe1, setDaftarIframe1] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setDaftarIframe1(true);
  }, []);

  function dots(num: number, str: string) {
    if (str !== null && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  /* BAGIAN AGENDA DIKOMENTARI */
  /*
  const agendaClick = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/agenda");
  };
  */

  if (
    !daftarProfil?.length ||
    !daftarBerita?.length ||
    !daftarKehadiran?.length ||
    !daftarSlide?.length ||
    !daftarInfo
  ) {
    return (
      <React.Fragment>
        <Menu pageHeight="49.4vw" slide={null} />
        <Loading fullScreen text="Memuat halaman..." />
        <ExNav />
      </React.Fragment>
    );
  }

  const daftarDosen = daftarKehadiran.slice(0, 6);

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

      <Flex flexDir={{ base: "column", xl: "row" }}>
        
        {/* BAGIAN AGENDA DIKOMENTARI 
        <Flex flexDir="column" flex={{ base: "auto", xl: 1 }}>
          <Button
            w="100%"
            onClick={agendaClick}
            size="md"
            borderRadius="0"
            _hover={{ bg: "blackAlpha.800" }}
            bg="blackAlpha.900"
            color="white"
          >
            <Icon as={MdDeveloperBoard} boxSize={5} mr="10px" />
            <Text>AGENDA</Text>
          </Button>
          <Flex
            flexDir={{ base: "column", sm: "row", xl: "row" }}
            my={{ base: "15px", xl: 0 }}
            flexWrap="wrap"
          >
            <Flex flexDirection="column" flex="1" minW={{ base: "100%", sm: "50%" }}>
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
            <Flex flexDirection="column" flex="1" minW={{ base: "100%", sm: "50%" }}>
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
        */}

        <AspectRatio ratio={16 / 9} minW={{ base: "100%", xl: "400px" }} flex={{ base: "auto", xl: 2 }}>
          <iframe
            title="Profil SI"
            src="https://www.youtube.com/embed/BcQ6ZpkJsOQ?autoplay=1&mute=1&loop=1&playlist=BcQ6ZpkJsOQ&controls=1&modestbranding=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 0 }}
          />
        </AspectRatio>

        <Flex flex={{ base: "auto", xl: 1 }} flexDirection="column" color="white">
          <Box bgColor="teal.700" flex="1" p={{ base: 6, md: 10 }}>
            <Link href="http://jurnal.radenfatah.ac.id/index.php/jusifo" isExternal>
              <Flex flexDirection="row" align="center">
                <ExternalLinkIcon mr="2" />
                <Text fontWeight="bold">JUSIFO</Text>
              </Flex>
            </Link>
            <Text fontSize="xs" mt={1}>e-ISSN 2623-1662</Text>
            <Text fontSize="xs">p-ISSN 2460-092X</Text>
          </Box>
          <Box bgColor="teal.600" flex="1" p={{ base: 6, md: 10 }}>
            <Link href="http://e-skripsi.radenfatah.ac.id/" isExternal>
              <Flex flexDirection="row" align="center" mb={2}>
                <ExternalLinkIcon mr="2" />
                <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>Sistem Informasi Bina Skripsi</Text>
              </Flex>
            </Link>
            <Link href="https://silayak.radenfatah.ac.id/" isExternal>
              <Flex flexDirection="row" align="center">
                <ExternalLinkIcon mr="2" />
                <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>Sistem Informasi Layanan Akademik</Text>
              </Flex>
            </Link>
          </Box>
        </Flex>
      </Flex>

      <Divider />

      <Box mx={{ base: "5%", md: "8%" }} py={{ base: "6%", md: "4%" }}>
        <Box fontSize={{ base: "xs", lg: "md" }}>
          <div dangerouslySetInnerHTML={{ __html: daftarProfil[6].text }} />
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

      <Divider />

      <Flex
        flexDir={{ base: "column", xl: "row" }}
        py={{ base: 6, md: "25px" }}
        justifyContent="center"
        px={{ base: "5%", md: "5%", xl: "8%" }}
        bg="gray.100"
        gap={{ base: 4, xl: 0 }}
      >
        <Flex
          my={{ base: 2, xl: "25px" }}
          px={{ base: 6, md: 10 }}
          py={{ base: 6, md: 0 }}
          flexDir="column"
          bgColor="blue.600"
          width={{ base: "100%", xl: "280px" }}
          flexShrink={0}
          rounded={{ base: "lg", xl: "none" }}
        >
          <Text color="white" fontWeight="bold" pt="8" mb="8" fontSize={{ base: "md", md: "lg" }}>Kontak & Sosial Media</Text>
          <Text fontSize="sm" color="white" pb="2">
            <Icon as={SiFacebook} w="25px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href={daftarInfo.Info_1 ?? ""} isExternal>Facebook</Link>
          </Text>
          <Text fontSize="sm" color="white" pb="2">
            <Icon as={SiInstagram} w="25px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href={daftarInfo.Info_2 ?? ""} isExternal>Instagram</Link>
          </Text>
          <Text fontSize="sm" color="white" pb="2">
            <Icon as={MdPhone} w="25px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href={`tel:${daftarInfo.Info_3 ?? ""}`} isExternal>Telepon</Link>
          </Text>
          <Text fontSize="sm" color="white" pb="2">
            <Icon as={MdEmail} w="25px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href={`mailto:${daftarInfo.Info_4 ?? ""}`} isExternal>E-Mail</Link>
          </Text>
          <Text fontSize="sm" color="white" pb="12">
            <Icon as={SiYoutube} w="25px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href={daftarInfo.Info_5 ?? ""} isExternal>YouTube</Link>
          </Text>
        </Flex>

        <Flex flexDir="column" my={{ base: 2, xl: "25px" }} mx={{ base: 0, xl: "5%" }} flex={1} minW={0}>
          <Text fontSize={{ base: "20", md: "24" }} py="2%" fontWeight="medium">
            <Icon as={FcTemplate} w="34px" h="auto" />
             
            <Link
              verticalAlign="top"
              fontWeight="semibold"
              onClick={(e) => { e.preventDefault(); router.push("/pengumuman"); }}
              href={"/pengumuman"}
            >
              PENGUMUMAN
            </Link>
          </Text>
          <Flex flexDir="column" width="100%" maxW={{ xl: "450px", "2xl": "600px" }}>
            {daftarPengumuman.slice(0, 5).map((p, i) => (
              <React.Fragment key={p.id}>
                <PengumumanCell
                  judul={p.judul}
                  tanggal={dayjs(p.updated_at).locale("id").format("dddd, DD MMMM YYYY")}
                  dylink={`/pengumuman/${replace(p.judul)}`}
                />
                {i < 4 && <Divider />}
              </React.Fragment>
            ))}
          </Flex>
        </Flex>

        <Flex
          my={{ base: 2, xl: "25px" }}
          px={{ base: 6, md: 10 }}
          py={{ base: 6, md: 0 }}
          flexDir="column"
          width={{ base: "100%", xl: "280px" }}
          border="solid lightgray 1px"
          flexShrink={0}
          rounded={{ base: "lg", xl: "none" }}
          bg="white"
        >
          <Text color="gray" fontWeight="bold" pt="8" mb="12" fontSize={{ base: "md", md: "lg" }}>INFO PENDAFTARAN</Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href="https://snpmb.bppp.kemdikbud.go.id/" isExternal>SNPMB</Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href="https://span.ptkin.ac.id/" isExternal>SPAN-PTKIN</Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="2">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href="https://um-ptkin.ac.id/" isExternal>UM-PTKIN</Link>
          </Text>
          <Text fontSize="sm" color="gray" pb="12">
            <Icon as={FcGraduationCap} w="30px" h="auto" mr="20px" />
            <Link verticalAlign="top" fontWeight="semibold" href="https://um-mandiri.radenfatah.ac.id/" isExternal>UM-MANDIRI</Link>
          </Text>
        </Flex>
      </Flex>

      <Divider />

      <Flex
        bg="gray.50"
        flexDirection={{ base: "column", xl: "row" }}
        justifyContent="center"
        py={{ base: 6, md: "25px" }}
        px={{ base: "5%", md: "5%", xl: "8%" }}
        gap={{ base: 6, xl: 8 }}
      >
        <Flex flexDir="column" flex={1}>
          <Text fontSize={{ base: "18", md: "20" }} fontWeight="semibold" mb={4}>👩‍🏫 DAFTAR DOSEN</Text>
          <Flex flexDir="column" gap={3}>
            {daftarDosen.map((item) => (
              <DosenCard
                key={item.id}
                name={item.name}
                jabatan={item.jabatan}
                avatar={`${server}/storage/${item.avatar}`}
              />
            ))}
          </Flex>
          <Button mt={4} size="sm" variant="outline" colorScheme="blue" onClick={() => router.push("/profil")} alignSelf="flex-start">
            Lihat Semua Dosen →
          </Button>
        </Flex>
        <Flex my={{ base: 0, xl: 4 }} flexShrink={0}><Stats /></Flex>
      </Flex>

      <Flex flexDir="column">
        <Flex flexDir="row" mt={{ base: "24px", xl: "1.5vw" }} ml={{ base: "5%", xl: "1.5vw" }} align="center">
          <Icon as={FcGlobe} w="34px" h="auto" />
          <Text fontSize={{ base: "20", md: "24" }} fontWeight="semibold">LOKASI</Text>
        </Flex>
        {daftarIframe1 && (
          <iframe
            title="Lokasi Prodi SI" width="100%" height="440px" loading="lazy"
            frameBorder="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31874.457135338303!2d104.75533903955079!3d-3.011849799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9d2209209ceb%3A0x434396ad1d19af8a!2sFakultas%20Sains%20dan%20Teknologi%20Kampus%20B%20UIN%20Raden%20Fatah%20Palembang!5e0!3m2!1sid!2sid!4v1630623924194!5m2!1sid!2sid"
          />
        )}
      </Flex>
      <Divider />
      <ExNav />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // const daftarAgenda = await agenda(); // BAGIAN AGENDA DIKOMENTARI
  const daftarPengumuman = await pengumuman();
  const daftarKehadiran = await kehadiran();
  const daftarBerita = await berita();
  const daftarSlide = await slideshow();
  const daftarProfil = await profil();
  const daftarInfo = await information();

  return {
    props: {
      daftarAgenda: [], // Kirim array kosong agar tidak error
      daftarPengumuman: daftarPengumuman ?? [],
      daftarKehadiran: daftarKehadiran ?? [],
      daftarBerita: daftarBerita ?? [],
      daftarSlide: daftarSlide ?? [],
      daftarProfil: daftarProfil ?? [],
      daftarInfo: daftarInfo ?? null,
    },
  };
};

export default Home;
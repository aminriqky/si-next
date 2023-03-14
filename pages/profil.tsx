import type { NextPage, GetStaticProps } from "next";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Divider,
  Button,
  useMediaQuery,
  AspectRatio,
  Img,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from "@chakra-ui/react";
import ExNav from "../public/exnav";
import Menu from "../public/menu";
import { profil } from "./api/profil";
import type { profil as profilList } from "../public/types";
import { FcSelfServiceKiosk } from "@react-icons/all-files/fc/FcSelfServiceKiosk";
import { FcPortraitMode } from "@react-icons/all-files/fc/FcPortraitMode";
import { FcKindle } from "@react-icons/all-files/fc/FcKindle";
import { FcSalesPerformance } from "@react-icons/all-files/fc/FcSalesPerformance";
import { FcSurvey } from "@react-icons/all-files/fc/FcSurvey";
import { FcButtingIn } from "@react-icons/all-files/fc/FcButtingIn";
import { FcQuestions } from "@react-icons/all-files/fc/FcQuestions";

interface profil {
  daftarProfil: Array<profilList>;
}

const Profil: NextPage<profil> = ({ daftarProfil }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <Menu>
      <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
        <Heading>Profil</Heading>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='/profil'>Profil</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex bg="blue.600">
        <AspectRatio
          pointerEvents="none"
          opacity="0.2"
          h={{ base: "100px", xl: "200px" }}
          w="100%"
        >
          <Img
            src="/gambar.jpg"
            w="100%"
            alt="Gambar Slide"
          />
        </AspectRatio>
      </Flex>
      <Flex flexDir="row" my={{ base: "10%", xl: "80px" }} mx="6%">
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          orientation={isLargerThan1280 ? ("vertical") : ("horizontal")}
        >
          <Flex flexDir="column">
            <Text fontSize='sm'>Profil Program Studi</Text>
            <TabList my="1vw" w="100%">
              <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Profil Prodi</Tab>
              <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Sejarah</Tab>
              <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Visi & Misi</Tab>
              <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Sarana & Prasarana</Tab>
            </TabList>
            <Divider borderColor="gray.400" />
            <Text mt="8%" fontSize='sm'>Aksi Cepat</Text>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSelfServiceKiosk />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Sekilas Prodi Sistem Informasi
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcPortraitMode />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Calon Mahasiswa
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcKindle />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Beasiswa
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSalesPerformance />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Prestasi
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSurvey />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Profil Lulusan
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcButtingIn />} justifyContent="flex-start" rounded="md" mt="0.75vw">Alumni</Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcQuestions />} justifyContent="flex-start" rounded="md" mt="0.75vw">FAQ</Button>
            </NextLink>
          </Flex>
          <TabPanels>
            <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
              <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                <Box fontSize={{ base: "xs", lg: "md" }}>
                  <div dangerouslySetInnerHTML={{ __html: daftarProfil[0].text }} />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                <div dangerouslySetInnerHTML={{ __html: daftarProfil[8].text }} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                <div dangerouslySetInnerHTML={{ __html: daftarProfil[9].text }} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                <div dangerouslySetInnerHTML={{ __html: daftarProfil[5].text }} />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarProfil = await profil();

  return {
    props: { daftarProfil },
    revalidate: 15,
  };
};

export default Profil;

import type {GetStaticProps, NextPage} from "next";
import NextLink from "next/link";
import {
  AspectRatio,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Heading,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import {organisasi} from "../api/organisasi";
import {profil} from "../api/profil";
import {server} from "../../config";
import type {organisasi as orgList, profil as profilList} from "../../public/types";
import {FcSelfServiceKiosk} from "@react-icons/all-files/fc/FcSelfServiceKiosk";
import {FcPortraitMode} from "@react-icons/all-files/fc/FcPortraitMode";
import {FcKindle} from "@react-icons/all-files/fc/FcKindle";
import {FcSalesPerformance} from "@react-icons/all-files/fc/FcSalesPerformance";
import {FcSurvey} from "@react-icons/all-files/fc/FcSurvey";
import {FcButtingIn} from "@react-icons/all-files/fc/FcButtingIn";
import {FcQuestions} from "@react-icons/all-files/fc/FcQuestions";

type MahasiswaCellProps = {
  logo: string;
  color: string;
  detail: string;
};

const MahasiswaCell: React.FC<MahasiswaCellProps> = (props) => {
  return (
    <Flex flexDir={{base: "column", xl: "row"}} mb="2%">
      <Img
        src={`${server}/storage/${props.logo}`}
        borderRadius="5"
        maxW="320px"
        objectFit="contain"
      />
      <Flex ml={{base: 0, xl: 32}} flexDir="column" flexWrap="wrap">
        <Text mb="10px" color={props.color} fontWeight="semibold">
          {props.children}
        </Text>
        <Box
          color="black"
          fontWeight="light"
          fontSize={{base: "xs", lg: "md"}}
        >
          <div dangerouslySetInnerHTML={{__html: props.detail}}/>
        </Box>
      </Flex>
    </Flex>
  );
};

interface daftarKemahasiswaan {
  daftarOrganisasi: Array<orgList>;
  daftarProfil: Array<profilList>;
}

const DaftarKemahasiswaan: NextPage<daftarKemahasiswaan> = ({
  daftarOrganisasi,
  daftarProfil
}) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <Menu>
      <Breadcrumb my={{base: "5%", xl: "80px"}} mx="6%" textColor="white" pos="absolute">
        <Heading>Kemahasiswaan</Heading>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='/kemahasiswaan'>Kemahasiswaan</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex bg="blue.600">
        <AspectRatio
          pointerEvents="none"
          opacity="0.2"
          h={{base: "100px", xl: "200px"}}
          w="100%"
        >
          <Img
            src="/gambar.jpg"
            w="100%"
            alt="Gambar Slide"
          />
        </AspectRatio>
      </Flex>
      <Flex flexDir="row" my={{base: "10%", xl: "80px"}} mx="6%">
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          orientation={isLargerThan1280 ? ("vertical") : ("horizontal")}
        >
          <Flex flexDir="column">
            <Text fontSize='sm'>Kemahasiswaan</Text>
            <TabList my="1vw" w="100%">
              <Flex flexWrap="wrap">
                <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                  Himpunan Mahasiswa
                </Tab>
                <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                  Organisasi Mahasiswa
                </Tab>
                <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                  Kehidupan Mahasiswa
                </Tab>
                <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                  Survei Mahasiswa
                </Tab>
              </Flex>
            </TabList>
            <Divider borderColor="gray.400"/>
            <Text mt="8%" fontSize='sm'>Aksi Cepat</Text>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSelfServiceKiosk/>} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Sekilas Prodi Sistem Informasi
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcPortraitMode/>} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Calon Mahasiswa
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcKindle/>} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Beasiswa
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSalesPerformance/>} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Prestasi
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSurvey/>} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Profil Lulusan
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcButtingIn/>} justifyContent="flex-start" rounded="md"
                      mt="0.75vw">Alumni</Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcQuestions/>} justifyContent="flex-start" rounded="md"
                      mt="0.75vw">FAQ</Button>
            </NextLink>
          </Flex>
          <TabPanels>
            <TabPanel p={0} mt={{base: "5%", xl: 0}}>
              <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
                <Box fontSize={{base: "xs", lg: "md"}}>
                  <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="6">
                    Himpunan Mahasiswa
                  </Text>
                  <MahasiswaCell
                    color="black"
                    detail={daftarOrganisasi[1].detail}
                    logo={daftarOrganisasi[1].logo}
                  >
                    {daftarOrganisasi[1].judul}
                  </MahasiswaCell>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel p={0} mt={{base: "5%", xl: 0}}>
              <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
                <Box fontSize={{base: "xs", lg: "md"}}>
                  <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="6">
                    Organisasi Mahasiswa
                  </Text>
                  <MahasiswaCell
                    color="black"
                    detail={daftarOrganisasi[0].detail}
                    logo={daftarOrganisasi[0].logo}
                  >
                    {daftarOrganisasi[0].judul}
                  </MahasiswaCell>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel p={0} mt={{base: "5%", xl: 0}}>
              <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
                <Box fontSize={{base: "xs", lg: "md"}}>
                  <div dangerouslySetInnerHTML={{__html: daftarProfil[21].text}}/>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel p={0} mt={{base: "5%", xl: 0}}>
              <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
                <Box fontSize={{base: "xs", lg: "md"}}>
                  <div dangerouslySetInnerHTML={{__html: daftarProfil[22].text}}/>
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <ExNav/>
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarOrganisasi = await organisasi();
  const daftarProfil = await profil();

  return {
    props: {daftarOrganisasi, daftarProfil},
    revalidate: 15,
  };
};

export default DaftarKemahasiswaan;

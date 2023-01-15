import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  Text,
  Box,
  Flex,
  Link,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { download } from "../api/download";
import { FaBookmark } from "@react-icons/all-files/fa/FaBookmark";
import { FaFileAlt } from "@react-icons/all-files/fa/FaFileAlt";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import type { download as dokumen } from "../../public/types";
import { replace } from "../../public/func";
import { FcSelfServiceKiosk } from "@react-icons/all-files/fc/FcSelfServiceKiosk";
import { FcPortraitMode } from "@react-icons/all-files/fc/FcPortraitMode";
import { FcKindle } from "@react-icons/all-files/fc/FcKindle";
import { FcSalesPerformance } from "@react-icons/all-files/fc/FcSalesPerformance";
import { FcSurvey } from "@react-icons/all-files/fc/FcSurvey";
import { FcButtingIn } from "@react-icons/all-files/fc/FcButtingIn";
import { FcQuestions } from "@react-icons/all-files/fc/FcQuestions";

interface daftarDokumen {
  daftarDokumen: Array<dokumen>;
}

const DaftarDokumen: NextPage<daftarDokumen> = ({ daftarDokumen }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const router = useRouter();

  return (
    <Menu>
      <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
        <Heading>Dokumen</Heading>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='/dokumen'>Dokumen</BreadcrumbLink>
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
            <Text fontSize='sm'>Dokumen</Text>
            <TabList my="1vw" w="100%">
              <Flex flexWrap="wrap">
                <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Dokumen</Tab>
              </Flex>
            </TabList>
            <Divider borderColor="gray.400" />
            <Text mt="8%" fontSize='sm'>Aksi Cepat</Text>
            <Button w="full" leftIcon={<FcSelfServiceKiosk />} justifyContent="flex-start" rounded="md" mt="0.75vw">
              Sekilas Prodi Sistem Informasi
            </Button>
            <Button w="full" leftIcon={<FcPortraitMode />} justifyContent="flex-start" rounded="md" mt="0.75vw">Calon Mahasiswa</Button>
            <Button w="full" leftIcon={<FcKindle />} justifyContent="flex-start" rounded="md" mt="0.75vw">Beasiswa</Button>
            <Button w="full" leftIcon={<FcSalesPerformance />} justifyContent="flex-start" rounded="md" mt="0.75vw">Prestasi</Button>
            <Button w="full" leftIcon={<FcSurvey />} justifyContent="flex-start" rounded="md" mt="0.75vw">Profil Lulusan</Button>
            <Button w="full" leftIcon={<FcButtingIn />} justifyContent="flex-start" rounded="md" mt="0.75vw">Alumni</Button>
            <Button w="full" leftIcon={<FcQuestions />} justifyContent="flex-start" rounded="md" mt="0.75vw">FAQ</Button>
          </Flex>
          <TabPanels>
            <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
              <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                <Text textColor="black" fontSize="2xl" fontWeight="semibold">
                  Dokumen
                </Text>
                <Flex
                  bg="teal.500"
                  color="teal.500"
                  border="1px"
                  borderTopRadius="5px"
                  mt="2%"
                >
                  <Icon
                    ml="2%"
                    color="white"
                    as={FaBookmark}
                    w="20px"
                    h="auto"
                    mr="20px"
                  />
                  <Text textColor="white" my="10px" fontSize="xl" fontWeight="thin">
                    Nama Berkas
                  </Text>
                </Flex>
                {daftarDokumen !== null &&
                  daftarDokumen.map((item) => {
                    return (
                      <Link
                        key={item.id}
                        _hover={{ textDecor: "none" }}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/dokumen/${replace(item.nama_berkas)}`);
                        }}
                      >
                        <Flex
                          _hover={{ bg: "teal.50" }}
                          py="5px"
                          color="teal.500"
                          borderX="1px"
                          borderBottom="1px"
                        >
                          <Icon
                            ml="2%"
                            color="teal"
                            as={FaFileAlt}
                            w="17px"
                            h="auto"
                            mr="17px"
                          />
                          <Text
                            key={item.id}
                            textColor="black"
                            my="2.5px"
                            fontWeight="thin"
                          >
                            {item.nama_berkas}
                          </Text>
                          <Icon
                            ml="auto"
                            color="teal"
                            as={FaExternalLinkAlt}
                            w="17px"
                            mr="2%"
                            h="auto"
                          />
                        </Flex>
                      </Link>
                    );
                  })}
                <Flex h="5px" bg="teal.500" borderBottomRadius="5px" />
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
  const daftarDokumen = await download();

  return {
    props: { daftarDokumen },
    revalidate: 15,
  };
};

export default DaftarDokumen;

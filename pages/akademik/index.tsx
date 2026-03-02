import type { NextPage, GetStaticProps } from "next";
import React from "react";
import {
  Box,
  Flex,
  Icon,
  Link,
  Tab,
  TabPanel,
  Text,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb,
  Heading
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { profil } from "../api/profil";
import dynamic from "next/dynamic";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { FaFileDownload } from "@react-icons/all-files/fa/FaFileDownload";
const PageTab = dynamic(
  () => import('../../public/pagetab'),
  { ssr: false }
)
import type { profil as profilList } from "../../public/types";
import type { haki as hakiList } from "../../public/types";

interface profil {
  daftarProfil: Array<profilList>;
  daftarHaki: Array<hakiList>;
}


const Akademik: NextPage<profil> = ({ daftarProfil }) => {
  return (
    <Menu>
      <PageTab judul="Akademik"
        breadcrumb={
          <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
            <Heading>Akademik</Heading>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/akademik'>Akademik</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        tab={
          <React.Fragment>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Kurikulum</Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Kalender Akademik
            </Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Download Sebaran Mata Kuliah
            </Tab>
          </React.Fragment>
        }>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <Box fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: daftarProfil[1].text }} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <Box fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: daftarProfil[3].text }} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="4">
              Sebaran Mata Kuliah
            </Text>
            <Text fontSize={{ base: "sm", lg: "md" }} color="gray.600" mb="4">
              Download file sebaran mata kuliah Program Studi Sistem Informasi melalui link berikut:
            </Text>
            <Link
              href="https://drive.google.com/drive/folders/1UkcnDPDyf4P1ar-XFZhO5nBm9WnUTlo-?usp=sharing"
              isExternal
              _hover={{ textDecor: "none" }}
            >
              <Flex
                p="4%"
                bg="blue.50"
                border="1px"
                borderColor="blue.200"
                borderRadius="md"
                alignItems="center"
                _hover={{ bg: "blue.100" }}
              >
                <Icon
                  color="blue.500"
                  as={FaFileDownload}
                  w="24px"
                  h="auto"
                  mr="15px"
                />
                <Box>
                  <Text fontWeight="semibold" color="blue.700">
                    Sebaran Mata Kuliah - Google Drive
                  </Text>
                  <Text color="blue.500" fontSize="sm">
                    Klik untuk membuka folder Google Drive
                    <Icon as={FaExternalLinkAlt} mx="6px" w="12px" h="auto" />
                  </Text>
                </Box>
              </Flex>
            </Link>
          </Box>
        </TabPanel>
      </PageTab>
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

export default Akademik;

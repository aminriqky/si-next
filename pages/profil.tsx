import type { NextPage, GetStaticProps } from "next";
import React from "react";
import {
  Box,
  Tab,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from "@chakra-ui/react";
import ExNav from "../public/exnav";
import Menu from "../public/menu";
import PageTab from "../public/pagetab";
import { profil } from "./api/profil";
import type { profil as profilList } from "../public/types";

interface profil {
  daftarProfil: Array<profilList>;
}

const Profil: NextPage<profil> = ({ daftarProfil }) => {
  return (
    <Menu>
      <PageTab judul="Profil"
        breadcrumb={
          <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
            <Heading>Profil</Heading>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/profil'>Profil</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        tab={
          <React.Fragment>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Profil Prodi</Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Sejarah</Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Visi & Misi</Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Sarana & Prasarana</Tab>
          </React.Fragment>
        }>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <Box fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: daftarProfil[0].text }} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[7].text }} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[8].text }} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[5].text }} />
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

export default Profil;

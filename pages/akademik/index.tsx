import type { NextPage, GetStaticProps } from "next";
import React from "react";
import {
  Box,
  Tab,
  TabPanel,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb,
  Heading
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { profil } from "../api/profil";
import PageTab from "../../public/pagetab";
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
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
import { profil } from "./api/profil";
import type { profil as profilList } from "../public/types";
import PageTab from "../public/pagetab";

interface penelitian {
  daftarProfil: Array<profilList>;
}

const Penelitian: NextPage<penelitian> = ({ daftarProfil }) => {
  return (
    <Menu>
      <PageTab judul="Penelitian"
        breadcrumb={
          <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
            <Heading>Penelitian</Heading>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/penelitian'>Penelitian</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        tab={
          <React.Fragment>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Grup Penelitian</Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Hasil Penelitian
            </Tab>
          </React.Fragment>
        }>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <Box fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: daftarProfil[9].text }} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <Box fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: daftarProfil[10].text }} />
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

export default Penelitian;

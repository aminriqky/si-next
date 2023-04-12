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
import dynamic from "next/dynamic";
const PageTab = dynamic(
  () => import('../public/pagetab'),
  { ssr: false }
)

interface pengabdian {
  daftarProfil: Array<profilList>;
}

const Pengabdian: NextPage<pengabdian> = ({ daftarProfil }) => {
  return (
    <Menu>
      <PageTab judul="Pengabdian"
        breadcrumb={
          <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
            <Heading>Pengabdian</Heading>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/pengabdian'>Pengabdian</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        tab={
          <React.Fragment>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Hasil Pengabdian
            </Tab>
          </React.Fragment>
        }>
        <TabPanel>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            <Box fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: daftarProfil[11].text }} />
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

export default Pengabdian;

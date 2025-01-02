import type {GetStaticProps, NextPage} from "next";
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Tab, TabPanel} from "@chakra-ui/react";
import {useRouter} from "next/router";
import ExNav from "../public/exnav";
import Menu from "../public/menu";
import "dayjs/locale/id";
import {berita} from "./api/berita";
import type {berita as beritaList} from "../public/types";
import React from "react";
import dynamic from "next/dynamic";

const PageTab = dynamic(
  () => import('../public/pagetab'),
  {ssr: false}
)

interface daftarBerita {
  daftarBerita: Array<beritaList>;
}

type MahasiswaCellProps = {
  logo: string;
  color: string;
  detail: string;
};

const DaftarBerita: NextPage<daftarBerita> = ({daftarBerita}) => {
  const router = useRouter();

  function dots(num: number, str: string) {
    if (str !== null && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return (
    <Menu>
      <PageTab judul="Indeks"
               breadcrumb={
                 <Breadcrumb my={{base: "5%", xl: "80px"}} mx="6%" textColor="white" pos="absolute">
                   <Heading>Indeks</Heading>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
                   </BreadcrumbItem>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/indeks'>Indeks</BreadcrumbLink>
                   </BreadcrumbItem>
                 </Breadcrumb>
               }
               tab={
                 <React.Fragment>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                     Agenda
                   </Tab>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                     Berita
                   </Tab>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                     Pengumuman
                   </Tab>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                     Kehadiran
                   </Tab>
                 </React.Fragment>
               }>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{__html: daftarBerita[9].detail}}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              b
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              c
            </Box>
          </Box>
        </TabPanel>
      </PageTab>
      <ExNav/>
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarBerita = await berita();

  return {
    props: {daftarBerita},
    revalidate: 15,
  };
};

export default DaftarBerita;

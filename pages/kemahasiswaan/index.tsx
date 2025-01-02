import React from "react";
import type {GetStaticProps, NextPage} from "next";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Img,
  Tab,
  TabPanel,
  TabPanels,
  Text
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import {organisasi} from "../api/organisasi";
import {profil} from "../api/profil";
import {server} from "../../config";
import type {organisasi as orgList, profil as profilList} from "../../public/types";
import dynamic from "next/dynamic";

const PageTab = dynamic(
  () => import('../../public/pagetab'),
  {ssr: false}
)

type MahasiswaCellProps = {
  logo: string;
  color: string;
  detail: string;
};

const MahasiswaCell: React.FC<MahasiswaCellProps> = (props) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
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

  return (
    <Menu>
      <PageTab judul="Kemahasiswaan"
               breadcrumb={
                 <Breadcrumb my={{base: "5%", xl: "80px"}} mx="6%" textColor="white" pos="absolute">
                   <Heading>Kemahasiswaan</Heading>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
                   </BreadcrumbItem>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/kemahasiswaan'>Kemahasiswaan</BreadcrumbLink>
                   </BreadcrumbItem>
                 </Breadcrumb>
               }
               tab={
                 <React.Fragment>
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
                 </React.Fragment>
               }>
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
      </PageTab>
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

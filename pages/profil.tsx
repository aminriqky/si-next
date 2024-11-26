import type {GetStaticProps, NextPage} from "next";
import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  Heading,
  Img,
  Tab,
  Table,
  TableContainer,
  TabPanel,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import ExNav from "../public/exnav";
import Menu from "../public/menu";
import dynamic from "next/dynamic";
import {profil} from "./api/profil";
import {kehadiran} from "./api/kehadiran";
import type {kehadiran as kehadiranList, profil as profilList} from "../public/types";
import {server} from "../config";

const PageTab = dynamic(
  () => import('../public/pagetab'),
  {ssr: false}
)

interface profil {
  daftarProfil: Array<profilList>;
  daftarKehadiran: Array<kehadiranList>;
}

const Profil: NextPage<profil> = ({daftarProfil, daftarKehadiran}) => {
  return (
    <Menu>
      <PageTab judul="Profil"
               breadcrumb={
                 <Breadcrumb my={{base: "5%", xl: "80px"}} mx="6%" textColor="white" pos="absolute">
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
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Daftar Dosen</Tab>
                 </React.Fragment>
               }>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{__html: daftarProfil[0].text}}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <div dangerouslySetInnerHTML={{__html: daftarProfil[7].text}}/>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <div dangerouslySetInnerHTML={{__html: daftarProfil[8].text}}/>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <div dangerouslySetInnerHTML={{__html: daftarProfil[5].text}}/>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            {daftarKehadiran !== null &&
              daftarKehadiran.map((item) => {
                return (
                  <Flex key={item.id}>
                    <Img
                      boxSize={{base: "fit-content", xl: "300px"}}
                      src={`${server}/storage/${item.avatar}`}
                      width="auto"
                      alt="Avatar"
                      mr={{xl: "50px"}}
                    />
                    <Grid
                      gap="2"
                      mt={{base: "5%", xl: "15px"}}
                      mr={{base: "25px", xl: "115px"}}
                    >
                      <TableContainer>
                        <Table variant="simple">
                          <Thead>
                            <Tr>
                              <Th>Nama : </Th>
                              <Th>{item.name}</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>E-mail : </Td>
                              <Td>{item.email}</Td>
                            </Tr>
                            <Tr>
                              <Td>NIP : </Td>
                              <Td>{item.nip}</Td>
                            </Tr>
                            <Tr>
                              <Td>NIDN : </Td>
                              <Td>{item.nidn}</Td>
                            </Tr>
                            <Tr>
                              <Td>Jabatan : </Td>
                              <Td>{item.jabatan}</Td>
                            </Tr>
                            <Tr>
                              <Td>Bidang : </Td>
                              <Td>{item.bidang}</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Flex>
                );
              })}
          </Box>
        </TabPanel>
      </PageTab>
      <ExNav/>
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarProfil = await profil();
  const daftarKehadiran = await kehadiran();

  return {
    props: {daftarProfil, daftarKehadiran},
    revalidate: 15,
  };
};

export default Profil;

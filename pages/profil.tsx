import type { GetStaticProps, NextPage } from "next";
import React from "react";
import {
  chakra,
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
  Tr,
} from "@chakra-ui/react";
import ExNav from "../public/exnav";
import Menu from "../public/menu";
import dynamic from "next/dynamic";
import { profil } from "./api/profil";
import { kehadiran } from "./api/kehadiran";
import type {
  kehadiran as kehadiranList,
  profil as profilList,
} from "../public/types";
import { server } from "../config";

const PageTab = dynamic(() => import("../public/pagetab"), { ssr: false });

interface profil {
  daftarProfil: Array<profilList>;
  daftarKehadiran: Array<kehadiranList>;
}

const Profil: NextPage<profil> = ({ daftarProfil, daftarKehadiran }) => {
  return (
    <Menu>
      <PageTab
        judul="Profil"
        breadcrumb={
          <Breadcrumb
            my={{ base: "5%", xl: "80px" }}
            mx="6%"
            textColor="white"
            pos="absolute"
          >
            <Heading>Profil</Heading>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/profil">Profil</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        tab={
          <React.Fragment>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Profil Prodi
            </Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Sejarah
            </Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Visi & Misi
            </Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Sarana & Prasarana
            </Tab>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              Daftar Dosen
            </Tab>
          </React.Fragment>
        }
      >
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box
            w={{ xl: "68vw" }}
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p="4%"
          >
            <Box fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: daftarProfil[0].text }} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box
            w={{ xl: "68vw" }}
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p="4%"
          >
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[7].text }} />
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box
            w={{ xl: "68vw" }}
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p="4%"
          >
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[8].text }} />
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box
            w={{ xl: "68vw" }}
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p="4%"
          >
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[5].text }} />
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box
            w={{ xl: "68vw" }}
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p="4%"
          >
            {daftarKehadiran !== null &&
              daftarKehadiran
                .filter((item) => item.jabatan === "Ketua Program Studi")
                .map((item) => {
                  return (
                    <Flex
                      key={item.id}
                      my={4}
                      bg="white"
                      shadow="lg"
                      rounded="lg"
                      overflow="hidden"
                      flexDirection={{ base: "column", md: "row" }}
                    >
                      <Box
                        w={{ base: "full", md: "250px" }}
                        h={{ base: "400px", md: "250px" }}
                        bgSize="cover"
                        backgroundPosition="center"
                        backgroundImage={`url(${server}/storage/${item.avatar})`}
                      />
                      <Box
                        w={{ base: "full", md: "2/3" }}
                        p={{ base: 4, md: 4 }}
                      >
                        <chakra.h1
                          fontSize="2xl"
                          fontWeight="bold"
                          color="gray.800"
                        >
                          {item.name}
                        </chakra.h1>
                        <chakra.p mt={2} fontSize="sm" color="gray.600">
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              {" "}
                              {/* Stack labels on very small screens */}
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Nama:
                              </Box>
                              <Box>{item.name}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                E-mail:
                              </Box>
                              <Box>{item.email}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                NIP:
                              </Box>
                              <Box>{item.nip}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                NIDN:
                              </Box>
                              <Box>{item.nidn}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Jabatan:
                              </Box>
                              <Box>{item.jabatan}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Bidang:
                              </Box>
                              <Box>{item.bidang}</Box>
                            </Flex>
                          </Box>
                        </chakra.p>
                      </Box>
                    </Flex>
                  );
                })}
            {daftarKehadiran !== null &&
              daftarKehadiran
                .filter((item) => item.jabatan === "Sekretaris Program Studi")
                .map((item) => {
                  return (
                    <Flex
                      key={item.id}
                      my={4}
                      bg="white"
                      shadow="lg"
                      rounded="lg"
                      overflow="hidden"
                      flexDirection={{ base: "column", md: "row" }}
                    >
                      <Box
                        w={{ base: "full", md: "250px" }}
                        h={{ base: "400px", md: "250px" }}
                        bgSize="cover"
                        backgroundPosition="center"
                        backgroundImage={`url(${server}/storage/${item.avatar})`}
                      />
                      <Box
                        w={{ base: "full", md: "2/3" }}
                        p={{ base: 4, md: 4 }}
                      >
                        <chakra.h1
                          fontSize="2xl"
                          fontWeight="bold"
                          color="gray.800"
                        >
                          {item.name}
                        </chakra.h1>
                        <chakra.p mt={2} fontSize="sm" color="gray.600">
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              {" "}
                              {/* Stack labels on very small screens */}
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Nama:
                              </Box>
                              <Box>{item.name}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                E-mail:
                              </Box>
                              <Box>{item.email}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                NIP:
                              </Box>
                              <Box>{item.nip}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                NIDN:
                              </Box>
                              <Box>{item.nidn}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Jabatan:
                              </Box>
                              <Box>{item.jabatan}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Bidang:
                              </Box>
                              <Box>{item.bidang}</Box>
                            </Flex>
                          </Box>
                        </chakra.p>
                      </Box>
                    </Flex>
                  );
                })}
            {daftarKehadiran !== null &&
              daftarKehadiran
                .filter((item) => item.jabatan === "Kepala Laboratorium")
                .map((item) => {
                  return (
                    <Flex
                      key={item.id}
                      my={4}
                      bg="white"
                      shadow="lg"
                      rounded="lg"
                      overflow="hidden"
                      flexDirection={{ base: "column", md: "row" }}
                    >
                      <Box
                        w={{ base: "full", md: "250px" }}
                        h={{ base: "400px", md: "250px" }}
                        bgSize="cover"
                        backgroundPosition="center"
                        backgroundImage={`url(${server}/storage/${item.avatar})`}
                      />
                      <Box
                        w={{ base: "full", md: "2/3" }}
                        p={{ base: 4, md: 4 }}
                      >
                        <chakra.h1
                          fontSize="2xl"
                          fontWeight="bold"
                          color="gray.800"
                        >
                          {item.name}
                        </chakra.h1>
                        <chakra.p mt={2} fontSize="sm" color="gray.600">
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              {" "}
                              {/* Stack labels on very small screens */}
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Nama:
                              </Box>
                              <Box>{item.name}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                E-mail:
                              </Box>
                              <Box>{item.email}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                NIP:
                              </Box>
                              <Box>{item.nip}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                NIDN:
                              </Box>
                              <Box>{item.nidn}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Jabatan:
                              </Box>
                              <Box>{item.jabatan}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Bidang:
                              </Box>
                              <Box>{item.bidang}</Box>
                            </Flex>
                          </Box>
                        </chakra.p>
                      </Box>
                    </Flex>
                  );
                })}
            {daftarKehadiran !== null &&
              daftarKehadiran
                .filter(
                  (item) =>
                    item.jabatan !== "Sekretaris Program Studi" &&
                    item.jabatan !== "Ketua Program Studi" &&
                    item.jabatan !== "Kepala Laboratorium",
                )
                .map((item) => {
                  return (
                    <Flex
                      key={item.id}
                      my={4}
                      bg="white"
                      shadow="lg"
                      rounded="lg"
                      overflow="hidden"
                      flexDirection={{ base: "column", md: "row" }}
                    >
                      <Box
                        w={{ base: "full", md: "250px" }}
                        h={{ base: "400px", md: "250px" }}
                        bgSize="cover"
                        backgroundPosition="center"
                        backgroundImage={`url(${server}/storage/${item.avatar})`}
                      />
                      <Box
                        w={{ base: "full", md: "2/3" }}
                        p={{ base: 4, md: 4 }}
                      >
                        <chakra.h1
                          fontSize="2xl"
                          fontWeight="bold"
                          color="gray.800"
                        >
                          {item.name}
                        </chakra.h1>
                        <chakra.p mt={2} fontSize="sm" color="gray.600">
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              {" "}
                              {/* Stack labels on very small screens */}
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Nama:
                              </Box>
                              <Box>{item.name}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                E-mail:
                              </Box>
                              <Box>{item.email}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                NIP:
                              </Box>
                              <Box>{item.nip}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                NIDN:
                              </Box>
                              <Box>{item.nidn}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Jabatan:
                              </Box>
                              <Box>{item.jabatan}</Box>
                            </Flex>
                            <Flex flexDirection={{ base: "column", sm: "row" }}>
                              <Box
                                width={{ base: "full", sm: "120px" }}
                                flexShrink={0}
                                fontWeight="bold"
                              >
                                Bidang:
                              </Box>
                              <Box>{item.bidang}</Box>
                            </Flex>
                          </Box>
                        </chakra.p>
                      </Box>
                    </Flex>
                  );
                })}
          </Box>
        </TabPanel>
      </PageTab>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarProfil = await profil();
  const daftarKehadiran = await kehadiran();

  return {
    props: { daftarProfil, daftarKehadiran },
    revalidate: 15,
  };
};

export default Profil;

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
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import dynamic from "next/dynamic";
import { profil } from "../api/profil";
import { kehadiran } from "../api/kehadiran";
import type {
  kehadiran as kehadiranList,
  profil as profilList,
} from "../../public/types";
import { server } from "../../config";

const PageTab = dynamic(() => import("../../public/pagetab"), { ssr: false });

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <Flex flexDirection={{ base: "column", sm: "row" }} gap={{ base: 0, sm: 1 }}>
    <Box
      width={{ base: "full", sm: "120px" }}
      flexShrink={0}
      fontWeight="bold"
    >
      {label}
    </Box>
    <Box wordBreak="break-word">: {value}</Box>
  </Flex>
);

const ProfileCard = ({ item, server }) => (
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
      w={{ base: "full", md: "200px", lg: "250px" }}
      h={{ base: "250px", sm: "300px", md: "250px" }}
      minH={{ base: "200px" }}
      flexShrink={0}
      bgSize="cover"
      backgroundPosition="center"
      backgroundImage={`url(${server}/storage/${item.avatar})`}
    />
    <Box w="full" p={{ base: 3, md: 4 }} minW={0}>
      <chakra.h1
        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
        fontWeight="bold"
        color="gray.800"
        noOfLines={2}
      >
        {item.name}
      </chakra.h1>
      <chakra.p mt={2} fontSize={{ base: "xs", md: "sm" }} color="gray.600">
        <Box display="flex" flexDirection="column" gap={{ base: 1, md: 2 }}>
          <ProfileField label="Nama" value={item.name} />
          <ProfileField label="E-mail" value={item.email} />
          <ProfileField label="NIP" value={item.nip} />
          <ProfileField label="NIDN" value={item.nidn} />
          <ProfileField label="Jabatan" value={item.jabatan} />
          <ProfileField label="Bidang" value={item.bidang} />
        </Box>
      </chakra.p>
    </Box>
  </Flex>
);

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
            <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Profil</Heading>
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
            <Tab
              w={{ base: "auto", xl: "full" }}
              whiteSpace="nowrap"
              justifyContent="flex-start"
              rounded="md"
              mt="0.25vw"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
              px={{ base: 3, md: 4 }}
            >
              Profil Prodi
            </Tab>
            <Tab
              w={{ base: "auto", xl: "full" }}
              whiteSpace="nowrap"
              justifyContent="flex-start"
              rounded="md"
              mt="0.25vw"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
              px={{ base: 3, md: 4 }}
            >
              Sejarah
            </Tab>
            <Tab
              w={{ base: "auto", xl: "full" }}
              whiteSpace="nowrap"
              justifyContent="flex-start"
              rounded="md"
              mt="0.25vw"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
              px={{ base: 3, md: 4 }}
            >
              Visi & Misi
            </Tab>
            <Tab
              w={{ base: "auto", xl: "full" }}
              whiteSpace="nowrap"
              justifyContent="flex-start"
              rounded="md"
              mt="0.25vw"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
              px={{ base: 3, md: 4 }}
            >
              Sarana & Prasarana
            </Tab>
            <Tab
              w={{ base: "auto", xl: "full" }}
              whiteSpace="nowrap"
              justifyContent="flex-start"
              rounded="md"
              mt="0.25vw"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
              px={{ base: 3, md: 4 }}
            >
              Daftar Dosen
            </Tab>
          </React.Fragment>
        }
      >
        <TabPanel p={0} mt={{ base: 4, xl: 0 }}>
          <Box
            w="100%"
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p={{ base: "4%", md: "4%" }}
            overflowX="auto"
          >
            <Box fontSize={{ base: "xs", lg: "md" }}>
              <div dangerouslySetInnerHTML={{ __html: daftarProfil[0].text }} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: 4, xl: 0 }}>
          <Box
            w="100%"
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p={{ base: "4%", md: "4%" }}
            overflowX="auto"
          >
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[7].text }} />
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: 4, xl: 0 }}>
          <Box
            w="100%"
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p={{ base: "4%", md: "4%" }}
            overflowX="auto"
          >
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[8].text }} />
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: 4, xl: 0 }}>
          <Box
            w="100%"
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p={{ base: "4%", md: "4%" }}
            overflowX="auto"
          >
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[5].text }} />
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{ base: 4, xl: 0 }}>
          <Box
            w="100%"
            bg="white"
            opacity="0.9"
            zIndex="999"
            ml={{ xl: "4%" }}
            p={{ base: "4%", md: "4%" }}
          >
            {daftarKehadiran !== null &&
              daftarKehadiran
                .filter((item) => item.jabatan === "Ketua Program Studi")
                .map((item) => {
                  return (
                    <ProfileCard key={item.id} item={item} server={server} />
                  );
                })}
            {daftarKehadiran !== null &&
              daftarKehadiran
                .filter((item) => item.jabatan === "Sekretaris Program Studi")
                .map((item) => {
                  return (
                    <ProfileCard key={item.id} item={item} server={server} />
                  );
                })}
            {daftarKehadiran !== null &&
              daftarKehadiran
                .filter((item) => item.jabatan === "Kepala Laboratorium")
                .map((item) => {
                  return (
                    <ProfileCard key={item.id} item={item} server={server} />
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
                    <ProfileCard key={item.id} item={item} server={server} />
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

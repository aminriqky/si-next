import type { NextPage, GetServerSideProps } from "next";
import NextLink from "next/link";
import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Flex,
  Link,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Divider,
  useMediaQuery,
  AspectRatio,
  Img,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { download } from "../api/download";
import { server } from "../../config";
import type { download as dokumen } from "../../public/types";
import { replace } from "../../public/func";
import { FcSelfServiceKiosk } from "@react-icons/all-files/fc/FcSelfServiceKiosk";
import { FcPortraitMode } from "@react-icons/all-files/fc/FcPortraitMode";
import { FcKindle } from "@react-icons/all-files/fc/FcKindle";
import { FcSalesPerformance } from "@react-icons/all-files/fc/FcSalesPerformance";
import { FcSurvey } from "@react-icons/all-files/fc/FcSurvey";
import { FcButtingIn } from "@react-icons/all-files/fc/FcButtingIn";
import { FcQuestions } from "@react-icons/all-files/fc/FcQuestions";

interface DokumenCellProps {
  key: number;
  link: number;
  hari: string;
  hariBulan: string;
  judul: string;
  tanggal: string;
  detail: string;
}

function DokumenCell(props: DokumenCellProps) {
  const [saveFile, setSaveFile] = useState("");

  useEffect(() => {
    if (saveFile === "") {
      linkUnduh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function linkUnduh() {
    const unduh = await fetch(`${server}/api/downloadfile/${props.link}`);
    const jsonData = await unduh.json();
    if (jsonData.length !== 0) {
      setSaveFile(`${server}/storage/${jsonData[0].download_link}`);
    } else {
      setSaveFile(jsonData);
    }
  }

  return (
    <React.Fragment>
      <Flex flexDirection="row" flex="1">
        <Box
          minW="60px"
          height="60px"
          m={{ base: "3vw", xl: "1.4vw" }}
          textAlign="center"
          border="1px"
        >
          <Text mt="5px" alignSelf="center" fontWeight="semibold" fontSize="lg">
            {props.hari}
          </Text>
          <Text fontSize="xs">{props.hariBulan}</Text>
        </Box>
        <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
          <Text fontSize={{ base: "sm", xl: "md" }} fontWeight="semibold">
            {props.judul}
          </Text>
          <Text fontSize="sm">{props.tanggal}</Text>
        </Box>
      </Flex>
      {saveFile.length !== 0 && (
        <Flex
          flexDirection="row"
          flex="1"
          bg="whiteAlpha.900"
          pl="2%"
          mb={{ base: "3vw", xl: "1.41vw" }}
        >
          <Text color="teal" pt="2.5px">
            Lampiran File :
          </Text>
          &ensp;
          <Link _hover={{ textTransform: "none" }} href={saveFile} download>
            <Button colorScheme="teal" size="sm">
              Unduh
            </Button>
          </Link>
        </Flex>
      )}
      <Text pl="2%" textColor="black" fontSize={{ base: "xs", lg: "md" }}>
        {props.detail}
      </Text>
    </React.Fragment>
  );
}

interface daftarDokumen {
  daftarDokumen: Array<dokumen>;
}

const Dokumen: NextPage<daftarDokumen> = ({ daftarDokumen }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const router = useRouter();
  const { dokumen } = router.query;

  return (
    <Menu>
      <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
        <Heading>Dokumen</Heading>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='/dokumen'>Dokumen</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex bg="blue.600">
        <AspectRatio
          pointerEvents="none"
          opacity="0.2"
          h={{ base: "100px", xl: "200px" }}
          w="100%"
        >
          <Img
            src="/gambar.jpg"
            w="100%"
            alt="Gambar Slide"
          />
        </AspectRatio>
      </Flex>
      <Flex flexDir="row" my={{ base: "10%", xl: "80px" }} mx="6%">
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          orientation={isLargerThan1280 ? ("vertical") : ("horizontal")}
        >
          <Flex flexDir="column">
            <Text fontSize='sm'>Dokumen</Text>
            <TabList my="1vw" w="100%">
              <Flex flexWrap="wrap">
                <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Dokumen</Tab>
              </Flex>
            </TabList>
            <Divider borderColor="gray.400" />
            <Text mt="8%" fontSize='sm'>Aksi Cepat</Text>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSelfServiceKiosk />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Sekilas Prodi Sistem Informasi
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcPortraitMode />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Calon Mahasiswa
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcKindle />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Beasiswa
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSalesPerformance />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Prestasi
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcSurvey />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Profil Lulusan
              </Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcButtingIn />} justifyContent="flex-start" rounded="md" mt="0.75vw">Alumni</Button>
            </NextLink>
            <NextLink href="/overview">
              <Button w="full" leftIcon={<FcQuestions />} justifyContent="flex-start" rounded="md" mt="0.75vw">FAQ</Button>
            </NextLink>
          </Flex>
          <TabPanels>
            <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
              <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                {daftarDokumen !== null &&
                  daftarDokumen.map((item) => {
                    if (replace(item.nama_berkas).toString() === dokumen) {
                      return (
                        <DokumenCell
                          key={item.id}
                          hari={dayjs(item.updated_at)
                            .locale("id")
                            .format("ddd")
                            .toUpperCase()}
                          hariBulan={dayjs(item.updated_at).format("DD/MM")}
                          judul={item.nama_berkas}
                          tanggal={dayjs(item.updated_at)
                            .locale("id")
                            .format("dddd, DD MMMM YYYY")}
                          detail={item.keterangan}
                          link={item.id}
                        />
                      );
                    }
                  })}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <ExNav />
    </Menu>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const daftarDokumen = await download();

  return {
    props: { daftarDokumen },
  };
};

export default Dokumen;

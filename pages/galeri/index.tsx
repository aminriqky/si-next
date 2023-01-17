import React, { Fragment, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import NextLink from "next/link";
import {
  Text,
  Box,
  AspectRatio,
  LinkOverlay,
  LinkBox,
  Grid,
  useMediaQuery,
  Img,
  Flex,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { tahun } from "../api/tahun";
import type { tahun as tahunList } from "../../public/types";
import { FcSelfServiceKiosk } from "@react-icons/all-files/fc/FcSelfServiceKiosk";
import { FcPortraitMode } from "@react-icons/all-files/fc/FcPortraitMode";
import { FcKindle } from "@react-icons/all-files/fc/FcKindle";
import { FcSalesPerformance } from "@react-icons/all-files/fc/FcSalesPerformance";
import { FcSurvey } from "@react-icons/all-files/fc/FcSurvey";
import { FcButtingIn } from "@react-icons/all-files/fc/FcButtingIn";
import { FcQuestions } from "@react-icons/all-files/fc/FcQuestions";
import { server } from "../../config";
import type { gallery as galeriList } from "../../public/types";
import { gallery } from "../api/gallery";

type GaleriCellProps = {
  id: number;
  gambar: string;
};

function GaleriCell(props: GaleriCellProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment key={props.id}>
      <LinkBox onClick={onOpen}>
        <AspectRatio
          overflow="hidden"
          borderRadius="5"
          maxW="320px"
          maxH="200px"
        >
          <LinkOverlay color="teal.800">
            <AspectRatio h="100%" w="100%">
              <Img src={`${server}/storage/${props.gambar}`} objectFit="fill" />
            </AspectRatio>
          </LinkOverlay>
        </AspectRatio>
      </LinkBox>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          minW={{ base: 315, xl: 720 }}
          minH={{ base: 310, xl: 540 }}
        >
          <AspectRatio h="100%" w="100%">
            <Img src={`${server}/storage/${props.gambar}`} objectFit="fill" />
          </AspectRatio>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

interface daftarGaleri {
  daftarTahun: Array<tahunList>;
  daftarGaleri: Array<galeriList>;
}

const DaftarGaleri: NextPage<daftarGaleri> = ({ daftarTahun, daftarGaleri }) => {
  const [tahun, setTahun] = useState(0);
  const [galeri, setGaleri] = useState(0);
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <Menu>
      <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
        <Heading>Galeri</Heading>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='/galeri'>Galeri</BreadcrumbLink>
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
            <Text fontSize='sm'>Galeri</Text>
            <TabList my="1vw" w="100%">
              <Flex flexWrap="wrap">
                {daftarTahun !== null &&
                  daftarTahun.map((item) => {
                    return (
                      <Tab onFocus={() => {
                        setGaleri(item.tahun);
                      }} key={item.id} w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                        {item.tahun}
                      </Tab>
                    );
                  })}
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
              {isLargerThan1280 ? (
                <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                  <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                    {daftarGaleri !== null &&
                      daftarGaleri.map((item) => {
                        if (item.tahun === galeri) {
                          return <GaleriCell id={item.id} gambar={item.thumnail} />;
                        }
                      })}
                  </Grid>
                </Box>
              ) : (
                <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                  <Grid gap={2}>
                    {daftarGaleri !== null &&
                      daftarGaleri.map((item) => {
                        if (item.tahun === galeri) {
                          return <GaleriCell id={item.id} gambar={item.thumnail} />;
                        }
                      })}
                  </Grid>
                </Box>
              )}
            </TabPanel>
            <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
              {isLargerThan1280 ? (
                <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                  <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                    {daftarGaleri !== null &&
                      daftarGaleri.map((item) => {
                        if (item.tahun === galeri) {
                          return <GaleriCell id={item.id} gambar={item.thumnail} />;
                        }
                      })}
                  </Grid>
                </Box>
              ) : (
                <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                  <Grid gap={2}>
                    {daftarGaleri !== null &&
                      daftarGaleri.map((item) => {
                        if (item.tahun === galeri) {
                          return <GaleriCell id={item.id} gambar={item.thumnail} />;
                        }
                      })}
                  </Grid>
                </Box>
              )}
            </TabPanel>
            <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
              {isLargerThan1280 ? (
                <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                  <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                    {daftarGaleri !== null &&
                      daftarGaleri.map((item) => {
                        if (item.tahun === galeri) {
                          return <GaleriCell id={item.id} gambar={item.thumnail} />;
                        }
                      })}
                  </Grid>
                </Box>
              ) : (
                <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                  <Grid gap={2}>
                    {daftarGaleri !== null &&
                      daftarGaleri.map((item) => {
                        if (item.tahun === galeri) {
                          return <GaleriCell id={item.id} gambar={item.thumnail} />;
                        }
                      })}
                  </Grid>
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarTahun = await tahun();
  const daftarGaleri = await gallery();

  return {
    props: { daftarTahun, daftarGaleri },
    revalidate: 15,
  };
};
export default DaftarGaleri;

import React from "react";
import Head from "next/head";
import {
  Text, Img, Box, Icon, Flex, Link
} from "@chakra-ui/react";
import { FcCalendar, FcCollaboration, FcDocument, FcViewDetails } from "react-icons/fc"
import useWindowDimensions from "../public/WindowDimensions";
import ExNav from '../public/exnav'
import Menu from '../public/menu';

export default function Akademik() {
  const { height } = useWindowDimensions();

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu
        pageHeight={{ base: "200vw", xl: "66vw" }}
        slideShow={<Img sx={{ filter: "blur(500px)" }} pointerEvents="none" opacity="0.5" filter="blur(0.75px) grayscale(25%)" position="absolute" src="/misi.png" alt="BG Gradient" height={height} />}
      >
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="50px" p="4%">
          <Text fontSize="28" pb="1%" fontWeight="semibold">
            Layanan Akademik
          </Text>
          <Text pb="2%">
            Layanan Akademik mempunyai tujuan untuk memenuhi harapan dan kebutuhan sehingga tercapai suatu kepuasan.
            Upaya sistematis pendidik untuk memfasilitasi peserta didik dan tenaga pendidik untuk menguasai isi kurikulum
            melalui proses pembelajaran sehingga mampu mencapai kompetensi standar yang ditetapkan.
          </Text>
          <Flex flexDirection="row">
            <Flex flexDirection="row" flex="1">
              <Icon as={FcViewDetails} w={{ base: "50px", xl: "150px" }} h="auto" />
              <Text alignSelf="center" fontSize={{ base: 16, xl: 22 }} fontWeight="medium" color="orange.600">
                <Link href="akademik/kurikulum">
                  Kurikulum
                </Link>
              </Text>
            </Flex>
            <Flex flexDirection="row" flex="1">
              <Icon as={FcCalendar} w={{ base: "50px", xl: "150px" }} h="auto" />
              <Text alignSelf="center" fontSize={{ base: 16, xl: 22 }} fontWeight="medium" color="orange.600">
                <Link href="akademik/kalender">
                  Kalender Akademik
                </Link>
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection="row" >
            <Flex flexDirection="row" flex="1">
              <Icon as={FcCollaboration} w={{ base: "50px", xl: "150px" }} h="auto" />
              <Text alignSelf="center" fontSize={{ base: 16, xl: 22 }} fontWeight="medium" color="orange.600">
                <Link href="akademik/pengabdian">
                  Pengabdian
              </Link>
              </Text>
            </Flex>
            <Flex flexDirection="row" flex="1">
              <Icon as={FcDocument} w={{ base: "50px", xl: "150px" }} h="auto" />
              <Text alignSelf="center" fontSize={{ base: 16, xl: 22 }} fontWeight="medium" color="orange.600">
                <Link href="akademik/HaKI">
                  HaKI
              </Link>
              </Text>
            </Flex>
          </Flex>
          <Text pt="2%">
            Layanan Akademik bertujuan untuk mendukung penyelenggaraan pendidikan, sehingga perguruan tinggi dapat menyediakan layanan
            informasi yang lebih baik dan efektif kepada komunitasnya, baik didalam maupun diluar perguruan tinggi melalui internet.
          </Text>
        </Box>
        <ExNav />
      </Menu>
    </>
  );
}

import {
  Text, Box, Icon, Flex, Link
} from "@chakra-ui/react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { FcCalendar, FcCollaboration, FcDocument, FcViewDetails } from "react-icons/fc";
import ExNav from '../public/exnav';
import Menu from '../public/menu';
const BgImg = dynamic(() => import('../public/dynamic/BgImg'));

export default function Akademik() {

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu pageHeight={{ base: "200vw", xl: "66vw" }} slideShow={<BgImg />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="50px" p="4%">
          <Text fontSize="28" pb="3%" fontWeight="semibold">
            Layanan Akademik
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
        </Box>
        <ExNav />
      </Menu>
    </>
  );
}

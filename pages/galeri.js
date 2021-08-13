import Head from "next/head";
import { useRouter } from 'next/router'
import {
  Text, Box, Flex
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import ExNav from '../public/exnav'
import Menu from '../public/menu';
import { download } from './api/download';
const BgImg = dynamic(() => import('../public/dynamic/BgImg'));

export default function DaftarGaleri({ daftarDokumen }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<BgImg />}>
        <Box bg="white" zIndex="999" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
          <Text textColor="black" fontSize="2xl" fontWeight="semibold">
            Galeri
          </Text>
        </Box>
        <ExNav />
      </Menu>
    </>
  );
}

export async function getStaticProps() {
  const daftarDokumen = await download()

  return {
    props: { daftarDokumen },
    revalidate: 30
  };
}
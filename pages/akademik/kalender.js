import Head from "next/head";
import {
  Text, Box
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import { profil } from '../api/profil';
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

export default function Kalender({ daftarProfil }) {
  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<BgImg />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="100px" p="4%">
          <Text fontSize={{ base: "xs", lg: "md" }}>
            <div dangerouslySetInnerHTML={{ __html: daftarProfil[3].text }} />
          </Text>
        </Box>
        <ExNav />
      </Menu>
    </>
  );
}

export async function getStaticProps() {
  const daftarProfil = await profil()

  return {
    props: { daftarProfil },
    revalidate: 30
  };
}

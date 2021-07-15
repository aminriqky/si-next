import Head from "next/head";
import {
  Text, Img, Box
} from "@chakra-ui/react";
import useWindowDimensions from "../public/WindowDimensions";
import Menu from '../public/menu';

export default function Dokumen() {
  const { width } = useWindowDimensions();

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<Img sx={{ filter: "blur(500px)" }} pointerEvents="none" opacity="0.5" filter="blur(0.75px) grayscale(25%)" position="absolute" src="/misi.png" alt="BG Gradient" width={width} />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="50px">
          <Text fontSize="24" p="4%">
            Dokumen
          </Text>
        </Box>
      </Menu>
    </>
  );
}

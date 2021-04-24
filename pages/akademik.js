import React from "react";
import Head from "next/head";
import {
  Text, Img, Box
} from "@chakra-ui/react";
import useWindowDimensions from "../public/WindowDimensions";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import Menu from '../public/menu';

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

export default function Akademik() {
  const { width } = useWindowDimensions();

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<Img sx={{ filter: "blur(200px)" }} className="banner" src="misi.png" alt="BG Gradient" width={width} />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="50px">
          <Text fontSize="24" p="4%">
            Layanan Akademik
          </Text>
        </Box>
      </Menu>
    </>
  );
}

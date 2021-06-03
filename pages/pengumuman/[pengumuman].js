import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Text, Img, Box, Flex, Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useWindowDimensions from "../../public/WindowDimensions";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import axios from "axios";
import dayjs from 'dayjs';

function PengumumanCell(props) {
  return (
    <>
      <Flex key={props.dykey} flexDirection="row" flex="1">
        <Box minW="60px" height="60px" m={{ base: "3vw", xl: "1.4vw" }} textAlign="center" border="1px">
          <Text mt="5px" alignSelf="center" fontWeight="semibold" fontSize="lg">{props.hari}</Text>
          <Text fontSize="xs">{props.hariBulan}</Text>
        </Box>
        <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
          <Text fontSize={{ base: "sm", xl: "md" }} fontWeight="semibold">
            {props.judul}
          </Text>
          <Text fontSize="sm">{props.tanggal}</Text>
        </Box>
      </Flex>
      <Flex flexDirection="row" flex="1" bg="whiteAlpha.900" pl="2%">
        <Text color="teal" pt="2.5px">
          Lampiran File :
        </Text>
        &ensp;
        <Button colorScheme="teal" size="sm">Unduh</Button>
      </Flex>
    </>
  )
}

export default function Agenda() {
  const { height } = useWindowDimensions();
  const router = useRouter();
  const [daftarPengumuman, setDaftarPengumuman] = useState(null);
  const { pengumuman } = router.query;

  useEffect(() => {
    if (daftarPengumuman === null) {
      axios.get(`https://webprodi.sashi.id/api/pengumuman/all`)
        .then(res => {
          const pengumuman = res.data;
          setDaftarPengumuman(pengumuman);
        })
    }
  }, [daftarPengumuman])

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu
        pageHeight={{ base: "200vw", xl: "66vw" }}
        slideShow={<Img sx={{ filter: "blur(500px)" }} pointerEvents="none" opacity="0.5" filter="blur(0.75px) grayscale(25%)" position="absolute" src="/misi.png" alt="BG Gradient" height={height} />}
      >
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="100px" p="4%">
          {
            daftarPengumuman !== null && daftarPengumuman.map((item) => {
              if (item.id == pengumuman) {
                return (
                  <>
                    <PengumumanCell dykey={item.id}
                      hari={dayjs(item.updated_at).locale('id').format('ddd').toUpperCase()}
                      hariBulan={dayjs(item.updated_at).format('DD/MM')}
                      judul={item.judul}
                      tanggal={dayjs(item.updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                      detail={item.detail}
                    />
                    <Box>

                    </Box>
                  </>
                )
              }
            })
          }
        </Box>
        <ExNav />
      </Menu>
    </>
  );
}

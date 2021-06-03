import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Text, Img, Box, Icon, Flex, Divider
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FcClock, FcOvertime } from "react-icons/fc"
import useWindowDimensions from "../../public/WindowDimensions";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import axios from "axios";
import dayjs from 'dayjs';

export default function Agenda() {
  const { height } = useWindowDimensions();
  const router = useRouter();
  const [daftarAgenda, setDaftarAgenda] = useState(null);
  const { agenda } = router.query;

  useEffect(() => {
    if (daftarAgenda === null) {
      axios.get(`https://webprodi.sashi.id/api/agenda/baru`)
        .then(res => {
          const agenda = res.data;
          setDaftarAgenda(agenda);
        })
    }
  }, [])

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
            daftarAgenda !== null && daftarAgenda.map((item) => {
              if (item.id == agenda) {
                return (
                  <Box key={item.id}>
                    <Text fontSize="28" pb="1%" fontWeight="semibold">
                      {item.detail_kegiatan}
                    </Text>
                    <Text pb="2%" color="gray">
                      Tag:
                    </Text>
                    <Flex flexDirection="column" bg="gray.300" p="2%">
                      <Flex flexDirection="row">
                        <Text color="black" fontWeight="semibold" pb="2%">
                          Jadwal Agenda Kegiatan :
                      </Text>
                      </Flex>
                      <Flex flexDirection="row" flex="1" bg="whiteAlpha.900" p="2%">
                        <Text color="black" fontWeight="medium">
                          Tanggal:
                        </Text>
                        &ensp;
                        <Icon as={FcOvertime} w="25px" h="auto" />
                        &ensp;
                        <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                          {dayjs(daftarAgenda[0].waktu).format('DD/MM/YYYY')}
                        </Text>
                        &ensp;
                        <Icon as={FcClock} w="25px" h="auto" />
                        &ensp;
                        <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                          {dayjs(daftarAgenda[0].waktu).format('HH:mm')} WIB
                        </Text>
                      </Flex>
                      <Divider />
                      <Flex flexDirection="row" flex="1" bg="whiteAlpha.900" p="2%">
                        <Text color="black" fontWeight="medium">
                          Tempat:
                        </Text>
                        &ensp;
                        <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                          {item.tempat}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
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

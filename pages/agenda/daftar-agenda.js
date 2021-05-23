import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Text, Img, Box, Flex, Link
} from "@chakra-ui/react";
import NavLink from "next/link";
import useWindowDimensions from "../../public/WindowDimensions";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import axios from "axios";
import dayjs from 'dayjs';

function AgendaCell(props) {
  return (
    <Flex key={props.dykey} flexDirection="row" flex="1" borderBottom="solid black 1px">
      <Box minW="60px" height="60px" m={{ base: "3vw", xl: "1.4vw" }} textAlign="center" border="2px">
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">{props.hari}</Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize="md">
          <Link fontWeight="semibold">
            <NavLink as={props.dylink} href="/agenda/[agenda]">
              {props.kegiatan}
            </NavLink>
          </Link>
        </Text>
        <Text fontSize="sm">{props.tanggal}</Text>
      </Box>
    </Flex>
  )
}

export default function DaftarAgenda() {
  const { height } = useWindowDimensions();
  const [daftarAgenda, setDaftarAgenda] = useState(null);

  useEffect(() => {
    if (daftarAgenda === null) {
      axios.get(`https://webprodi.sashi.id/api/agenda/all`)
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
        slideShow={<Img sx={{ filter: "blur(500px)" }} className="banner" src="/misi.png" alt="BG Gradient" height={height} />}
      >
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="100px" p="4%">
          <Text fontSize="28" pb="1%" fontWeight="semibold">
            Daftar Agenda
          </Text>
          {
            daftarAgenda !== null && daftarAgenda.map((item) => {
              return (
                <>
                  <AgendaCell dykey={item.id}
                    hari={dayjs(item.waktu).locale('id').format('ddd').toUpperCase()}
                    hariBulan={dayjs(item.waktu).format('DD/MM')}
                    kegiatan={item.detail_kegiatan}
                    tanggal={item.tempat}
                    dylink={`/agenda/${item.id}`}
                  />
                </>
              )
            })
          }
        </Box>
        <ExNav />
      </Menu>
    </>
  );
}

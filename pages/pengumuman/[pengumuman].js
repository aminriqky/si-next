import Head from "next/head";
import {
  Text, Box, Flex, Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import dayjs from 'dayjs';
import { pengumuman } from "../api/pengumuman";
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

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
      <Flex flexDirection="row" flex="1" bg="whiteAlpha.900" pl="2%" mb={{ base: "3vw", xl: "1.41vw" }}>
        <Text color="teal" pt="2.5px">
          Lampiran File :
        </Text>
        &ensp;
        <Button colorScheme="teal" size="sm">Unduh</Button>
      </Flex>
      <Box pl="2%">
        <div dangerouslySetInnerHTML={{ __html: props.detail }} />
      </Box>
    </>
  )
}

export default function Pengumuman({ daftarPengumuman }) {
  const router = useRouter();
  const { pengumuman } = router.query;

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<BgImg />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="100px" p="4%">
          {
            daftarPengumuman !== null && daftarPengumuman.map((item) => {
              if (item.id == pengumuman) {
                return (
                  <PengumumanCell dykey={item.id}
                    hari={dayjs(item.updated_at).locale('id').format('ddd').toUpperCase()}
                    hariBulan={dayjs(item.updated_at).format('DD/MM')}
                    judul={item.judul}
                    tanggal={dayjs(item.updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                    detail={item.detail}
                  />
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

export async function getServerSideProps() {
  const daftarPengumuman = await pengumuman()

  return {
    props: { daftarPengumuman }
  };
}

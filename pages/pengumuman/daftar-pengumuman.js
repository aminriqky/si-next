import Head from "next/head";
import {
  Text, Box, Flex, Link
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import dayjs from 'dayjs';
import { pengumuman } from '../api/pengumuman';
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

function PengumumanCell(props) {
  const router = useRouter();

  return (
    <Flex key={props.dykey} flexDirection="row" flex="1" borderBottom="solid 1px gray">
      <Box minW="60px" height="60px" m={{ base: "3vw", xl: "1.4vw" }} textAlign="center" border="2px">
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">{props.hari}</Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize="md">
          <Link fontWeight="semibold" onClick={(e) => {
            e.preventDefault()
            router.push(`${props.dylink}`)
          }}>
            {props.judul}
          </Link>
        </Text>
        <Text fontSize="sm">{props.waktu}</Text>
      </Box>
    </Flex>
  )
}

export default function DaftarPengumuman({ daftarPengumuman }) {
  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<BgImg />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="6%" p="4%">
          <Text fontSize="28" pb="2%" fontWeight="semibold">
            Daftar Pengumuman
          </Text>
          {
            daftarPengumuman !== null && daftarPengumuman.map((item) => {
              return (
                <PengumumanCell
                  dykey={item.id}
                  hari={dayjs(item.waktu).locale('id').format('ddd').toUpperCase()}
                  hariBulan={dayjs(item.waktu).format('DD/MM')}
                  judul={item.judul}
                  waktu={dayjs(item.updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                  dylink={`/pengumuman/${item.id}`}
                />
              )
            })
          }
        </Box>
        <ExNav />
      </Menu>
    </>
  );
}

export async function getStaticProps() {
  const daftarPengumuman = await pengumuman()

  return {
    props: { daftarPengumuman },
    revalidate: 30
  };
}

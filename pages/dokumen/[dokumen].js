import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Text, Box, Flex, Link, Button
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import dayjs from 'dayjs';
import { download } from '../api/download';
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

function DokumenCell(props) {
  const [saveFile, setSaveFile] = useState(null);

  useEffect(() => {
    if (saveFile === null) {
      linkUnduh();
    }
  }, [])

  async function linkUnduh() {
    const unduh = await fetch(`https://webprodi.sashi.id/api/downloadfile/${props.link}`);
    const jsonData = await unduh.json()
    setSaveFile(`https://webprodi.sashi.id/storage/${jsonData[0].download_link}`);
  }

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
        <Link _hover={{ textTransform: "none" }} href={saveFile} download>
          <Button colorScheme="teal" size="sm">
            Unduh
          </Button>
        </Link>
      </Flex>
      <Box pl="2%">
        <Text textColor="black">
          {props.detail}
        </Text>
      </Box>
    </>
  )
}

export default function Dokumen({ daftarDokumen }) {
  const router = useRouter();
  const { dokumen } = router.query;

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<BgImg />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
          {
            daftarDokumen !== null && daftarDokumen.map((item) => {
              if (item.id == dokumen) {
                return (
                  <DokumenCell dykey={item.id}
                    hari={dayjs(item.updated_at).locale('id').format('ddd').toUpperCase()}
                    hariBulan={dayjs(item.updated_at).format('DD/MM')}
                    judul={item.nama_berkas}
                    tanggal={dayjs(item.updated_at).locale('id').format('dddd, DD MMMM YYYY')}
                    detail={item.keterangan}
                    link={item.id}
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
  const daftarDokumen = await download()

  return {
    props: { daftarDokumen }
  };
}

import type { NextPage, GetServerSideProps } from 'next';
import React, { useState, useEffect } from "react";
import {
  Text, Box, Flex, Link, Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { download } from '../api/download';
import { server } from "../../config";
import type { download as dokumen } from '../../public/types';

type DokumenCellProps = {
  key: number
  link: number
  hari: string
  hariBulan: string
  judul: string
  tanggal: string
  detail: string
}

function DokumenCell(props: DokumenCellProps) {
  const [saveFile, setSaveFile] = useState('');

  useEffect(() => {
    if (saveFile === '') {
      linkUnduh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function linkUnduh() {
    const unduh = await fetch(`${server}/api/downloadfile/${props.link}`);
    const jsonData = await unduh.json()
    setSaveFile(`${server}/storage/${jsonData[0].download_link}`);
  }

  return (
    <React.Fragment>
      <Flex key={props.key} flexDirection="row" flex="1">
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
      <Text pl="2%" textColor="black" fontSize={{ base: "xs", lg: "md" }}>
        {props.detail}
      </Text>
    </React.Fragment>
  )
}

interface daftarDokumen {
  daftarDokumen: Array<dokumen>
}

const Dokumen: NextPage<daftarDokumen> = ({ daftarDokumen }) => {
  const router = useRouter();
  const { dokumen } = router.query;

  return (
    <Menu>
      <Box bg="white" opacity="0.9" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        {
          daftarDokumen !== null && daftarDokumen.map((item) => {
            if (item.id.toString() === dokumen) {
              return (
                <DokumenCell
                  key={item.id}
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
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const daftarDokumen = await download()

  return {
    props: { daftarDokumen }
  };
}

export default Dokumen;
import type {GetStaticProps, NextPage} from "next";
import {Box, Flex, Link, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import dayjs from "dayjs";
import "dayjs/locale/id";
import {pengumuman} from "../api/pengumuman";
import type {pengumuman as pengumumanList} from "../../public/types";
import {replace} from "../../public/func";

type PengumumanCellProps = {
  key: number;
  hari: string;
  hariBulan: string;
  dylink: string;
  judul: string;
  waktu: string;
};

function PengumumanCell(props: PengumumanCellProps) {
  const router = useRouter();

  return (
    <Flex flexDirection="row" flex="1" borderBottom="solid 1px gray">
      <Box
        minW="60px"
        height="60px"
        m={{base: "3vw", xl: "1.4vw"}}
        textAlign="center"
        border="2px"
      >
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">
          {props.hari}
        </Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" m={{base: "3vw", xl: "1.41vw"}}>
        <Text fontSize="md">
          <Link
            fontWeight="semibold"
            onClick={(e) => {
              e.preventDefault();
              router.push(`${props.dylink}`);
            }}
            href={`${props.dylink}`}
          >
            {props.judul}
          </Link>
        </Text>
        <Text fontSize="sm">{props.waktu}</Text>
      </Box>
    </Flex>
  );
}

interface daftarPengumuman {
  daftarPengumuman: Array<pengumumanList>;
}

const DaftarPengumuman: NextPage<daftarPengumuman> = ({daftarPengumuman}) => {
  return (
    <Menu>
      <Box
        bg="white"
        opacity="0.9"
        zIndex="999"
        textColor="black"
        mx="6%"
        my={{base: "12%", xl: "100px"}}
        p="4%"
      >
        <Text fontSize="28" pb="2%" fontWeight="semibold">
          Daftar Pengumuman
        </Text>
        {daftarPengumuman !== null &&
          daftarPengumuman.map((item) => {
            return (
              <PengumumanCell
                key={item.id}
                hari={dayjs(item.updated_at).locale("id").format("ddd").toUpperCase()}
                hariBulan={dayjs(item.updated_at).format("DD/MM")}
                judul={item.judul}
                waktu={dayjs(item.updated_at).locale("id").format("dddd, DD MMMM YYYY")}
                dylink={`/pengumuman/${replace(item.judul)}`}
              />
            );
          })}
      </Box>
      <ExNav/>
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarPengumuman = await pengumuman();

  return {
    props: {daftarPengumuman},
    revalidate: 15,
  };
};

export default DaftarPengumuman;

import type { NextPage, GetStaticProps } from "next";
import { Text, Box, Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { replace } from "../../public/func";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { berita } from "../api/berita";
import type { berita as beritaList } from "../../public/types";

type BeritaCellProps = {
  key: number;
  hari: string;
  hariBulan: string;
  dylink: string;
  judul: string;
  penulis: string;
};

interface daftarBerita {
  daftarBerita: Array<beritaList>;
}

function BeritaCell(props: BeritaCellProps) {
  const router = useRouter();

  return (
    <Flex
      key={props.key}
      flexDirection="row"
      flex="1"
      borderBottom="solid 1px gray"
    >
      <Box
        minW="60px"
        height="60px"
        m={{ base: "3vw", xl: "1.4vw" }}
        textAlign="center"
        border="2px"
      >
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">
          {props.hari}
        </Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize="md">
          <Link
            fontWeight="semibold"
            onClick={(e) => {
              e.preventDefault();
              router.push(`${props.dylink}`);
            }}
          >
            {props.judul}
          </Link>
        </Text>
        <Text fontSize="sm">{props.penulis}</Text>
      </Box>
    </Flex>
  );
}

const DaftarBerita: NextPage<daftarBerita> = ({ daftarBerita }) => {
  return (
    <Menu>
      <Box
        bg="white"
        opacity="0.9"
        zIndex="999"
        textColor="black"
        mx="8%"
        my={{ base: "12%", xl: "100px" }}
        p="4%"
      >
        <Text fontSize="28" pb="2%" fontWeight="semibold">
          Daftar Berita
        </Text>
        {daftarBerita !== null &&
          daftarBerita.map((item) => {
            return (
              <BeritaCell
                key={item.id}
                hari={dayjs(item.tanggal)
                  .locale("id")
                  .format("ddd")
                  .toUpperCase()}
                hariBulan={dayjs(item.tanggal).format("DD/MM")}
                judul={item.judul}
                penulis={item.penulis}
                dylink={`/berita/${replace(item.judul)}`}
              />
            );
          })}
      </Box>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarBerita = await berita();

  return {
    props: { daftarBerita },
    revalidate: 15,
  };
};

export default DaftarBerita;

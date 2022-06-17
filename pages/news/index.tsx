import type { NextPage, GetStaticProps } from "next";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Text, Box, Img, Flex, Link } from "@chakra-ui/react";
import Interweave from "interweave";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { organisasi } from "../api/organisasi";
import { berita } from "../api/berita";
import { server } from "../../config";
import type {
  organisasi as orgList,
  berita as beritaList,
} from "../../public/types";

type MahasiswaCellProps = {
  logo: string;
  color: string;
  detail: string;
};

const MahasiswaCell: React.FC<MahasiswaCellProps> = (props) => {
  return (
    <Flex flexDir={{ base: "column", xl: "row" }} mb="2%">
      <Img
        src={`${server}/storage/${props.logo}`}
        borderRadius="5"
        maxW="320px"
        objectFit="contain"
      />
      <Flex ml={{ base: 0, xl: 32 }} flexDir="column" flexWrap="wrap">
        <Text mb="10px" color={props.color} fontWeight="semibold">
          {props.children}
        </Text>
        <Box
          color="black"
          fontWeight="light"
          fontSize={{ base: "xs", lg: "md" }}
        >
          <Interweave content={props.detail} />
        </Box>
      </Flex>
    </Flex>
  );
};

interface daftarKemahasiswaan {
  daftarOrganisasi: Array<orgList>;
  daftarBerita: Array<beritaList>;
}

const DaftarKemahasiswaan: NextPage<daftarKemahasiswaan> = ({
  daftarOrganisasi,
  daftarBerita,
}) => {
  const router = useRouter();

  function dots(num: number, str: string) {
    if (str !== null && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return (
    <Menu>
      <Box
        bg="white"
        opacity="0.9"
        zIndex="999"
        mx="8%"
        my={{ base: "12%", xl: "100px" }}
        p="4%"
      >
        <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="6">
          Organisasi Mahasiswa
        </Text>
        {daftarOrganisasi !== null &&
          daftarOrganisasi.map((item) => {
            return (
              <MahasiswaCell
                color="black"
                key={item.id}
                detail={item.detail}
                logo={item.logo}
              >
                {item.judul}
              </MahasiswaCell>
            );
          })}
        <Text textColor="black" fontSize="2xl" fontWeight="semibold" my="6">
          Berita Terbaru
        </Text>
        {daftarBerita !== null &&
          daftarBerita.map((item) => {
            return (
              <Fragment key={item.id}>
                {
                  <MahasiswaCell
                    color="teal.700"
                    detail={dots(530, item.detail)}
                    logo={item.thumbnail}
                  >
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/berita/${item.id}`);
                      }}
                    >
                      {item.judul}
                    </Link>
                  </MahasiswaCell>
                }
              </Fragment>
            );
          })}
      </Box>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarOrganisasi = await organisasi();
  const daftarBerita = await berita();

  return {
    props: { daftarOrganisasi, daftarBerita },
    revalidate: 15,
  };
};

export default DaftarKemahasiswaan;

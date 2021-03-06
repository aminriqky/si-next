import React from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  Text,
  Box,
  AspectRatio,
  LinkOverlay,
  LinkBox,
  Grid,
  useMediaQuery,
  Img,
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { tahun } from "../api/tahun";
import type { tahun as tahunList } from "../../public/types";

type GaleriCellProps = {
  tahun: number;
  judul: string | number;
};

function GaleriCell(props: GaleriCellProps) {
  const router = useRouter();
  return (
    <LinkBox>
      <AspectRatio overflow="hidden" borderRadius="5" maxW="320px" h="200px">
        <LinkOverlay
          color="teal.800"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/galeri/${props.tahun}`);
          }}
        >
          <Text
            letterSpacing="widest"
            fontWeight="semibold"
            zIndex={999}
            fontSize="xl"
            pos="absolute"
          >
            {props.judul}
          </Text>
          <AspectRatio
            h="100%"
            w="100%"
            sx={{ filter: "blur(0.75px) grayscale(25%) opacity(50%)" }}
            _hover={{ filter: "blur(0.75px) grayscale(25%) opacity(75%)" }}
          >
            <Img src="/yt.png" objectFit="fill" />
          </AspectRatio>
        </LinkOverlay>
      </AspectRatio>
    </LinkBox>
  );
}

interface daftarGaleri {
  daftarTahun: Array<tahunList>;
}

const DaftarGaleri: NextPage<daftarGaleri> = ({ daftarTahun }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

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
          Galeri
        </Text>
        {isLargerThan1280 ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
            {daftarTahun !== null &&
              daftarTahun.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <GaleriCell tahun={item.tahun} judul={item.tahun} />
                  </React.Fragment>
                );
              })}
          </Grid>
        ) : (
          <Grid gap={5}>
            {daftarTahun !== null &&
              daftarTahun.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <GaleriCell tahun={item.tahun} judul={item.tahun} />
                  </React.Fragment>
                );
              })}
          </Grid>
        )}
      </Box>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarTahun = await tahun();

  return {
    props: { daftarTahun },
    revalidate: 15,
  };
};
export default DaftarGaleri;

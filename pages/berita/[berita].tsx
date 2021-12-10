import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import {
  Text, Box, Icon, Flex, Img
} from "@chakra-ui/react";
import Interweave, { match, MatcherInterface } from 'interweave';
import { useRouter } from "next/router";
import { FcClock } from "@react-icons/all-files/fc/FcClock";
import { FcOvertime } from "@react-icons/all-files/fc/FcOvertime";
import ExNav from '../../public/exnav';
import Menu from '../../public/menu';
import dayjs from 'dayjs';
import { berita } from '../api/berita';
import { server } from "../../config";
import type { berita as beritaList } from '../../public/types';

interface daftarBerita {
  daftarBerita: Array<beritaList>
}

const Berita: NextPage<daftarBerita> = ({ daftarBerita }) => {
  const router = useRouter();
  const { berita } = router.query;

  return (
    <Menu>
      <Box bg="white" opacity="0.9" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        {
          daftarBerita !== null && daftarBerita.map((item) => {
            if (item.id.toString() === berita) {
              return (
                <Box key={item.id}>
                  <Text fontSize={{ base: 18, xl: 28 }} pb="10px" fontWeight="semibold">
                    {item.judul}
                  </Text>
                  <Flex flexDirection="row" mb="1%" flexWrap="wrap">
                    <Text color="black" fontWeight="medium">
                      Tanggal:
                    </Text>
                    &ensp;
                    <Icon as={FcOvertime} w="25px" h="auto" />
                    &ensp;
                    <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                      {dayjs(item.tanggal).format('DD/MM/YYYY')}
                    </Text>
                    &ensp;
                    <Icon as={FcClock} w="25px" h="auto" />
                    &ensp;
                    <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                      {dayjs(item.tanggal).format('HH:mm')} WIB
                    </Text>
                    <Text ml={{ xl: "3%" }} color="black" fontWeight="medium" pt="2px">
                      Penulis:
                    </Text>
                    &ensp;
                    <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                      {item.penulis}
                    </Text>
                  </Flex>
                  {
                    item.thumbnail !== null &&
                    <Img src={`${server}/storage/${item.thumbnail}`}
                      layout="fill" objectFit="fill"
                    />
                  }
                  <Box mt="10px" fontSize={{ base: "xs", lg: "md" }}>
                    <Interweave content={item.detail} />
                  </Box>
                </Box>
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
  const daftarBerita = await berita()

  return {
    props: { daftarBerita }
  };
}

export default Berita;
import Head from "next/head";
import {
  Text, Box, Icon, Flex, Img
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FcClock, FcOvertime } from "react-icons/fc"
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import dayjs from 'dayjs';
import { artikel } from '../api/artikel';
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

export default function Artikel({ daftarArtikel }) {
  const router = useRouter();
  const { artikel } = router.query;

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<BgImg />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="6%" p="4%">
          {
            daftarArtikel !== null && daftarArtikel.map((item) => {
              if (item.id == artikel) {
                return (
                  <Box key={item.id}>
                    <Text fontSize="28" pb="10px" fontWeight="semibold">
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
                        {dayjs(item.updated_at).format('DD/MM/YYYY')}
                      </Text>
                      &ensp;
                      <Icon as={FcClock} w="25px" h="auto" />
                      &ensp;
                      <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                        {dayjs(item.updated_at).format('HH:mm')} WIB
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
                      item.thumbnail != null &&
                      <Img src={`https://webprodi.sashi.id/storage/${item.thumbnail}`}
                        layout="fill"
                        objectFit="fill"
                      />
                    }
                    <Box mt="10px">
                      <div dangerouslySetInnerHTML={{ __html: item.detail }} />
                    </Box>
                  </Box>
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
  const daftarArtikel = await artikel()

  return {
    props: { daftarArtikel }
  };
}

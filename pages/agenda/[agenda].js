import Head from "next/head";
import {
  Text, Box, Icon, Flex, Divider
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FcClock, FcOvertime } from "react-icons/fc"
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import dayjs from 'dayjs';
import { agenda } from '../api/agenda'
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

export default function Agenda({ daftarAgenda }) {
  const router = useRouter();
  const { agenda } = router.query;

  return (
    <>
      <Head>
        <title>Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang</title>
      </Head>
      <Menu slideShow={<BgImg />}>
        <Box bg="white" zIndex="999" textColor="black" mx="8%" my="6%" p="4%">
          {
            daftarAgenda !== null && daftarAgenda.map((item) => {
              if (item.id == agenda) {
                return (
                  <Box key={item.id}>
                    <Text fontSize="28" pb="3%" fontWeight="semibold">
                      {item.judul}
                    </Text>
                    <Flex flexDirection="column" bg="gray.300" p="2%" mb="2%">
                      <Flex flexDirection="row">
                        <Text color="black" fontWeight="semibold" pb="2%">
                          Jadwal Agenda Kegiatan :
                        </Text>
                      </Flex>
                      <Flex flexDirection="row" flex="1" bg="whiteAlpha.900" p="2%">
                        <Text color="black" fontWeight="medium">
                          Tanggal:
                        </Text>
                        &ensp;
                        <Icon as={FcOvertime} w="25px" h="auto" />
                        &ensp;
                        <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                          {dayjs(item.waktu).format('DD/MM/YYYY')}
                        </Text>
                        &ensp;
                        <Icon as={FcClock} w="25px" h="auto" />
                        &ensp;
                        <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                          {dayjs(item.waktu).format('HH:mm')} WIB
                        </Text>
                      </Flex>
                      <Divider />
                      <Flex flexDirection="row" flex="1" bg="whiteAlpha.900" p="2%">
                        <Text color="black" fontWeight="medium">
                          Tempat:
                        </Text>
                        &ensp;
                        <Text color="black" fontSize={{ base: "sm", xl: "md" }} pt="2px">
                          {item.tempat}
                        </Text>
                      </Flex>
                    </Flex>
                    <div dangerouslySetInnerHTML={{ __html: item.detail_kegiatan }} />
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
  const daftarAgenda = await agenda()

  return {
    props: { daftarAgenda }
  };
}

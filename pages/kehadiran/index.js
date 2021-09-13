import {
  Text, Box, Flex, Skeleton, Divider
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import { kehadiran } from "../api/kehadiran";
import { server } from "../../config";
import KehadiranCell from "../../public/dynamic/KehadiranCell";
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

export default function DaftarKehadiran({ daftarKehadiran }) {
  return (
    <Menu slideShow={<BgImg />}>
      <Box bg="white" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text fontSize="28" pb="2%" fontWeight="semibold">
          Daftar Kehadiran
        </Text>
        <Flex flexDir="row" flexWrap="wrap">
          {
            daftarKehadiran !== null && daftarKehadiran.map((item) => {
              return (
                <>
                  <KehadiranCell
                    key={item.id}
                    gambar={`${server}/storage/${item.avatar}`}
                    judul={item.name}
                    deskripsi={item.jabatan}
                    hadir={item.hadir}
                    dylink={`/kehadiran/${item.id}`}
                  />
                  &emsp;
                </>
              )
            })
          }
        </Flex>
      </Box>
      <ExNav />
    </Menu>
  );
}

export async function getStaticProps() {
  const daftarKehadiran = await kehadiran()

  return {
    props: { daftarKehadiran },
    revalidate: 30
  };
}

import {
  Text, Box, Flex
} from "@chakra-ui/react";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import { kehadiran } from "../api/kehadiran";
import { server } from "../../config";
import KehadiranCell from "../../public/dynamic/KehadiranCell";

export default function DaftarKehadiran({ daftarKehadiran }) {
  return (
    <Menu>
      <Box bg="white" opacity="0.9" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text fontSize="28" pb="2%" fontWeight="semibold">
          Daftar Kehadiran
        </Text>
        <Flex flexDir="row" flexWrap="wrap" justifyContent="center">
          {
            daftarKehadiran !== null && daftarKehadiran.map((item) => {
              return (
                <KehadiranCell
                  key={item.id}
                  gambar={`${server}/storage/${item.avatar}`}
                  judul={item.name}
                  deskripsi={item.jabatan}
                  hadir={item.hadir}
                  dylink={`/kehadiran/${item.id}`}
                />
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

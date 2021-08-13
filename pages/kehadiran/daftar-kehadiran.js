import {
  Text, Box, Flex, Skeleton, Divider
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import { kehadiran } from "../api/kehadiran";
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

const KehadiranCell = dynamic(
  () => import('../../public/dynamic/KehadiranCell'),
  {
    loading: () =>
      <>
        <Flex flexDir="row">
          <Skeleton borderRadius="full" boxSize="75px" mr={{ base: "25px", xl: "50px" }} />
          <Skeleton height="50px" width={{ base: "250px", xl: "450px" }} mt="15px" />
        </Flex>
        <Divider my="10px" />
        <Flex flexDir="row">
          <Skeleton borderRadius="full" boxSize="75px" mr={{ base: "25px", xl: "50px" }} />
          <Skeleton height="50px" width={{ base: "250px", xl: "450px" }} mt="15px" />
        </Flex>
      </>
  }
)

export default function DaftarKehadiran({ daftarKehadiran }) {
  return (
    <Menu slideShow={<BgImg />}>
      <Box bg="white" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text fontSize="28" pb="2%" fontWeight="semibold">
          Daftar Kehadiran
        </Text>
        {
          daftarKehadiran !== null && daftarKehadiran.map((item) => {
            return (
              <>
                <KehadiranCell
                  dykey={item.id}
                  gambar={`https://webprodi.sashi.id/storage/${item.avatar}`}
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

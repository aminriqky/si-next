import {
  Text, Box, Flex, Img, Grid
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import { kehadiran } from "../api/kehadiran";
import { server } from "../../config";
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

function KehadiranCell(props) {
  return (
    <Flex key={props.dykey} flexWrap="wrap">
      <Img
        boxSize={{ base: "fit-content", xl: "300px" }}
        src={props.gambar}
        width="auto"
        alt="Avatar"
        mr={{ xl: "50px" }}
      />
      <Grid dykey={props.key} gap="2" mt={{ base: "5%", xl: "15px" }} mr={{ base: "25px", xl: "115px" }}>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          Nama : {props.name}
        </Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          E-mail : {props.email}
        </Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          NIP : {props.nip}
        </Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          NIDN : {props.nidn}
        </Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          Jabatan : {props.jabatan}
        </Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          Bidang : {props.bidang}
        </Text>
        <Flex flexDir="row">
          <Text fontSize={{ base: "sm", xl: "md" }}>
            Kehadiran :&thinsp;
          </Text>
          {
            props.hadir === 1 &&
            <Text color="teal" fontWeight="medium">
              HADIR
            </Text>
          }
          {
            props.hadir !== 1 &&
            <Text color="crimson" fontWeight="medium">
              TIDAK ADA
            </Text>
          }
        </Flex>
      </Grid>
    </Flex>
  )
}

export default function Kehadiran({ daftarKehadiran }) {
  const router = useRouter();
  const { kehadiran } = router.query;

  return (
    <Menu slideShow={<BgImg />}>
      <Box bg="white" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        {
          daftarKehadiran !== null && daftarKehadiran.map((item) => {
            if (item.id == kehadiran) {
              return (
                <KehadiranCell dykey={item.id}
                  gambar={`${server}/storage/${item.avatar}`}
                  name={item.name}
                  email={item.email}
                  nip={item.nip}
                  nidn={item.nidn}
                  jabatan={item.jabatan}
                  bidang={item.bidang}
                  hadir={item.hadir}
                />
              )
            }
          })
        }
      </Box>
      <ExNav />
    </Menu>
  );
}

export async function getServerSideProps() {
  const daftarKehadiran = await kehadiran()

  return {
    props: { daftarKehadiran }
  };
}

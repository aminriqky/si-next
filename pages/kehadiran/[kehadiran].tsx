import type { NextPage, GetServerSideProps } from "next";
import { Text, Box, Flex, Img, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { kehadiran } from "../api/kehadiran";
import { server } from "../../config";
import type { kehadiran as kehadiranList } from "../../public/types";
import { replace } from "../../public/func";

interface KehadiranCellProps {
  key: number;
  name: string;
  email: string;
  nip: string;
  nidn: string;
  jabatan: string;
  bidang: string;
  hadir: number;
  avatar: string;
}

function KehadiranCell(props: KehadiranCellProps) {
  return (
    <Flex key={props.key} flexWrap="wrap">
      <Img
        boxSize={{ base: "fit-content", xl: "300px" }}
        src={props.avatar}
        width="auto"
        alt="Avatar"
        mr={{ xl: "50px" }}
      />
      <Grid
        gap="2"
        mt={{ base: "5%", xl: "15px" }}
        mr={{ base: "25px", xl: "115px" }}
      >
        <Text fontSize={{ base: "sm", xl: "md" }}>Nama : {props.name}</Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>E-mail : {props.email}</Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>NIP : {props.nip}</Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>NIDN : {props.nidn}</Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          Jabatan : {props.jabatan}
        </Text>
        <Text fontSize={{ base: "sm", xl: "md" }}>Bidang : {props.bidang}</Text>
        <Flex flexDir="row">
          <Text fontSize={{ base: "sm", xl: "md" }}>Kehadiran :&thinsp;</Text>
          {props.hadir === 1 && (
            <Text color="teal" fontWeight="medium">
              HADIR
            </Text>
          )}
          {props.hadir !== 1 && (
            <Text color="crimson" fontWeight="medium">
              TIDAK ADA
            </Text>
          )}
        </Flex>
      </Grid>
    </Flex>
  );
}

interface daftarKehadiran {
  daftarKehadiran: Array<kehadiranList>;
}

const Kehadiran: NextPage<daftarKehadiran> = ({ daftarKehadiran }) => {
  const router = useRouter();
  const { kehadiran } = router.query;

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
        {daftarKehadiran !== null &&
          daftarKehadiran.map((item) => {
            if (replace(item.name).toString() === kehadiran) {
              return (
                <KehadiranCell
                  key={item.id}
                  avatar={`${server}/storage/${item.avatar}`}
                  name={item.name}
                  email={item.email}
                  nip={item.nip}
                  nidn={item.nidn}
                  jabatan={item.jabatan}
                  bidang={item.bidang}
                  hadir={item.hadir}
                />
              );
            }
          })}
      </Box>
      <ExNav />
    </Menu>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const daftarKehadiran = await kehadiran();

  return {
    props: { daftarKehadiran },
  };
};

export default Kehadiran;

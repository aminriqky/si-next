import {
  Text, Box, Flex, Link
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import dayjs from 'dayjs';
import { berita } from "../api/berita";

function BeritaCell(props) {
  const router = useRouter();

  return (
    <Flex key={props.dykey} flexDirection="row" flex="1" borderBottom="solid 1px gray">
      <Box minW="60px" height="60px" m={{ base: "3vw", xl: "1.4vw" }} textAlign="center" border="2px">
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">{props.hari}</Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize="md">
          <Link fontWeight="semibold" onClick={(e) => {
            e.preventDefault()
            router.push(`${props.dylink}`)
          }}>
            {props.judul}
          </Link>
        </Text>
        <Text fontSize="sm">{props.penulis}</Text>
      </Box>
    </Flex>
  )
}

export default function DaftarBerita({ daftarBerita }) {
  return (
    <Menu>
      <Box bg="white" opacity="0.9" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text fontSize="28" pb="2%" fontWeight="semibold">
          Daftar Berita
        </Text>
        {
          daftarBerita !== null && daftarBerita.map((item) => {
            return (
              <BeritaCell
                dykey={item.id}
                hari={dayjs(item.waktu).locale('id').format('ddd').toUpperCase()}
                hariBulan={dayjs(item.waktu).format('DD/MM')}
                judul={item.judul}
                penulis={item.penulis}
                dylink={`/berita/${item.id}`}
              />
            )
          })
        }
      </Box>
      <ExNav />
    </Menu>
  );
}

export async function getStaticProps() {
  const daftarBerita = await berita()

  return {
    props: { daftarBerita },
    revalidate: 30
  };
}

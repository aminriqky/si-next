import { Fragment } from "react";
import { useRouter } from 'next/router';
import {
  Text, Box, Img, Flex, Link
} from "@chakra-ui/react";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import { organisasi } from '../api/organisasi';
import { berita } from '../api/berita';
import { server } from "../../config";

function MahasiswaCell(props) {
  return (
    <Flex key={props.id} flexDir={{ base: "column", xl: "row" }} mb="2%">
      <Img src={`${server}/storage/${props.logo}`}
        overflow="hidden" borderRadius="5"
        w="1280px" h="200px" objectFit="contain"
      />
      <Flex ml={{ base: 0, xl: 32 }} flexDir="column" flexWrap="wrap">
        <Text color={props.color} fontWeight="semibold">
          {props.children}
        </Text>
        &thinsp;
        <Text color="black" fontWeight="light" fontSize={{ base: "xs", lg: "md" }}>
          <div dangerouslySetInnerHTML={{ __html: props.detail }} />
        </Text>
      </Flex>
    </Flex>
  );
}

export default function DaftarKemahasiswaan({ daftarOrganisasi, daftarBerita }) {
  const router = useRouter();

  function dots(num, str) {
    if (str !== null & str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str
    }
  }

  return (
    <Menu>
      <Box bg="white" opacity="0.9" zIndex="999" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="6">
          Organisasi Mahasiswa
        </Text>
        {
          daftarOrganisasi !== null && daftarOrganisasi.map((item) => {
            return (
              <MahasiswaCell color="black" id={item.id} detail={item.detail} logo={item.logo} >
                {item.judul}
              </MahasiswaCell>
            )
          })
        }
        <Text textColor="black" fontSize="2xl" fontWeight="semibold" my="6">
          Prestasi Mahasiswa
        </Text>
        {
          daftarBerita !== null && daftarBerita.map((item) => {
            const tag = JSON.parse(item.tag)
            return (
              <Fragment>
                {
                  tag.prestasi &&
                  <MahasiswaCell color="teal.700" id={item.id} detail={dots(530, item.detail)} logo={item.thumbnail}>
                    <Link onClick={(e) => {
                      e.preventDefault()
                      router.push(`/berita/${item.id}`)
                    }}>
                      {item.judul}
                    </Link>
                  </MahasiswaCell>
                }
              </Fragment>
            )
          })
        }
      </Box>
      <ExNav />
    </Menu>
  );
}

export async function getStaticProps() {
  const daftarOrganisasi = await organisasi()
  const daftarBerita = await berita()

  return {
    props: { daftarOrganisasi, daftarBerita },
    revalidate: 30
  };
}

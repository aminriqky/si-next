import { useRouter } from 'next/router'
import {
  Text, Box, Flex, Link, Icon
} from "@chakra-ui/react";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import { download } from '../api/download';
import { FaBookmark, FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function DaftarDokumen({ daftarDokumen }) {
  const router = useRouter();

  return (
    <Menu>
      <Box bg="white" opacity="0.9" zIndex="999" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text textColor="black" fontSize="2xl" fontWeight="semibold">
          Dokumen
        </Text>
        <Flex bg="teal.500" color="teal.500" border="1px" borderTopRadius="5px" mt="2%">
          <Icon ml="2%" color="white" as={FaBookmark} w="20px" h="auto" mr="20px" />
          <Text textColor="white" my="10px" fontSize="xl" fontWeight="thin">
            Nama Berkas
          </Text>
        </Flex>
        {
          daftarDokumen !== null && daftarDokumen.map((item) => {
            return (
              <Link key={item.id} onClick={(e) => {
                e.preventDefault()
                router.push(`/dokumen/${item.id}`)
              }}>
                <Flex _hover={{ bg: "teal.50" }} py="5px" color="teal.500" borderX="1px" borderBottom="1px">
                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                  <Text key={item.id} textColor="black" my="2.5px" fontWeight="thin">
                    {item.nama_berkas}
                  </Text>
                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                </Flex>
              </Link>
            )
          })
        }
        <Flex h="5px" bg="teal.500" borderBottomRadius="5px" />
      </Box>
      <ExNav />
    </Menu>
  );
}

export async function getStaticProps() {
  const daftarDokumen = await download()

  return {
    props: { daftarDokumen },
    revalidate: 30
  };
}

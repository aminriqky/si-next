import type { NextPage, GetServerSideProps } from "next";
import { Text, Box, Icon, Flex, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FcClock } from "@react-icons/all-files/fc/FcClock";
import { FcOvertime } from "@react-icons/all-files/fc/FcOvertime";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { replace } from "../../public/func";
import dayjs from "dayjs";
import { artikel } from "../api/artikel";
import { server } from "../../config";
import type { artikel as artikelList } from "../../public/types";

interface daftarArtikel {
  daftarArtikel: Array<artikelList>;
}

const Artikel: NextPage<daftarArtikel> = ({ daftarArtikel }) => {
  const router = useRouter();
  const { artikel } = router.query;

  return (
    <Menu>
      <Box
        bg="white"
        opacity="0.9"
        zIndex="999"
        mx="8%"
        my={{ base: "12%", xl: "100px" }}
        p="4%"
      >
        {daftarArtikel !== null &&
          daftarArtikel.map((item) => {
            if (replace(item.judul).toString() === artikel) {
              return (
                <Box key={item.id}>
                  <Text
                    fontSize={{ base: 18, xl: 28 }}
                    pb="10px"
                    fontWeight="semibold"
                  >
                    {item.judul}
                  </Text>
                  <Flex flexDirection="row" mb="1%" flexWrap="wrap">
                    <Text color="black" fontWeight="medium">
                      Tanggal:
                    </Text>
                    &ensp;
                    <Icon as={FcOvertime} w="25px" h="auto" />
                    &ensp;
                    <Text
                      color="black"
                      fontSize={{ base: "sm", xl: "md" }}
                      pt="2px"
                    >
                      {dayjs(item.updated_at).format("DD/MM/YYYY")}
                    </Text>
                    &ensp;
                    <Icon as={FcClock} w="25px" h="auto" />
                    &ensp;
                    <Text
                      color="black"
                      fontSize={{ base: "sm", xl: "md" }}
                      pt="2px"
                    >
                      {dayjs(item.updated_at).format("HH:mm")} WIB
                    </Text>
                    <Text
                      ml={{ xl: "3%" }}
                      color="black"
                      fontWeight="medium"
                      pt="2px"
                    >
                      Penulis:
                    </Text>
                    &ensp;
                    <Text
                      color="black"
                      fontSize={{ base: "sm", xl: "md" }}
                      pt="2px"
                    >
                      {item.penulis}
                    </Text>
                  </Flex>
                  {item.thumbnail !== null && (
                    <Img
                      src={`${server}/storage/${item.thumbnail}`}
                      objectFit="fill"
                    />
                  )}
                  <Box mt="10px" fontSize={{ base: "xs", lg: "md" }}>
                    <div dangerouslySetInnerHTML={{ __html: item.detail }} />
                  </Box>
                </Box>
              );
            }
          })}
      </Box>
      <ExNav />
    </Menu>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const daftarArtikel = await artikel();

  return {
    props: { daftarArtikel },
  };
};

export default Artikel;

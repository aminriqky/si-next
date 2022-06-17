import type { NextPage, GetServerSideProps } from "next";
import { Box, Icon, Flex, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FcClock } from "@react-icons/all-files/fc/FcClock";
import { FcOvertime } from "@react-icons/all-files/fc/FcOvertime";
import Interweave from "interweave";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import dayjs from "dayjs";
import { agenda } from "../api/agenda";
import type { agenda as agendaList } from "../../public/types";

interface daftarAgenda {
  daftarAgenda: Array<agendaList>;
}

const Agenda: NextPage<daftarAgenda> = ({ daftarAgenda }) => {
  const router = useRouter();
  const { agenda } = router.query;

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
        {daftarAgenda !== null &&
          daftarAgenda.map((item) => {
            if (item.id.toString() === agenda) {
              return (
                <Box key={item.id}>
                  <Text
                    fontSize={{ base: "20", xl: "28" }}
                    pb="3%"
                    fontWeight="semibold"
                  >
                    {item.judul}
                  </Text>
                  <Flex flexDirection="column" bg="gray.300" p="2%" mb="2%">
                    <Flex flexDirection="row">
                      <Text color="black" fontWeight="semibold" pb="2%">
                        Jadwal Agenda Kegiatan :
                      </Text>
                    </Flex>
                    <Flex
                      flexDirection="row"
                      flex="1"
                      bg="whiteAlpha.900"
                      p="2%"
                    >
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
                        {dayjs(item.waktu).format("DD/MM/YYYY")}
                      </Text>
                      &ensp;
                      <Icon as={FcClock} w="25px" h="auto" />
                      &ensp;
                      <Text
                        color="black"
                        fontSize={{ base: "sm", xl: "md" }}
                        pt="2px"
                      >
                        {dayjs(item.waktu).format("HH:mm")} WIB
                      </Text>
                    </Flex>
                    <Divider />
                    <Flex
                      flexDirection="row"
                      flex="1"
                      bg="whiteAlpha.900"
                      p="2%"
                    >
                      <Text color="black" fontWeight="medium">
                        Tempat:
                      </Text>
                      &ensp;
                      <Text
                        color="black"
                        fontSize={{ base: "sm", xl: "md" }}
                        pt="2px"
                      >
                        {item.tempat}
                      </Text>
                    </Flex>
                  </Flex>
                  <Box fontSize={{ base: "xs", lg: "md" }}>
                    <Interweave content={item.detail_kegiatan} />
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
  const daftarAgenda = await agenda();

  return {
    props: { daftarAgenda },
  };
};

export default Agenda;

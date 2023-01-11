import type { NextPage, GetStaticProps } from "next";
import { Text, Box, Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { agenda } from "../api/agenda";
import type { agenda as agendaList } from "../../public/types";
import type { AgendaCellProps } from "../../public/types";

interface daftarAgenda {
  daftarAgenda: Array<agendaList>;
}

function AgendaCell(props: AgendaCellProps) {
  const router = useRouter();

  return (
    <Flex flexDirection="row" flex="1" borderBottom="solid 1px gray">
      <Box
        minW="60px"
        height="60px"
        m={{ base: "3vw", xl: "1.4vw" }}
        textAlign="center"
        border="2px"
      >
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">
          {props.hari}
        </Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize="md">
          <Link
            fontWeight="semibold"
            onClick={(e) => {
              e.preventDefault();
              router.push(`${props.dylink}`);
            }}
          >
            {props.judul}
          </Link>
        </Text>
        <Text fontSize="sm">{props.tempat}</Text>
      </Box>
    </Flex>
  );
}

const DaftarAgenda: NextPage<daftarAgenda> = ({ daftarAgenda }) => {
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
        <Text fontSize="28" pb="2%" fontWeight="semibold">
          Daftar Agenda
        </Text>
        {daftarAgenda !== null &&
          daftarAgenda.map((item) => {
            return (
              <AgendaCell
                key={item.id}
                hari={dayjs(item.waktu)
                  .locale("id")
                  .format("ddd")
                  .toUpperCase()}
                hariBulan={dayjs(item.waktu).format("DD/MM")}
                judul={item.judul}
                tempat={item.tempat}
                dylink={`/agenda/${item.id}`}
              />
            );
          })}
      </Box>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarAgenda = await agenda();

  return {
    props: { daftarAgenda },
    revalidate: 15,
  };
};

export default DaftarAgenda;

import type { NextPage, GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Flex,
  Link,
  Button,
  Tab,
  BreadcrumbItem,
  BreadcrumbLink,
  TabPanel,
  Breadcrumb,
  Heading
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import PageTab from "../../public/pagetab";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { haki } from "../api/haki";
import { server } from "../../config";
import type { haki as hakiList } from "../../public/types";
import { replace } from "../../public/func";

interface DokumenCellProps {
  key: number;
  link: number;
  hari: string;
  hariBulan: string;
  judul: string;
  tanggal: string;
}

function DokumenCell(props: DokumenCellProps) {
  const [saveFile, setSaveFile] = useState("");

  useEffect(() => {
    if (saveFile === "") {
      linkUnduh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function linkUnduh() {
    const unduh = await fetch(`${server}/api/hakifile/${props.link}`);
    const jsonData = await unduh.json();
    if (jsonData.length !== 0) {
      setSaveFile(`${server}/storage/${jsonData[0].download_link}`);
    } else {
      setSaveFile(jsonData);
    }
  }

  return (
    <React.Fragment>
      <Flex flexDirection="row" flex="1">
        <Box
          minW="60px"
          height="60px"
          m={{ base: "3vw", xl: "1.4vw" }}
          textAlign="center"
          border="1px"
        >
          <Text mt="5px" alignSelf="center" fontWeight="semibold" fontSize="lg">
            {props.hari}
          </Text>
          <Text fontSize="xs">{props.hariBulan}</Text>
        </Box>
        <Box alignSelf="center" m={{ base: "3vw", xl: "1.41vw" }}>
          <Text fontSize={{ base: "sm", xl: "md" }} fontWeight="semibold">
            {props.judul}
          </Text>
          <Text fontSize="sm">{props.tanggal}</Text>
        </Box>
      </Flex>
      {saveFile.length !== 0 && (
        <Flex
          flexDirection="row"
          flex="1"
          bg="whiteAlpha.900"
          pl="2%"
          mb={{ base: "3vw", xl: "1.41vw" }}
        >
          <Text color="teal" pt="2.5px">
            Lampiran File :
          </Text>
          &ensp;
          <Link _hover={{ textTransform: "none" }} href={saveFile} download>
            <Button colorScheme="teal" size="sm">
              Unduh
            </Button>
          </Link>
        </Flex>
      )}
    </React.Fragment>
  );
}

interface daftarHaki {
  daftarHaki: Array<hakiList>;
}

const Haki: NextPage<daftarHaki> = ({ daftarHaki }) => {
  const router = useRouter();

  return (
    <Menu>
      <PageTab judul="Akademik"
        breadcrumb={
          <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
            <Heading>Akademik</Heading>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/akademik'>Akademik</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        tab={
          <React.Fragment>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">HaKI</Tab>
          </React.Fragment>
        }>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
            {daftarHaki !== null &&
              daftarHaki.map((item) => {
                if (replace(item.name).toString()) {
                  return (
                    <DokumenCell
                      key={item.id}
                      hari={dayjs(item.updated_at)
                        .locale("id")
                        .format("ddd")
                        .toUpperCase()}
                      hariBulan={dayjs(item.updated_at).format("DD/MM")}
                      judul={item.name}
                      tanggal={dayjs(item.updated_at)
                        .locale("id")
                        .format("dddd, DD MMMM YYYY")}
                      link={item.id}
                    />
                  );
                }
              })}
          </Box>
        </TabPanel>
      </PageTab >
      <ExNav />
    </Menu >
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const daftarHaki = await haki();

  return {
    props: { daftarHaki },
  };
};

export default Haki;

import type {GetServerSideProps, NextPage} from "next";
import React, {useEffect, useState} from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Link,
  Tab,
  TabPanel,
  Text
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import dayjs from "dayjs";
import "dayjs/locale/id";
import {download as data} from "../api/download";
import {server} from "../../config";
import type {download as download} from "../../public/types";
import {replace} from "../../public/func";
import dynamic from "next/dynamic";

const PageTab = dynamic(
  () => import('../../public/pagetab'),
  {ssr: false}
)

interface DownloadCellProps {
  key: number;
  link: number;
  hari: string;
  hariBulan: string;
  judul: string;
  tanggal: string;
  detail: string;
}

function DownloadCell(props: DownloadCellProps) {
  const [saveFile, setSaveFile] = useState("");

  useEffect(() => {
    if (saveFile === "") {
      linkUnduh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function linkUnduh() {
    const unduh = await fetch(`${server}/api/downloadfile/${props.link}`);
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
          m={{base: "3vw", xl: "1.4vw"}}
          textAlign="center"
          border="1px"
        >
          <Text mt="5px" alignSelf="center" fontWeight="semibold" fontSize="lg">
            {props.hari}
          </Text>
          <Text fontSize="xs">{props.hariBulan}</Text>
        </Box>
        <Box alignSelf="center" m={{base: "3vw", xl: "1.41vw"}}>
          <Text fontSize={{base: "sm", xl: "md"}} fontWeight="semibold">
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
          mb={{base: "3vw", xl: "1.41vw"}}
        >
          <Text color="teal" pt="2.5px">
            Lampiran File :
          </Text>
          &ensp;
          <Link _hover={{textTransform: "none"}} href={saveFile} download>
            <Button colorScheme="teal" size="sm">
              Unduh
            </Button>
          </Link>
        </Flex>
      )}
      <Text pl="2%" textColor="black" fontSize={{base: "xs", lg: "md"}}>
        {props.detail}
      </Text>
    </React.Fragment>
  );
}

interface daftarDownload {
  daftarDownload: Array<download>;
}

const Download: NextPage<daftarDownload> = ({daftarDownload}) => {
  const router = useRouter();
  const {download} = router.query;

  return (
    <Menu>
      <PageTab judul="Download"
               breadcrumb={
                 <Breadcrumb my={{base: "5%", xl: "80px"}} mx="6%" textColor="white" pos="absolute">
                   <Heading>Download</Heading>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
                   </BreadcrumbItem>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/pages/download'>Download</BreadcrumbLink>
                   </BreadcrumbItem>
                 </Breadcrumb>
               }
               tab={
                 <React.Fragment>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Download</Tab>
                 </React.Fragment>
               }>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            {daftarDownload !== null &&
              daftarDownload.map((item) => {
                if (replace(item.nama_berkas).toString() === download) {
                  return (
                    <DownloadCell
                      key={item.id}
                      hari={dayjs(item.updated_at).locale("id").format("ddd").toUpperCase()}
                      hariBulan={dayjs(item.updated_at).format("DD/MM")}
                      judul={item.nama_berkas}
                      tanggal={dayjs(item.updated_at).locale("id").format("dddd, DD MMMM YYYY")}
                      detail={item.keterangan}
                      link={item.id}
                    />
                  );
                }
              })}
          </Box>
        </TabPanel>
      </PageTab>
      <ExNav/>
    </Menu>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const daftarDownload = await data();

  return {
    props: {daftarDownload},
  };
};

export default Download;

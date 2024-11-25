import type {GetStaticProps, NextPage} from "next";
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
import DataTable from "../public/datatable";
import ExNav from "../public/exnav";
import Menu from "../public/menu";
import {profil} from "./api/profil";
import {penelitian} from "./api/penelitian";
import {haki} from "./api/haki";
import type {haki as hakiList, penelitian as penelitianList, profil as profilList} from "../public/types";
import dynamic from "next/dynamic";
import {server} from "../config";

const PageTab = dynamic(
  () => import('../public/pagetab'),
  {ssr: false}
)

interface penelitian {
  daftarProfil: Array<profilList>;
  daftarHaki: Array<hakiList>;
  daftarPenelitian: Array<penelitianList>;
}

interface DokumenCellProps {
  key: number;
  link: number;
  tahun: number;
  judul: string;
  nama: string;
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
          m={{base: "3vw", xl: "1.4vw"}}
          textAlign="center"
          border="1px"
        >
          <Text mt="15px" alignSelf="center" fontWeight="semibold" fontSize="lg">
            {props.tahun}
          </Text>
        </Box>
        <Box alignSelf="center" m={{base: "3vw", xl: "1.41vw"}}>
          <Text fontSize={{base: "sm", xl: "md"}} fontWeight="semibold">
            {props.judul}
          </Text>
          <Text fontSize="sm">{props.nama}</Text>
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
    </React.Fragment>
  );
}

const Penelitian: NextPage<penelitian> = ({daftarProfil, daftarHaki, daftarPenelitian}) => {
  const reorderKeys = (obj) => {
    const {name, ...rest} = obj;
    return {name, ...rest};
  };

  const reorderedData = daftarPenelitian.map(reorderKeys);

  const kolom = reorderedData.length > 0 ? Object.keys(reorderedData[0]) : [];

  const hiddenColumns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    {
      name: "dosen_id",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      options: {
        customHeadLabelRender: () => {
          return <p>Nama Dosen</p>; // Custom header
        },
      },
    },
    {
      name: "nama_penelitian",
      options: {
        customHeadLabelRender: () => {
          return <p>Judul Penelitian</p>; // Custom header
        },
      },
    },
    {
      name: "jenis_penelitian",
      options: {
        customHeadLabelRender: () => {
          return <p>Luaran</p>; // Custom header
        },
      },
    },
    {
      name: "created_at",
      options: {
        display: false,
      },
    },
    {
      name: "updated_at",
      options: {
        display: false,
      },
    },
    {
      name: "file_penelitian",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => {
          const fileData = JSON.parse(value);
          const {download_link, original_name} = fileData[0];

          return (
            <Button size="xs" onClick={() => window.open(`${server}/storage/${download_link}`, "_blank")}>
              {original_name}
            </Button>
          );
        },
      },
    }
  ];

  const kolomTerformat = kolom.map((col) => {
    const hiddenColumn = hiddenColumns.find((c) => c.name === col);
    return {
      name: col,
      label: col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // Capitalize and remove underscores
      options: hiddenColumn ? hiddenColumn.options : {display: true},
    };
  });

  const peneliti = reorderedData.map((obj) => Object.values(obj));

  return (
    <Menu>
      <PageTab judul="Penelitian"
               breadcrumb={
                 <Breadcrumb my={{base: "5%", xl: "80px"}} mx="6%" textColor="white" pos="absolute">
                   <Heading>Penelitian</Heading>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
                   </BreadcrumbItem>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/penelitian'>Penelitian</BreadcrumbLink>
                   </BreadcrumbItem>
                 </Breadcrumb>
               }
               tab={
                 <React.Fragment>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">Grup Penelitian</Tab>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                     Hasil Penelitian
                   </Tab>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                     HaKI
                   </Tab>
                 </React.Fragment>
               }>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{__html: daftarProfil[9].text}}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{__html: daftarProfil[10].text}}/>
              <DataTable title="Hasil Penelitian" columns={kolomTerformat} data={peneliti}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="6">
              Hak Kekayaan Intelektual
            </Text>
            {daftarHaki !== null &&
              daftarHaki.map((item) => {
                return (
                  <DokumenCell
                    key={item.id}
                    tahun={item.tahun}
                    judul={item.judul}
                    nama={item.name}
                    link={item.id}
                  />
                );
              })}
          </Box>
        </TabPanel>
      </PageTab>
      <ExNav/>
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarProfil = await profil();
  const daftarHaki = await haki();
  const daftarPenelitian = await penelitian();

  return {
    props: {daftarProfil, daftarHaki, daftarPenelitian},
    revalidate: 15,
  };
};

export default Penelitian;

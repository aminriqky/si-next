import type {GetStaticProps, NextPage} from "next";
import React from "react";
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading, Tab, TabPanel} from "@chakra-ui/react";
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

const Penelitian: NextPage<penelitian> = ({daftarProfil, daftarHaki, daftarPenelitian}) => {
  const reorderKeys = (obj) => {
    const {name, ...rest} = obj;
    return {name, ...rest};
  };

  const reorderedData1 = daftarPenelitian.map(reorderKeys);
  const reorderedData2 = daftarHaki.map(reorderKeys);

  const kolom1 = reorderedData1.length > 0 ? Object.keys(reorderedData1[0]) : [];
  const kolom2 = reorderedData2.length > 0 ? Object.keys(reorderedData2[0]) : [];

  const hiddenColumns1 = [
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
          let fileData;

          try {
            fileData = JSON.parse(value); // Attempt to parse the JSON
          } catch {
            fileData = []; // Fallback to an empty array if parsing fails
          }

          if (Array.isArray(fileData) && fileData.length > 0) {
            const {download_link, original_name} = fileData[0];

            return (
              <Button size="xs" onClick={() => window.open(`${server}/storage/${download_link}`, '_blank')}>
                {original_name || 'Kosong'}
              </Button>
            );
          }
        },
      },
    }
  ];

  const hiddenColumns2 = [
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
      name: "file_haki",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => {
          let fileData;

          try {
            fileData = JSON.parse(value); // Attempt to parse the JSON
          } catch {
            fileData = []; // Fallback to an empty array if parsing fails
          }

          if (Array.isArray(fileData) && fileData.length > 0) {
            const {download_link, original_name} = fileData[0];

            return (
              <Button size="xs" onClick={() => window.open(`${server}/storage/${download_link}`, '_blank')}>
                {original_name || 'Kosong'}
              </Button>
            );
          }
        }
      }
    }
  ];

  const kolomTerformat1 = kolom1.map((col) => {
    const hiddenColumn = hiddenColumns1.find((c) => c.name === col);
    return {
      name: col,
      label: col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // Capitalize and remove underscores
      options: hiddenColumn ? hiddenColumn.options : {display: true},
    };
  });

  const kolomTerformat2 = kolom2.map((col) => {
    const hiddenColumn = hiddenColumns2.find((c) => c.name === col);
    return {
      name: col,
      label: col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // Capitalize and remove underscores
      options: hiddenColumn ? hiddenColumn.options : {display: true},
    };
  });

  const peneliti = reorderedData1.map((obj) => Object.values(obj));
  const haki = reorderedData2.map((obj) => Object.values(obj));

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
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                     Grup Penelitian
                   </Tab>
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
              <DataTable title="Hasil Penelitian" columns={kolomTerformat1} data={peneliti}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <div dangerouslySetInnerHTML={{__html: daftarProfil[4].text}}/>
            <DataTable title="Hak Kekayaan Intelektual" columns={kolomTerformat2} data={haki}/>
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

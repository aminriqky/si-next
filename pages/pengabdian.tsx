import type {GetStaticProps, NextPage} from "next";
import React from "react";
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Tab, TabPanel} from "@chakra-ui/react";
import ExNav from "../public/exnav";
import Menu from "../public/menu";
import {profil} from "./api/profil";
import {artikel} from "./api/artikel";
import type {pengabdian as pengabdianList, profil as profilList} from "../public/types";
import dynamic from "next/dynamic";
import DataTable from "../public/datatable";

const PageTab = dynamic(
  () => import('../public/pagetab'),
  {ssr: false}
)

interface pengabdian {
  daftarProfil: Array<profilList>;
  daftarPengabdian: Array<pengabdianList>;
}

const Pengabdian: NextPage<pengabdian> = ({daftarProfil, daftarPengabdian}) => {
  const reorderKeys = (obj) => {
    const {name, ...rest} = obj;
    return {name, ...rest};
  };

  const reorderedData = daftarPengabdian.map(reorderKeys);

  const kolom = reorderedData.length > 0 ? Object.keys(reorderedData[0]) : [];

  const hiddenColumns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    {
      name: "detail",
      options: {
        customHeadLabelRender: () => {
          return <p>Link Publikasi</p>; // Custom header
        },
        customBodyRender: (value) => {
          // Convert HTML to plain text
          const div = document.createElement("div");
          div.innerHTML = value;
          return div.textContent || div.innerText || "";
        },
      },
    },
    {
      name: "penulis",
      options: {
        customHeadLabelRender: () => {
          return <p>Sumber Dana</p>; // Custom header
        },
      },
    },
    {
      name: "tanggal",
      options: {
        customHeadLabelRender: () => {
          return <p>Tahun</p>; // Custom header
        },
      },
    },
    {
      name: "thumbnail",
      options: {
        customHeadLabelRender: () => {
          return <p>Dokumentasi</p>; // Custom header
        },
        customBodyRender: (value) => {
          const baseUrl = "https://adminsi.radenfatah.ac.id/storage/"; // Your base URL
          const imageUrl = `${baseUrl}${value}`; // Full URL
          return <img src={imageUrl} alt="Image"/>;
        },
        setCellProps: () => ({
          style: {width: "1000px"}, // Adjust cell width
        }),
        setCellHeaderProps: () => ({
          style: {width: "200px"}, // Adjust header cell width
        }),
      },
    },
    {
      name: "name",
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
  ];

  const kolomTerformat = kolom.map((col) => {
    const hiddenColumn = hiddenColumns.find((c) => c.name === col);
    return {
      name: col,
      label: col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // Capitalize and remove underscores
      options: hiddenColumn ? hiddenColumn.options : {display: true},
    };
  });

  const pengabdi = reorderedData.map((obj) => Object.values(obj));

  return (
    <Menu>
      <PageTab judul="Pengabdian"
               breadcrumb={
                 <Breadcrumb my={{base: "5%", xl: "80px"}} mx="6%" textColor="white" pos="absolute">
                   <Heading>Pengabdian</Heading>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
                   </BreadcrumbItem>
                   <BreadcrumbItem>
                     <BreadcrumbLink href='/pengabdian'>Pengabdian</BreadcrumbLink>
                   </BreadcrumbItem>
                 </Breadcrumb>
               }
               tab={
                 <React.Fragment>
                   <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                     Hasil Pengabdian
                   </Tab>
                 </React.Fragment>
               }>
        <TabPanel>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{__html: daftarProfil[11].text}}/>
              <DataTable title="Hasil Penelitian" columns={kolomTerformat} data={pengabdi}/>
            </Box>
          </Box>
        </TabPanel>
      </PageTab>
      <ExNav/>
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarProfil = await profil();
  const daftarPengabdian = await artikel();

  return {
    props: {daftarProfil, daftarPengabdian},
    revalidate: 15,
  };
};

export default Pengabdian;

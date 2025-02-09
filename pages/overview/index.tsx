import type {GetStaticProps, NextPage} from "next";
import React, {useState} from "react";
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Tab, TabPanel} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import {profil} from "../api/profil";
import type {profil as profilList} from "../../public/types";
import dynamic from "next/dynamic";
import router from "next/router";

const PageTab = dynamic(
  () => import('../../public/pagetab'),
  {ssr: false}
)

interface profil {
  daftarProfil: Array<profilList>;
}

const Overview: NextPage<profil> = ({daftarProfil}) => {
  const [nilai, setNilai] = useState("");

  const toggleValue = (e: React.MouseEvent<HTMLButtonElement>, value: string) => {
    e.preventDefault;
    setNilai(value);
    router.push(`/overview/${value}`);
  }

  return (
    <Menu>
      <PageTab judul="Overview"
               breadcrumb={
                 <React.Fragment>
                   <Breadcrumb my={{base: "5%", xl: "80px"}} mx="6%" textColor="white" pos="absolute">
                     <Heading>Overview</Heading>
                     <BreadcrumbItem>
                       <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
                     </BreadcrumbItem>
                     <BreadcrumbItem>
                       <BreadcrumbLink href='/overview'>Overview</BreadcrumbLink>
                     </BreadcrumbItem>
                   </Breadcrumb>
                 </React.Fragment>
               }
               tab={
                 <React.Fragment>
                   <Tab
                     onClick={(e) => toggleValue(e, "sekilas-sistem-informasi")}
                     autoFocus={nilai === "sekilas-sistem-informasi" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Sekilas Sistem Informasi
                   </Tab>
                   <Tab
                     onClick={(e) => toggleValue(e, "calon-mahasiswa")}
                     autoFocus={nilai === "calon-mahasiswa" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Calon Mahasiswa
                   </Tab>
                   <Tab
                     onClick={(e) => toggleValue(e, "beasiswa")}
                     autoFocus={nilai === "beasiswa" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Beasiswa
                   </Tab>
                   <Tab
                     onClick={(e) => toggleValue(e, "prestasi")}
                     autoFocus={nilai === "prestasi" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Prestasi
                   </Tab>
                   <Tab
                     onClick={(e) => toggleValue(e, "profil-lulusan")}
                     autoFocus={nilai === "profil-lulusan" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Profil Lulusan
                   </Tab>
                   <Tab
                     onClick={(e) => toggleValue(e, "alumni")}
                     autoFocus={nilai === "alumni" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw">
                     Alumni
                   </Tab>
                   <Tab
                     onClick={(e) => toggleValue(e, "faq")}
                     autoFocus={nilai === "faq" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     FAQ
                   </Tab>
                 </React.Fragment>
               }>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{__html: daftarProfil[12].text}}/>
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

  return {
    props: {daftarProfil},
    revalidate: 15,
  };
};

export default Overview;
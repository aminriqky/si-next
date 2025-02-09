import type {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Tab, TabPanel} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import type {profil as profilList} from "../../public/types";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {server} from "../../config";
import {wait} from "../../public/func";

const PageTab = dynamic(
  () => import('../../public/pagetab'),
  {ssr: false}
)

interface ShallowRoutingProps {
  slug?: string;
}

function selected(nilai) {
  const value = false;
  wait(75).then(() => value === nilai ? true : false);
  return value;
}

const Overview: NextPage<ShallowRoutingProps> = ({slug}) => {
  const router = useRouter();
  const {query} = router;
  const [nilai, setNilai] = useState(query.overview || slug);
  const [daftarProfil, setDaftarProfil] = useState<profilList>();

  useEffect(() => {
    async function profil() {
      const response = await fetch(`${server}/api/profile/all`);
      const jsonData = await response.json();
      setDaftarProfil(jsonData);
    }

    profil();
  }, []);

  const toggleValue = (value: string) => {
    setNilai(value);
    router.push(`/overview/${value}`);
  }

  return (
    < Menu>
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
                     onFocus={() => toggleValue("sekilas-sistem-informasi")}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Sekilas Sistem Informasi
                   </Tab>
                   <Tab
                     onFocus={() => toggleValue("calon-mahasiswa")}
                     autoFocus={nilai === "calon-mahasiswa" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Calon Mahasiswa
                   </Tab>
                   <Tab
                     onFocus={() => toggleValue("beasiswa")}
                     autoFocus={nilai === "beasiswa" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Beasiswa
                   </Tab>
                   <Tab
                     onFocus={() => toggleValue("prestasi")}
                     autoFocus={nilai === "prestasi" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Prestasi
                   </Tab>
                   <Tab
                     onFocus={() => toggleValue("profil-lulusan")}
                     autoFocus={nilai === "profil-lulusan" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw"
                   >
                     Profil Lulusan
                   </Tab>
                   <Tab
                     onFocus={() => toggleValue("alumni")}
                     autoFocus={nilai === "alumni" ? true : false}
                     w="full"
                     justifyContent="flex-start"
                     rounded="md"
                     mt="0.25vw">
                     Alumni
                   </Tab>
                   <Tab
                     onFocus={() => toggleValue("faq")}
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
              <div dangerouslySetInnerHTML={{
                __html: daftarProfil !== undefined ? daftarProfil[12].text : "Loading..."
              }}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{
                __html: daftarProfil !== undefined ? daftarProfil[13].text : "Loading..."
              }}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{
                __html: daftarProfil !== undefined ? daftarProfil[14].text : "Loading..."
              }}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{
                __html: daftarProfil !== undefined ? daftarProfil[15].text : "Loading..."
              }}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{
                __html: daftarProfil !== undefined ? daftarProfil[16].text : "Loading..."
              }}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{
                __html: daftarProfil !== undefined ? daftarProfil[17].text : "Loading..."
              }}/>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel p={0} mt={{base: "5%", xl: 0}}>
          <Box w={{xl: "68vw"}} bg="white" opacity="0.9" zIndex="999" ml={{xl: "4%"}} p="4%">
            <Box fontSize={{base: "xs", lg: "md"}}>
              <div dangerouslySetInnerHTML={{
                __html: daftarProfil !== undefined ? daftarProfil[18].text : "Loading..."
              }}/>
            </Box>
          </Box>
        </TabPanel>
      </PageTab>
      <ExNav/>
    </Menu>
  );
};

Overview.getInitialProps = async ({query}): Promise<ShallowRoutingProps> => {
  return {slug: query.slug as string};
};

export default Overview;
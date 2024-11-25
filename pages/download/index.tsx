import type {GetStaticProps, NextPage} from "next";
import React from "react";
import {useRouter} from "next/router";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Icon,
  Link,
  Tab,
  TabPanel,
  Text
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import {download as data} from "../api/download";
import {FaBookmark} from "@react-icons/all-files/fa/FaBookmark";
import {FaFileAlt} from "@react-icons/all-files/fa/FaFileAlt";
import {FaExternalLinkAlt} from "@react-icons/all-files/fa/FaExternalLinkAlt";
import type {download as download} from "../../public/types";
import {replace} from "../../public/func";
import dynamic from "next/dynamic";

const PageTab = dynamic(
  () => import('../../public/pagetab'),
  {ssr: false}
)

interface daftarDownload {
  daftarDownload: Array<download>;
}

const DaftarDownload: NextPage<daftarDownload> = ({daftarDownload}) => {
  const router = useRouter();

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
            <Text textColor="black" fontSize="2xl" fontWeight="semibold">
              Download
            </Text>
            <Flex
              bg="teal.500"
              color="teal.500"
              border="1px"
              borderTopRadius="5px"
              mt="2%"
            >
              <Icon
                ml="2%"
                color="white"
                as={FaBookmark}
                w="20px"
                h="auto"
                mr="20px"
              />
              <Text textColor="white" my="10px" fontSize="xl" fontWeight="thin">
                Nama Berkas
              </Text>
            </Flex>
            {daftarDownload !== null &&
              daftarDownload.map((item) => {
                return (
                  <Link
                    key={item.id}
                    _hover={{textDecor: "none"}}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/download/${replace(item.nama_berkas)}`);
                    }}
                  >
                    <Flex
                      _hover={{bg: "teal.50"}}
                      py="5px"
                      color="teal.500"
                      borderX="1px"
                      borderBottom="1px"
                    >
                      <Icon
                        ml="2%"
                        color="teal"
                        as={FaFileAlt}
                        w="17px"
                        h="auto"
                        mr="17px"
                      />
                      <Text
                        key={item.id}
                        textColor="black"
                        my="2.5px"
                        fontWeight="thin"
                      >
                        {item.nama_berkas}
                      </Text>
                      <Icon
                        ml="auto"
                        color="teal"
                        as={FaExternalLinkAlt}
                        w="17px"
                        mr="2%"
                        h="auto"
                      />
                    </Flex>
                  </Link>
                );
              })}
            <Flex h="5px" bg="teal.500" borderBottomRadius="5px"/>
          </Box>
        </TabPanel>
      </PageTab>
      <ExNav/>
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarDownload = await data();

  return {
    props: {daftarDownload},
    revalidate: 15,
  };
};

export default DaftarDownload;

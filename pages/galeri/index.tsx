import React, { Fragment, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import {
  Box,
  Text,
  AspectRatio,
  LinkOverlay,
  LinkBox,
  Grid,
  useMediaQuery,
  Img,
  Tab,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { tahun } from "../api/tahun";
import type { tahun as tahunList } from "../../public/types";
import { server } from "../../config";
import type { gallery as galeriList } from "../../public/types";
import { gallery } from "../api/gallery";
import PageTab from "../../public/pagetab";

type GaleriCellProps = {
  id: number;
  gambar: string;
  judul: string;
};

function GaleriCell(props: GaleriCellProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment key={props.id}>
      <LinkBox onClick={onOpen}>
        <AspectRatio
          overflow="hidden"
          borderRadius="5"
          maxW="320px"
          maxH="200px"
        >
          <LinkOverlay color="teal.800">
            <AspectRatio h="100%" w="100%">
              <Img src={`${server}/storage/${props.gambar}`} objectFit="fill" />
            </AspectRatio>
          </LinkOverlay>
        </AspectRatio>
      </LinkBox>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          minW={{ base: 315, xl: 720 }}
          minH={{ base: 310, xl: 540 }}
        >
          <AspectRatio h="100%" w="100%">
            <Img src={`${server}/storage/${props.gambar}`} objectFit="fill" />
          </AspectRatio>
          <Box pos="absolute" bottom={0} opacity={0.6} w="100%">
            <Text
              textAlign="center"
              bg="black"
              textColor="white"
              fontSize="md">
              {props.judul}
            </Text>
          </Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

interface daftarGaleri {
  daftarTahun: Array<tahunList>;
  daftarGaleri: Array<galeriList>;
}

const DaftarGaleri: NextPage<daftarGaleri> = ({ daftarTahun, daftarGaleri }) => {
  const [galeri, setGaleri] = useState(0);
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <Menu>
      <PageTab judul="Galeri"
        breadcrumb={
          <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="white" pos="absolute">
            <Heading>Galeri</Heading>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/galeri'>Galeri</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        tab={
          <React.Fragment>
            {daftarTahun !== null &&
              daftarTahun.map((item) => {
                return (
                  <Tab autoFocus onFocus={() => {
                    setGaleri(item.tahun);
                  }} key={item.id} w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
                    {item.tahun}
                  </Tab>
                );
              })}
          </React.Fragment>
        }>
        {daftarTahun !== null &&
          daftarTahun.map((item) => {
            return (
              <TabPanel p={0} mt={{ base: "5%", xl: 0 }} key={item.id}>
                {isLargerThan1280 ? (
                  <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                      {daftarGaleri !== null &&
                        daftarGaleri.map((item) => {
                          if (item.tahun === galeri) {
                            return <GaleriCell id={item.id} judul={item.judul} gambar={item.thumnail} />;
                          }
                        })}
                    </Grid>
                  </Box>
                ) : (
                  <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
                    <Grid gap={2}>
                      {daftarGaleri !== null &&
                        daftarGaleri.map((item) => {
                          if (item.tahun === galeri) {
                            return <GaleriCell id={item.id} judul={item.judul} gambar={item.thumnail} />;
                          }
                        })}
                    </Grid>
                  </Box>
                )}
              </TabPanel>
            );
          })}
      </PageTab>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarTahun = await tahun();
  const daftarGaleri = await gallery();

  return {
    props: { daftarTahun, daftarGaleri },
    revalidate: 15,
  };
};
export default DaftarGaleri;

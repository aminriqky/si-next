import type { NextPage, GetStaticProps } from "next";
import React, { Fragment } from "react";
import {
  Box,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  Text,
  Tab,
  useDisclosure,
  LinkBox,
  AspectRatio,
  LinkOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  useMediaQuery,
  Grid,
} from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { profil } from "../api/profil";
import type { profil as profilList } from "../../public/types";
import PageTab from "../../public/pagetab";
import { server } from "../../config";

type GaleriCellProps = {
  id: number;
  text: string;
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
            <div dangerouslySetInnerHTML={{ __html: props.text }} />
          </LinkOverlay>
        </AspectRatio>
      </LinkBox>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          minW={{ base: 315, xl: 720 }}
          minH={{ base: 310, xl: 540 }}
        >
          <div dangerouslySetInnerHTML={{ __html: props.text }} />
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

interface penelitian {
  daftarProfil: Array<profilList>;
}

const Penelitian: NextPage<penelitian> = ({ daftarProfil }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  function dots(num: number, str: string) {
    if (str !== null && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return (
    <Menu>
      <PageTab judul="Posting"
        breadcrumb={
          <React.Fragment>
            <Breadcrumb my={{ base: "5%", xl: "80px" }} mx="6%" textColor="palegreen" pos="absolute">
              <Heading>Menu Pos Admin</Heading>
              <BreadcrumbItem>
                <Text>Semua pos berada disini, salin link pos ke kolom url di sub menu yang dituju.</Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </React.Fragment>
        }
        tab={
          <React.Fragment>
            <Tab w="full" justifyContent="flex-start" rounded="md" mt="0.25vw">
              <Text>Profil</Text>
            </Tab>
          </React.Fragment>
        }>
        <TabPanel p={0} mt={{ base: "5%", xl: 0 }}>
          {isLargerThan1280 ? (
            <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
              <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                {daftarProfil !== null &&
                  daftarProfil.map((item) => {
                    <GaleriCell id={item.id} text={item.text} />
                  })}
              </Grid>
            </Box>
          ) : (
            <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
              <Grid gap={2}>
                {daftarProfil !== null &&
                  daftarProfil.map((item) => {
                    <GaleriCell id={item.id} text={item.text} />
                  })}
              </Grid>
            </Box>
          )}
        </TabPanel>
      </PageTab>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarProfil = await profil();

  return {
    props: { daftarProfil },
    revalidate: 15,
  };
};

export default Penelitian;

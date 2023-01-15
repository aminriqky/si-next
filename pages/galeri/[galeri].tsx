import type { NextPage, GetServerSideProps } from "next";
import { Fragment } from "react";
import {
  Text,
  Box,
  AspectRatio,
  LinkOverlay,
  LinkBox,
  Grid,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { gallery } from "../api/gallery";
import { server } from "../../config";
import type { gallery as galeriList } from "../../public/types";

type GaleriCellProps = {
  id: number;
  gambar: string;
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
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

interface daftarGaleri {
  daftarGaleri: Array<galeriList>;
}

const Galeri: NextPage<daftarGaleri> = ({ daftarGaleri }) => {
  const router = useRouter();
  const { galeri } = router.query;
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <Menu>
      <Box
        bg="white"
        opacity="0.9"
        zIndex="999"
        mx="6%"
        my={{ base: "12%", xl: "100px" }}
        p="4%"
      >
        <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="6">
          Foto Tahun {galeri}
        </Text>
        {isLargerThan1280 ? (
          <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            {daftarGaleri !== null &&
              daftarGaleri.map((item) => {
                if (item.tahun.toString() === galeri) {
                  return <GaleriCell id={item.id} gambar={item.thumnail} />;
                }
              })}
          </Grid>
        ) : (
          <Grid gap={2}>
            {daftarGaleri !== null &&
              daftarGaleri.map((item) => {
                if (item.tahun.toString() === galeri) {
                  return <GaleriCell id={item.id} gambar={item.thumnail} />;
                }
              })}
          </Grid>
        )}
      </Box>
      <ExNav />
    </Menu>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const daftarGaleri = await gallery();

  return {
    props: { daftarGaleri },
  };
};

export default Galeri;

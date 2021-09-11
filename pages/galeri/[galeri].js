import {
  Text, Box, AspectRatio, LinkOverlay, LinkBox, Grid, useMediaQuery
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
import { gallery } from '../api/gallery';
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

function GaleriCell(props) {
  return (
    <LinkBox>
      <AspectRatio overflow="hidden" borderRadius="5" maxW="320px" maxH="200px">
        <LinkOverlay color="teal.800">
          <AspectRatio h="100%" w="100%">
            <Image src={`https://webprodi.sashi.id/storage/${props.gambar}`} layout="fill" objectFit="fill" />
          </AspectRatio>
        </LinkOverlay>
      </AspectRatio>
    </LinkBox>
  );
}

export default function Galeri({ daftarGaleri }) {
  const router = useRouter();
  const { galeri } = router.query;
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")

  return (
    <Menu slideShow={<BgImg />}>
      <Box bg="white" zIndex="999" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="6">
          Foto Tahun {galeri}
        </Text>
        {
          isLargerThan1280 ?
            <Grid templateColumns="repeat(6, 1fr)" gap={4}>
              {
                daftarGaleri !== null && daftarGaleri.map((item) => {
                  if (item.tahun == galeri) {
                    return (
                      <GaleriCell gambar={item.foto} />
                    )
                  }
                })
              }
            </Grid>
            :
            <Grid gap={2}>
              {
                daftarGaleri !== null && daftarGaleri.map((item) => {
                  if (item.tahun == galeri) {
                    return (
                      <GaleriCell gambar={item.foto} />
                    )
                  }
                })
              }
            </Grid>
        }
      </Box>
      <ExNav />
    </Menu>
  );
}

export async function getServerSideProps() {
  const daftarGaleri = await gallery()

  return {
    props: { daftarGaleri }
  };
}

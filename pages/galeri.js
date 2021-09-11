import { useRouter } from 'next/router';
import {
  Text, Box, AspectRatio, LinkOverlay, LinkBox, Grid, useMediaQuery
} from "@chakra-ui/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import ExNav from '../public/exnav'
import Menu from '../public/menu';
import { tahun } from './api/tahun';
const BgImg = dynamic(() => import('../public/dynamic/BgImg'));

function Galeri(props) {
  return (
    <LinkBox>
      <AspectRatio overflow="hidden" borderRadius="5" maxW="320px" h="200px">
        <LinkOverlay color="teal.800">
          <Text letterSpacing="widest" fontWeight="semibold" zIndex={9999} fontSize="xl" pos="absolute">
            {props.judul}
          </Text>
          <AspectRatio h="100%" w="100%"
            sx={{ filter: "blur(0.75px) grayscale(25%) opacity(50%)" }}
            _hover={{ filter: "blur(0.75px) grayscale(25%) opacity(75%)" }}>
            <Image src="/yt.png" layout="fill" objectFit="fill" />
          </AspectRatio>
        </LinkOverlay>
      </AspectRatio>
    </LinkBox>
  );
}

export default function DaftarGaleri({ daftarTahun }) {
  const router = useRouter();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")

  return (
    <Menu slideShow={<BgImg />}>
      <Box bg="white" zIndex="999" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text textColor="black" fontSize="2xl" fontWeight="semibold" mb="6">
          Galeri
        </Text>
        {
          isLargerThan1280 ?
            <Grid templateColumns="repeat(3, 1fr)" gap={8}>
              {
                daftarTahun !== null && daftarTahun.map((item) => {
                  return (
                    <Galeri judul={item.tahun} />
                  )
                })
              }
            </Grid>
            :
            <Grid gap={5}>
              {
                daftarTahun !== null && daftarTahun.map((item) => {
                  return (
                    <Galeri judul={item.tahun} />
                  )
                })
              }
            </Grid>
        }
      </Box>
      <ExNav />
    </Menu>
  );
}

export async function getStaticProps() {
  const daftarTahun = await tahun()

  return {
    props: { daftarTahun },
    revalidate: 30
  };
}

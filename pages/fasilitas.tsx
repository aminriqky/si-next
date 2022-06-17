import type { NextPage, GetStaticProps } from "next";
import { Box } from "@chakra-ui/react";
import Interweave from "interweave";
import ExNav from "../public/exnav";
import Menu from "../public/menu";
import { profil } from "./api/profil";
import type { profil as profilList } from "../public/types";

interface fasilitas {
  daftarProfil: Array<profilList>;
}

const Fasilitas: NextPage<fasilitas> = ({ daftarProfil }) => {
  return (
    <Menu>
      <Box
        bg="white"
        opacity="0.9"
        zIndex="999"
        textColor="black"
        mx="8%"
        my={{ base: "12%", xl: "100px" }}
        p="4%"
      >
        <Box fontSize={{ base: "xs", lg: "md" }}>
          <Interweave content={daftarProfil[5].text} />
        </Box>
      </Box>
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

export default Fasilitas;

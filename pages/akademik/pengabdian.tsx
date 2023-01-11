import type { NextPage, GetStaticProps } from "next";
import { Box } from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { profil } from "../api/profil";
import type { profil as profilList } from "../../public/types";

interface daftarProfil {
  daftarProfil: Array<profilList>;
}

const Pengabdian: NextPage<daftarProfil> = ({ daftarProfil }) => {
  return (
    <Menu>
      <Box
        bg="white"
        opacity="0.9"
        zIndex="999"
        mx="8%"
        my={{ base: "12%", xl: "100px" }}
        p="4%"
      >
        <Box fontSize={{ base: "xs", lg: "md" }}>
          <div dangerouslySetInnerHTML={{ __html: daftarProfil[2].text }} />
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

export default Pengabdian;

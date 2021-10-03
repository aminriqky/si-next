import type { NextPage, GetStaticProps } from 'next'
import {
  Text, Box
} from "@chakra-ui/react";
import ExNav from '../public/exnav'
import Menu from '../public/menu';
import { profil } from './api/profil';
import type { profil as profilList } from '../public/types';

interface profil {
  daftarProfil: Array<profilList>
}

const Profil: NextPage<profil> = ({ daftarProfil }) => {
  return (
    <Menu>
      <Box bg="white" opacity="0.9" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%">
        <Text fontSize={{ base: "xs", lg: "md" }}>
          <div dangerouslySetInnerHTML={{ __html: daftarProfil[0].text }} />
        </Text>
      </Box>
      <ExNav />
    </Menu>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const daftarProfil = await profil()

  return {
    props: { daftarProfil },
    revalidate: 30
  };
}

export default Profil;
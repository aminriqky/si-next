import {
  Text, Box
} from "@chakra-ui/react";
import ExNav from '../public/exnav'
import Menu from '../public/menu';
import { profil } from './api/profil';

export default function Profil({ daftarProfil }) {
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

export async function getStaticProps() {
  const daftarProfil = await profil()

  return {
    props: { daftarProfil },
    revalidate: 30
  };
}

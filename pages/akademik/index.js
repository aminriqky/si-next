import {
  Text, Box
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';
const BgImg = dynamic(() => import('../../public/dynamic/BgImg'));

export default function Akademik() {
  return (
    <Menu slideShow={<BgImg />}>
      <Box bg="white" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%" />
      <ExNav />
    </Menu>
  );
}

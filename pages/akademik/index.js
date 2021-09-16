import {
  Text, Box
} from "@chakra-ui/react";
import ExNav from '../../public/exnav'
import Menu from '../../public/menu';

export default function Akademik() {
  return (
    <Menu>
      <Box bg="white" opacity="0.9" zIndex="999" textColor="black" mx="8%" my={{ base: "12%", xl: "100px" }} p="4%" />
      <ExNav />
    </Menu>
  );
}

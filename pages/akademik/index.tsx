import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";

const Akademik: NextPage = () => {
  return (
    <Menu>
      <Box
        bg="white"
        opacity="0.9"
        zIndex="999"
        mx="8%"
        my={{ base: "12%", xl: "100px" }}
        p="4%"
      />
      <ExNav />
    </Menu>
  );
};

export default Akademik;

import {
  Text, Flex, Box, Link
} from "@chakra-ui/react";
import NavLink from "next/link";

export default function PengumumanCell(props) {
  return (
    <Flex dykey={props.key} flexDirection="row" flex="1">
      <Box>
        <Text fontSize="md" color="orange.800">
          <Link fontWeight="semibold">
            <NavLink as={props.dylink} href="/pengumuman/[pengumuman]">
              {props.judul}
            </NavLink>
          </Link>
        </Text>
        <Text fontSize="sm" pb="5px">
          {props.tanggal}
        </Text>
      </Box>
    </Flex>
  );
}
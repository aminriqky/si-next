import {
  Text, Flex, Box, Link
} from "@chakra-ui/react";
import NavLink from "next/link";

export default function AgendaCell(props) {
  return (
    <Flex ml={{ base: "12%", xl: 0 }} dykey={props.dykey} flexDirection="row" flex="1">
      <Box alignSelf="center" minW="60px" height="60px" m={{ base: "3vw", xl: "1.41vw" }} textAlign="center" border="2px">
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">{props.hari}</Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" minW="120px" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          <Link fontWeight="semibold">
            <NavLink as={props.dylink} href="/agenda/[agenda]">
              {props.kegiatan}
            </NavLink>
          </Link>
        </Text>
        <Text fontSize="sm">
          {props.tanggal}
        </Text>
      </Box>
    </Flex>
  )
}
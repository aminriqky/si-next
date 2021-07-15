import {
  Text, Flex, Link
} from "@chakra-ui/react";
import NavLink from "next/link";

export default function ArtikelCell(props) {
  return (
    <Flex my="25" px="6" key={props.dykey} flexDir="column" width={{ base: "100%", xl: "200px" }} bg="blue.600" mr="50px">
      <Text color="white" fontWeight="bold" pt="6" mb="6">
        {props.tema}
      </Text>
      <Text fontSize="sm" color="white">
        <Link fontWeight="semibold">
          <NavLink as={props.dylink} href="/artikel/[artikel]">
            {props.judul}
          </NavLink>
        </Link>
      </Text>
      <Text fontSize="xs" color="gray.300" pt="4px" pb="2">
        {props.tanggal}
      </Text>
      <Text fontSize="xs" pb="6" color="white">
        {props.children}
      </Text>
    </Flex>
  );
}
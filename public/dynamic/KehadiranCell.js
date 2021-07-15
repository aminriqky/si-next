import {
  Text, Flex, Box, Img, Link
} from "@chakra-ui/react";
import NavLink from "next/link";

export default function KehadiranCell(props) {
  return (
    <>
      <Flex flexDir="row">
        <Img
          borderRadius="full"
          boxSize="75px"
          src={props.gambar}
          width="auto"
          alt="Avatar"
          mr={{ base: "25px", xl: "50px" }}
        />
        <Flex dykey={props.key} flexDirection="row" flex="1" mt={{ base: 0, xl: "15px" }} mr={{ base: "25px", xl: "115px" }}>
          <Box>
            <Text fontSize={{ base: "sm", xl: "md" }} color="orange.800">
              <Link fontWeight="semibold">
                <NavLink as={props.dylink} href="/pengumuman/[pengumuman]">
                  {props.judul}
                </NavLink>
              </Link>
            </Text>
            <Text fontSize="sm" pb="5px">
              {props.deskripsi}
            </Text>
          </Box>
        </Flex>
        {
          props.hadir === 1 &&
          <Box borderRadius="full" border="solid teal 2px" height="30px" mt="25px" pointerEvents="none">
            <Text px={{ base: 6, xl: 10 }} color="teal" fontWeight="medium">
              HADIR
            </Text>
          </Box>
        }
        {
          props.hadir !== 1 &&
          <Box ml={{ base: "25px", xl: "115px" }} borderRadius="full" border="solid crimson 2px" height="30px" mt="25px" pointerEvents="none">
            <Text px={{ base: 2, xl: 6 }} color="crimson" fontWeight="medium">
              TIDAK ADA
            </Text>
          </Box>
        }
      </Flex>
    </>
  );
}
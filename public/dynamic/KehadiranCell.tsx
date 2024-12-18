import {Box, Flex, Img, Link, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

interface KehadiranCellProps {
  id: number;
  gambar: string;
  dylink: string;
  deskripsi: string;
  judul: string;
  hadir: number;
}

export default function KehadiranCell(props: KehadiranCellProps) {
  const router = useRouter();

  function f() {

  }

  return (
    <Flex key={props.id} my={6} ml={2} mr={2} bg="#F9FAFB" w="140px">
      <Box
        w="xs"
        bg="white"
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Img w="full" h={40} src={props.gambar} alt="avatar"/>
        <Box py={3} textAlign="center">
          <Link
            mx={3}
            display="block"
            fontSize="xs"
            color="gray.800"
            fontWeight="bold"
            isTruncated
            onClick={(e) => {
              e.preventDefault();
              router.push(`${props.dylink}`);
            }}
          >
            {props.judul}
          </Link>
          <Text mx={3} fontSize="xs" color="teal.700" isTruncated>
            {props.deskripsi}
          </Text>
        </Box>
        {props.hadir === 1 && (
          <Box bg="teal.600">
            <Text mx={14} py={1} fontSize="smaller" color="white">
              Hadir
            </Text>
          </Box>
        )}
        {props.hadir === 0 && (
          <Box bg="red.600">
            <Text mx={11.5} py={1} fontSize="smaller" color="white">
              Tidak Ada
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

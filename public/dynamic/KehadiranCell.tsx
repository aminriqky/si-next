import { Box, Flex, Img, Text } from "@chakra-ui/react";

interface KehadiranCellProps {
  id: number;
  gambar: string;
  dylink: string;
  deskripsi: string;
  judul: string;
  hadir: number;
}

export default function KehadiranCell(props: KehadiranCellProps) {
  return (
    <Flex key={props.id} my={6} ml={2} mr={2} bg="#F9FAFB" w="125px">
      <Box
        w="xs"
        bg="white"
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Img w="full" h={40} src={props.gambar} alt="avatar" />
        <Box py={3} textAlign="center">
          <Text
            mx={3}
            display="block"
            fontSize="xs"
            color="gray.800"
            fontWeight="bold"
            isTruncated
          >
            {props.judul}
          </Text>
          <Text mx={3} fontSize="xs" color="teal.700" isTruncated>
            {props.deskripsi}
          </Text>
        </Box>
        {props.hadir === 1 && (
          <Box bg="teal.600">
            <Text mx={12} py={1} fontSize="smaller" color="white">
              Hadir
            </Text>
          </Box>
        )}
        {props.hadir === 0 && (
          <Box bg="red.600">
            <Text mx={10} py={1} fontSize="smaller" color="white">
              Tidak Ada
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

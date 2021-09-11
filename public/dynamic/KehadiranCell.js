import {
  Text, Flex, Box, Link, AspectRatio
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function KehadiranCell(props) {
  const router = useRouter();

  return (
    <Flex flexDir="row">
      <AspectRatio overflow="hidden" borderRadius="full" boxSize="75px" mr={{ base: "25px", xl: "50px" }}>
        <Image src={props.gambar} layout="fill" objectFit="contain" objectPosition="left top" alt="Avatar" />
      </AspectRatio>
      <Flex key={props.dykey} flexDirection="row" flex="1" mt={{ base: 0, xl: "15px" }} mr={{ base: "25px", xl: "115px" }}>
        <Box>
          <Text fontSize={{ base: "sm", xl: "md" }} color="orange.800">
            <Link fontWeight="semibold" onClick={(e) => {
              e.preventDefault()
              router.push(`${props.dylink}`)
            }}>
              {props.judul}
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
        <Box borderRadius="full" border="solid crimson 2px" height="30px" mt="25px" pointerEvents="none">
          <Text px={{ base: 2, xl: 6 }} color="crimson" fontWeight="medium">
            TIDAK ADA
          </Text>
        </Box>
      }
    </Flex>
  );
}
import {
  Text, Flex, Link
} from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function ArtikelCell(props) {
  const router = useRouter();

  return (
    <Flex my="25" px="6" key={props.dykey} flexDir="column" width={{ base: "100%", xl: "200px" }} bg="blue.600" mr="50px">
      <Text color="white" fontWeight="bold" pt="6" mb="6">
        <Link fontWeight="semibold" onClick={(e) => {
          e.preventDefault()
          router.push("/artikel/daftar-artikel")
        }}>
          {props.tema}
        </Link>
      </Text>
      <Text fontSize="sm" color="white">
        <Link fontWeight="semibold" onClick={(e) => {
          e.preventDefault()
          router.push(`${props.dylink}`)
        }}>
          {props.judul}
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
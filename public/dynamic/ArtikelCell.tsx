import React from "react";
import {
  Text, Flex, Link, Box
} from "@chakra-ui/react";
import { useRouter } from 'next/router';

interface ArtikelCellProps {
  dylink: string
  key: number
  tema: string
  judul: string
  tanggal: string
}

const ArtikelCell: React.FC<ArtikelCellProps> = React.memo((props) => {
  const router = useRouter();

  const artikel = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/artikel")
  }

  const judul = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`${props.dylink}`)
  }

  return (
    <Flex my="25" px="6" key={props.key} flexDir="column" width={{ base: "100%", xl: "200px" }} bg="blue.600" mr="50px">
      <Text color="white" fontWeight="semibold" pt="6" mb="6">
        <Link onClick={artikel}>
          {props.tema}
        </Link>
      </Text>
      <Text fontSize="sm" fontWeight="semibold" color="white">
        <Link onClick={judul}>
          {props.judul}
        </Link>
      </Text>
      <Text fontSize="xs" color="gray.300" pt="4px" pb="2">
        {props.tanggal}
      </Text>
      <Box fontSize="xs" pb="6" color="white">
        {props.children}
      </Box>
    </Flex>
  );
})

ArtikelCell.displayName = 'ArtikelCell';

export default ArtikelCell;
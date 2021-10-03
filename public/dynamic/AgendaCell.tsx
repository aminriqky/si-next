import {
  Text, Flex, Box, Link
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import type { AgendaCellProps } from '../../public/types'

export default function AgendaCell(props: AgendaCellProps) {
  const router = useRouter();

  return (
    <Flex ml={{ base: "12%", xl: 0 }} key={props.key} flexDirection="row" flex="1">
      <Box alignSelf="center" minW="60px" height="60px" m={{ base: "3vw", xl: "1.41vw" }} textAlign="center" border="2px">
        <Text mt="5px" alignSelf="center" fontWeight="bold" fontSize="lg">{props.hari}</Text>
        <Text fontSize="xs">{props.hariBulan}</Text>
      </Box>
      <Box alignSelf="center" minW="120px" m={{ base: "3vw", xl: "1.41vw" }}>
        <Text fontSize={{ base: "sm", xl: "md" }}>
          <Link fontWeight="semibold" onClick={(e) => {
            e.preventDefault()
            router.push(`${props.dylink}`)
          }}>
            {props.judul}
          </Link>
        </Text>
        <Text fontSize="sm">
          {props.tempat}
        </Text>
      </Box>
    </Flex>
  )
}
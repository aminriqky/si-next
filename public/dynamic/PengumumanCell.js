import {
  Text, Flex, Box, Link
} from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function PengumumanCell(props) {
  const router = useRouter();

  return (
    <Flex key={props.dykey} flexDirection="row" flex="1">
      <Box>
        <Text fontSize="md" color="orange.800">
          <Link fontWeight="semibold" onClick={(e) => {
            e.preventDefault()
            router.push(`${props.dylink}`)
          }}>
            {props.judul}
          </Link>
        </Text>
        <Text fontSize="sm" pb="5px">
          {props.tanggal}
        </Text>
      </Box>
    </Flex>
  );
}
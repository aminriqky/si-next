import React from "react";
import { Text, Flex, Box, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface PengumumanCellProps {
  key: number;
  dylink: string;
  judul: string;
  tanggal: string;
}

export default function PengumumanCell(props: PengumumanCellProps) {
  const router = useRouter();

  return (
    <Flex flexDirection="row" flex="1">
      <Box>
        <Text fontSize="md" color="orange.800">
          <Link
            fontWeight="semibold"
            onClick={(e) => {
              e.preventDefault();
              router.push(`${props.dylink}`);
            }}
          >
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

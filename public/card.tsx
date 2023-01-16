import NextLink from "next/link";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { BsArrowUpRight } from "@react-icons/all-files/bs/BsArrowUpRight";

interface CardProps {
  judul: string;
  isi: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'sm'}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}>
        <Box p={4}>
          <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
            {props.judul}
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
            {props.isi}
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Text fontSize={'md'} fontWeight={'semibold'}>
              <NextLink href="/overview">
                Lihat Selengkapnya
              </NextLink>
            </Text>
            <BsArrowUpRight />
          </Flex>
        </HStack>
      </Box>
    </Center >
  );
}

export default Card;
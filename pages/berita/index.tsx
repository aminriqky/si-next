import type { NextPage, GetStaticProps } from "next";
import { Text, Box, Flex, Link, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ExNav from "../../public/exnav";
import Menu from "../../public/menu";
import { replace } from "../../public/func";
import "dayjs/locale/id";
import { berita } from "../api/berita";
import type { berita as beritaList } from "../../public/types";
import { server } from "../../config";
import { Fragment } from "react";

interface daftarBerita {
  daftarBerita: Array<beritaList>;
}

type MahasiswaCellProps = {
  logo: string;
  color: string;
  detail: string;
};

const MahasiswaCell: React.FC<MahasiswaCellProps> = (props) => {
  return (
    <Flex flexDir={{ base: "column", xl: "row" }} mb="2%">
      <Img
        src={`${server}/storage/${props.logo}`}
        borderRadius="5"
        maxW="320px"
        objectFit="contain"
      />
      <Flex ml={{ base: 0, xl: 16 }} flexDir="column" flexWrap="wrap">
        <Text mb="10px" color={props.color} fontWeight="semibold">
          {props.children}
        </Text>
        <Box
          color="black"
          fontWeight="light"
          fontSize={{ base: "xs", lg: "md" }}
        >
          <div dangerouslySetInnerHTML={{ __html: props.detail }} />
        </Box>
      </Flex>
    </Flex>
  );
};

const DaftarBerita: NextPage<daftarBerita> = ({ daftarBerita }) => {
  const router = useRouter();

  function dots(num: number, str: string) {
    if (str !== null && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return (
    <Menu>
      <Box w={{ xl: "68vw" }} bg="white" opacity="0.9" zIndex="999" ml={{ xl: "4%" }} p="4%">
        <Box fontSize={{ base: "xs", lg: "md" }}>
          <Text textColor="black" fontSize="2xl" fontWeight="semibold" my="6">
            Berita Terkini
          </Text>
          {daftarBerita !== null &&
            daftarBerita.map((item) => {
              return (
                <Fragment key={item.id}>
                  {
                    <MahasiswaCell
                      color="teal.700"
                      detail={dots(530, item.detail)}
                      logo={item.thumbnail}
                    >
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/berita/${replace(item.judul)}`);
                        }}
                      >
                        {item.judul}
                      </Link>
                    </MahasiswaCell>
                  }
                </Fragment>
              );
            })}
        </Box>
      </Box>
      <ExNav />
    </Menu>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const daftarBerita = await berita();

  return {
    props: { daftarBerita },
    revalidate: 15,
  };
};

export default DaftarBerita;

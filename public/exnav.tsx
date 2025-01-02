import React from "react";
import {Box, Container, Divider, Link, Text} from "@chakra-ui/react";
import NextLink from "next/link";

const TentangKami = () => (
  <Box m="10" display="flex" flexDirection="column" alignItems="flex-start">
    <Text fontWeight={"bold"} color={"blackAlpha.600"}>
      TENTANG KAMI
    </Text>
    <Divider mb={2}/>
    {["Sejarah", "Visi Misi & Tujuan", "Staff & Tenaga Pendidik", "Direktori Prestasi", "Galeri"].map((item, index) => (
      <Box key={index} _hover={{textDecor: "underline"}} color="orange.600">
        <NextLink href="/profil">{item}</NextLink>
      </Box>
    ))}
  </Box>
);

const Universitas = () => (
  <Box m="10" display="flex" flexDirection="column">
    <Text fontWeight="bold" color="blackAlpha.600">UNIVERSITAS</Text>
    <Divider mb={2}/>
    {[
      {href: "https://radenfatah.ac.id/", label: "UIN Raden Fatah"},
      {href: "http://kepegawaian.radenfatah.ac.id/", label: "Kepegawaian"},
      {href: "http://spi.radenfatah.ac.id/", label: "Satuan Pengawas Internal"},
      {href: "http://lpm.radenfatah.ac.id/", label: "Lembaga Penjaminan Mutu"},
      {href: "http://wbs.radenfatah.ac.id/", label: "WhistleBlowing System"},
    ].map((link, index) => (
      <Link key={index} href={link.href} color="orange.600" isExternal>
        {link.label}
      </Link>
    ))}
  </Box>
);

const CustomContainer: React.FC = ({children}) => (
  <React.Fragment>
    <Container
      py="10"
      bg="white"
      display="flex"
      flexDirection={{base: "column", xl: "row"}}
      maxWidth="100%"
      justifyContent="center"
    >
      {children}
    </Container>
  </React.Fragment>
);

export default function ExNav() {
  return (
    <React.Fragment>
      <CustomContainer>
        <TentangKami/>
        <Universitas/>
      </CustomContainer>
      <Divider/>
      <Box bg="white" py="5" fontSize={{base: 11, xl: "md"}}>
        <Text color="black" textAlign="center" fontWeight="thin">
          Copyright ©
          <NextLink href="/">{" Sistem Informasi "}</NextLink>
          <Link href="http://saintek.radenfatah.ac.id/" isExternal>
            {"SAINTEK UIN Raden Fatah"}
          </Link>
          {". All Rights Reserved."}
        </Text>
        <Text color="black" textAlign="center" fontWeight="thin">
          <Link href="https://radenfatah.ac.id/" isExternal>
            Universitas Islam Negeri Raden Fatah Palembang
          </Link>
        </Text>
      </Box>
    </React.Fragment>
  );
}

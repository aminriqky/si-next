import { Fragment } from "react";
import {
  Container, Text, Link, Box, Divider
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function ExNav() {
  return (
    <Fragment>
      <Container py="10" bg="white" display="flex" flexDirection={{ base: "column", xl: "row" }} maxWidth="100%" justifyContent="center">
        <Box m="10" display="flex" flexDirection="column" alignItems="flex-start">
          <Text fontWeight="bold" color="blackAlpha.600">
            TENTANG KAMI
          </Text>
          <Divider mb={2} />
          <Box _hover={{ textDecor: "underline" }} color="orange.600">
            <NextLink href="/profil">
              Sejarah
            </NextLink>
          </Box>
          <Box _hover={{ textDecor: "underline" }} color="orange.600">
            <NextLink href="/profil">
              Visi Misi & Tujuan
            </NextLink>
          </Box>
          <Box _hover={{ textDecor: "underline" }} color="orange.600">
            <NextLink href="/kehadiran">
              Staff & Tenaga Pendidik
            </NextLink>
          </Box>
          <Box _hover={{ textDecor: "underline" }} color="orange.600">
            <NextLink href="/kemahasiswaan">
              Direktori Prestasi
            </NextLink>
          </Box>
          <Box _hover={{ textDecor: "underline" }} color="orange.600">
            <NextLink href="/galeri">
              Galeri
            </NextLink>
          </Box>
        </Box>
        <Box m="10" display="flex" flexDirection="column">
          <Text fontWeight="bold" color="blackAlpha.600">
            UNIVERSITAS
          </Text>
          <Divider mb={2} />
          <Link href="https://radenfatah.ac.id/" color="orange.600" isExternal>UIN Raden Fatah</Link>
          <Link href="http://kepegawaian.radenfatah.ac.id/" color="orange.600" isExternal>Kepegawaian</Link>
          <Link href="http://spi.radenfatah.ac.id/" color="orange.600" isExternal>Satuan Pengawas Internal</Link>
          <Link href="http://lpm.radenfatah.ac.id/" color="orange.600" isExternal>Lembaga Penjaminan Mutu</Link>
          <Link href="http://wbs.radenfatah.ac.id/" color="orange.600" isExternal>WhistleBlowing System</Link>
        </Box>
        <Box m="10" display="flex" flexDirection="column">
          <Text fontWeight="bold" color="blackAlpha.600">
            LAYANAN
          </Text>
          <Divider mb={2} />
          <Link
            href="https://e-learning.radenfatah.ac.id/"
            color="orange.600"
            isExternal
          >
            E-Learning
          </Link>
          <Link href="mailto:si@radenfatah.ac.id" color="orange.600">
            E-Mail
          </Link>
          <Link
            href="http://e-lkp.radenfatah.ac.id/"
            color="orange.600"
            isExternal
          >
            E-LKP
          </Link>
          <Link
            href="http://jurnal.radenfatah.ac.id/"
            color="orange.600"
            isExternal
          >
            E-Jurnal
          </Link>
          <Link
            href="http://e-office.radenfatah.ac.id/index.php"
            color="orange.600"
            isExternal
          >
            E-Office
          </Link>
        </Box>
        <Box m="10" display="flex" flexDirection="column">
          <Text fontWeight="bold" color="blackAlpha.600">
            AKADEMIK
          </Text>
          <Divider mb={2} />
          <Link href="http://beasiswa.radenfatah.ac.id/" color="orange.600" isExternal>Beasiswa</Link>
          <Link href="https://lpm.radenfatah.ac.id/" color="orange.600" isExternal>Akreditasi</Link>
          <Link href="https://silayak.radenfatah.ac.id/" color="orange.600" isExternal>Pedoman Edukasi</Link>
          <Link href="https://lp2m.radenfatah.ac.id/" color="orange.600" isExternal>Pendaftaran KKN</Link>
          <Link href="http://e-skripsi.radenfatah.ac.id/" color="orange.600" isExternal>Pendaftaran Tugas Akhir</Link>
        </Box>
        <Box m="10" display="flex" flexDirection="column">
          <Text fontWeight="bold" color="blackAlpha.600">
            TAUTAN
          </Text>
          <Divider mb={2} />
          <Link
            href="http://perpustakaan.radenfatah.ac.id/"
            color="orange.600"
            isExternal
          >
            Perpustakaan
          </Link>
          <Link
            color="orange.600"
            href="http://repository.radenfatah.ac.id/"
            isExternal
          >
            Digital Repository
          </Link>
          <Link
            href="http://pustipd.radenfatah.ac.id/"
            color="orange.600"
            isExternal
          >
            PUSTPID
          </Link>
          <Link
            href="http://alumni.radenfatah.ac.id/"
            color="orange.600"
            isExternal
          >
            Alumni
          </Link>
          <Link
            href="http://labterpadusaintek.radenfatah.ac.id/"
            color="orange.600"
            isExternal
          >
            Lab Terpadu Saintek
          </Link>
        </Box>
        <Box m="10" display="flex" flexDirection="column">
          <Text fontWeight="bold" color="blackAlpha.600">
            AKSES CEPAT
          </Text>
          <Divider mb={2} />
          <Link href="https://kemenag.go.id/" color="orange.600" isExternal>
            Kemenag-RI
          </Link>
          <Link
            href="https://forlap.kemdikbud.go.id/"
            color="orange.600"
            isExternal
          >
            PD-DIKTI
          </Link>
          <Link color="orange.600" href="https://www.banpt.or.id/" isExternal>
            BAN-PT
          </Link>
          <Link href="http://pendis.kemenag.go.id/" color="orange.600" isExternal>
            Pendis Kemenag RI
          </Link>
          <Link href="http://diktis.kemenag.go.id/" color="orange.600" isExternal>
            Diktis Kemenag RI
          </Link>
        </Box>
      </Container>
      <Divider />
      <Box bg="white" py="5" fontSize={{ base: 11, xl: "md" }}>
        <Text color="black" textAlign="center" fontWeight="thin">
          Copyright ©
          <NextLink href="/">
            {" Sistem Informasi "}
          </NextLink>
          <Link href="http://saintek.radenfatah.ac.id/" isExternal>
            {"SAINTEK UIN Raden Fatah. "}
          </Link>
          All Rights Reserved.
        </Text>
        <Text color="black" textAlign="center" fontWeight="thin">
          <Link href="https://radenfatah.ac.id/" isExternal>
            Universitas Islam Negeri Raden Fatah Palembang
          </Link>
        </Text>
      </Box>
    </Fragment>
  );
}

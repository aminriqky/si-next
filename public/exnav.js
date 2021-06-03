import React from "react";
import {
  Container, Text, Link, Box, Divider, useBreakpointValue, Flex
} from "@chakra-ui/react";

export default function ExNav() {
  const responsive = useBreakpointValue({ base: "column", xl: "row" })

  return (
    <>
      <Container py="10" bg="white" display="flex" flexDirection={responsive} maxWidth="100%" justifyContent="center">
        <Box m="10" display="flex" flexDirection="column" alignItems="flex-start">
          <Text fontWeight="bold" color="blackAlpha.600">
            TENTANG KAMI
          </Text>
          <Divider mb={2} />
          <Link href="/sejarah" color="orange.600">
            Sejarah
            </Link>
          <Link href="/visi-misi-tujuan" color="orange.600">
            Visi Misi & Tujuan
            </Link>
          <Link color="orange.600" href="/struktur">
            Struktur
            </Link>
          <Link color="orange.600" href="/category/staff">
            Staff & Tenaga Pendidik
            </Link>
          <Link href="/direktori-kerjasama" color="orange.600">
            Direktori Kerjasama
            </Link>
          <Link color="orange.600" href="/direktori-prestasi">
            Direktori Prestasi
            </Link>
          <Link color="orange.600" href="/katalog-statistik">
            Katalog Statistik
            </Link>
        </Box>
        <Box m="10" display="flex" flexDirection="column">
          <Text fontWeight="bold" color="blackAlpha.600">
            PANDUAN
          </Text>
          <Divider mb={2} />
          <Link href="/akademik" color="orange.600">
            Administrasi
            </Link>
          <Link color="orange.600">Penasihat Akademik</Link>
          <Link color="orange.600">Buku Saku Mahasiswa</Link>
          <Link color="orange.600">KTI Universitas</Link>
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
          <Link href="mailto:si@radenfatah.ac.id" color="orange.600" isExternal>
            E-Mail
            </Link>
          <Link
            color="orange.600"
            href="http://e-skripsi.radenfatah.ac.id/"
            isExternal
          >
            E-Skripsi
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
          <Link color="orange.600">Kurikulum</Link>
          <Link color="orange.600">Akreditasi</Link>
          <Link color="orange.600">Pedoman Edukasi</Link>
          <Link color="orange.600">Pendaftaran KKN</Link>
          <Link color="orange.600">Pendaftaran Tugas Akhir</Link>
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
          <Link color="orange.600">Pendaftaran Tugas Akhir</Link>
          <Link
            href="http://alumni.radenfatah.ac.id/"
            color="orange.600"
            isExternal
          >
            Alumni
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
      <Box bg="white" py="5" fontSize={{ base: "xs", xl: "md" }}>
        <Text color="black" textAlign="center" fontWeight="thin">
          Copyright ©
          <Link href="/">
            {" Sistem Informasi "}
          </Link>
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
    </>
  );
}

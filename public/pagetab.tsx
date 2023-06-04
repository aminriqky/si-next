import React from "react";
import {
  Text,
  Flex,
  Button,
  TabList,
  TabPanels,
  Tabs,
  Divider,
  useMediaQuery,
  AspectRatio,
  Img,
  Link
} from "@chakra-ui/react";
import "dayjs/locale/id";
import { FcSelfServiceKiosk } from "@react-icons/all-files/fc/FcSelfServiceKiosk";
import { FcPortraitMode } from "@react-icons/all-files/fc/FcPortraitMode";
import { FcKindle } from "@react-icons/all-files/fc/FcKindle";
import { FcSalesPerformance } from "@react-icons/all-files/fc/FcSalesPerformance";
import { FcSurvey } from "@react-icons/all-files/fc/FcSurvey";
import { FcButtingIn } from "@react-icons/all-files/fc/FcButtingIn";
import { FcQuestions } from "@react-icons/all-files/fc/FcQuestions";

interface TabProps {
  judul: string;
  tab: React.ReactNode;
  breadcrumb: React.ReactNode;
}

const PageTab: React.FC<TabProps> = (props) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <React.Fragment>
      {props.breadcrumb}
      <Flex bg="blue.600">
        <AspectRatio
          pointerEvents="none"
          opacity="0.2"
          h={{ base: "100px", xl: "200px" }}
          w="100%"
        >
          <Img
            src="/gambar.jpg"
            w="100%"
            alt="Gambar Slide"
          />
        </AspectRatio>
      </Flex>
      <Flex flexDir="row" my={{ base: "10%", xl: "80px" }} mx="6%">
        <Tabs
          isLazy
          isFitted
          variant="soft-rounded"
          colorScheme="green"
          orientation={isLargerThan1280 ? ("vertical") : ("horizontal")}
        >
          <Flex flexDir="column">
            <Text fontSize='sm'>{props.judul}</Text>
            <TabList flexWrap="wrap" my="1vw" w="100%">
              {props.tab}
            </TabList>
            <Divider borderColor="gray.400" />
            <Text mt="8%" fontSize='sm'>Aksi Cepat</Text>
            <Link href="/overview/sekilas-sistem-informasi">
              <Button w="full" leftIcon={<FcSelfServiceKiosk />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Sekilas Prodi Sistem Informasi
              </Button>
            </Link>
            <Link href="/overview/calon-mahasiswa">
              <Button w="full" leftIcon={<FcPortraitMode />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Calon Mahasiswa
              </Button>
            </Link>
            <Link href="/overview/beasiswa">
              <Button w="full" leftIcon={<FcKindle />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Beasiswa
              </Button>
            </Link>
            <Link href="/overview/prestasi">
              <Button w="full" leftIcon={<FcSalesPerformance />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Prestasi
              </Button>
            </Link>
            <Link href="/overview/profil-lulusan">
              <Button w="full" leftIcon={<FcSurvey />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Profil Lulusan
              </Button>
            </Link>
            <Link href="/overview/alumni">
              <Button w="full" leftIcon={<FcButtingIn />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                Alumni
              </Button>
            </Link>
            <Link href="/overview/faq">
              <Button w="full" leftIcon={<FcQuestions />} justifyContent="flex-start" rounded="md" mt="0.75vw">
                FAQ
              </Button>
            </Link>
          </Flex>
          <TabPanels>
            {props.children}
          </TabPanels>
        </Tabs>
      </Flex>
    </React.Fragment>
  );
};

export default PageTab;
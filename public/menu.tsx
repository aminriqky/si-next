import React from "react";
import { useRouter } from "next/router";
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Img,
  Flex,
  Link,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Box,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { FcCalendar } from "@react-icons/all-files/fc/FcCalendar";
import { FcCollaboration } from "@react-icons/all-files/fc/FcCollaboration";
import { FcDocument } from "@react-icons/all-files/fc/FcDocument";
import { FcViewDetails } from "@react-icons/all-files/fc/FcViewDetails";
import { FcFinePrint } from "@react-icons/all-files/fc/FcFinePrint";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface DrawerTitleProps {
  handleClick: React.MouseEventHandler;
  title: string;
}

function DrawerTitle(props: DrawerTitleProps) {
  return (
    <Button
      justifyContent="flex-start"
      color="teal.700"
      _hover={{ textDecoration: "none" }}
      _focusWithin={{ borderRadius: 5 }}
      onClick={props.handleClick}
      width="100%"
      mt="1"
    >
      {props.title}
    </Button>
  );
}

interface MenuTitleProps {
  handleClick?: React.MouseEventHandler;
  title: string;
}

function MenuTitle(props: MenuTitleProps) {
  return (
    <Box mt="1.5vw" mr="3vw" zIndex="1">
      <Link
        onClick={props.handleClick}
        _hover={{ color: "teal.400" }}
        fontSize={13}
        fontWeight="bold"
        color="white"
      >
        {props.title.toUpperCase()}
      </Link>
    </Box>
  );
}

interface MenuUtamaProps {
  pageHeight?: string;
  slide?: any;
}

const MenuUtama: React.FC<MenuUtamaProps> = (props) => {
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1279px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const home = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const profil = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/profil");
  };

  const kurikulum = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/akademik/kurikulum");
  };

  const pengabdian = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/akademik/pengabdian");
  };

  const kalender = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/akademik/kalender");
  };

  const haki = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/akademik/haki");
  };

  const penelitian = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/akademik/penelitian");
  };

  const dokumen = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dokumen");
  };

  const galeri = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/galeri");
  };

  const fasilitas = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/fasilitas");
  };

  const kemahasiswaan = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/news");
  };

  return (
    <Box bg="gray.500" w="100%" h={props.pageHeight}>
      {props.slide}
      <Flex py="2.5vw" zIndex="100" bgColor="black" flexDirection="row">
        <Box ml="8vw" mr={{ base: "4vw", xl: 0 }}>
          {isSmallerThan1280 && (
            <IconButton
              colorScheme="whiteAlpha"
              aria-label="Opsi"
              size="md"
              mt="1vw"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          )}
        </Box>
        <Link zIndex={999} onClick={home}>
          <Img
            width="100%"
            src="/white-logo.png"
            alt="Logo UIN RF Putih"
            maxW="250"
          />
        </Link>
        {isLargerThan1280 && (
          <Flex ml="auto" mr="5vw">
            <Menu>
              <MenuTitle title="Beranda" handleClick={home} />
              <MenuTitle title="Profil" handleClick={profil} />
              <MenuButton zIndex="100">
                <MenuTitle title="Akademik" />
              </MenuButton>
              <Portal>
                <MenuList zIndex="100" ml="-20px">
                  <MenuItem onClick={kurikulum}>
                    <Icon as={FcViewDetails} w="30px" h="auto" mr="10px" />
                    Kurikulum
                  </MenuItem>
                  <MenuItem onClick={pengabdian}>
                    <Icon as={FcCollaboration} w="30px" h="auto" mr="10px" />
                    Pengabdian Kepada Masyarakat
                  </MenuItem>
                  <MenuItem onClick={penelitian}>
                    <Icon as={FcFinePrint} w="30px" h="auto" mr="10px" />
                    Penelitian
                  </MenuItem>
                  <MenuItem onClick={kalender}>
                    <Icon as={FcCalendar} w="30px" h="auto" mr="10px" />
                    Kalender Akademik
                  </MenuItem>
                  <MenuItem onClick={haki}>
                    <Icon as={FcDocument} w="30px" h="auto" mr="10px" />
                    HaKI
                  </MenuItem>
                </MenuList>
              </Portal>
              <MenuTitle title="Dokumen" handleClick={dokumen} />
              <MenuTitle title="Galeri" handleClick={galeri} />
              <MenuTitle title="Fasilitas" handleClick={fasilitas} />
              <MenuTitle title="Berita" handleClick={kemahasiswaan} />
            </Menu>
          </Flex>
        )}
        <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton mt="2" />
              <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
              <DrawerBody>
                <DrawerTitle title="Beranda" handleClick={home} />
                <DrawerTitle title="Profil" handleClick={profil} />
                <Menu>
                  <MenuButton
                    textAlign="left"
                    color="teal.700"
                    width="100%"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Akademik
                  </MenuButton>
                  <MenuList w="122.5%">
                    <MenuItem onClick={kurikulum}>
                      <Icon as={FcViewDetails} w="30px" h="auto" mr="10px" />
                      Kurikulum
                    </MenuItem>
                    <MenuItem onClick={pengabdian}>
                      <Icon as={FcCollaboration} w="30px" h="auto" mr="10px" />
                      Pengabdian Kepada Masyarakat
                    </MenuItem>
                    <MenuItem onClick={penelitian}>
                      <Icon as={FcFinePrint} w="30px" h="auto" mr="10px" />
                      Penelitian
                    </MenuItem>
                    <MenuItem onClick={kalender}>
                      <Icon as={FcCalendar} w="30px" h="auto" mr="10px" />
                      Kalender Akademik
                    </MenuItem>
                    <MenuItem onClick={haki}>
                      <Icon as={FcDocument} w="30px" h="auto" mr="10px" />
                      HaKI
                    </MenuItem>
                  </MenuList>
                </Menu>
                <DrawerTitle title="Dokumen" handleClick={dokumen} />
                <DrawerTitle title="Galeri" handleClick={galeri} />
                <DrawerTitle title="Fasilitas" handleClick={fasilitas} />
                <DrawerTitle title="Berita" handleClick={kemahasiswaan} />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
      {props.children}
    </Box>
  );
};

export default MenuUtama;

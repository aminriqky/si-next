import React, { useEffect, useState } from "react";
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
  useMediaQuery
} from "@chakra-ui/react";
import { HamburgerIcon, ArrowUpIcon } from "@chakra-ui/icons";

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
    <Box mt="1vw" mr="3vw" zIndex="1">
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
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const home = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const profil = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/profil");
  };

  const akademik = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/akademik");
  };

  const dokumen = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dokumen");
  };

  const galeri = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/galeri");
  };

  const penelitian = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/penelitian");
  };

  const pengabdian = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/pengabdian");
  };

  const kemahasiswaan = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/kemahasiswaan");
  };

  return (
    <React.Fragment>
      <Box bg="whitesmoke" w="100%" h={props.pageHeight}>
        {props.slide}
        <Flex py="1vw" zIndex="100" bg="blue.700" flexDirection="row">
          <Box ml="6vw" mr={{ base: "3vw", xl: 0 }}>
            {isSmallerThan1280 && (
              <IconButton
                colorScheme="whiteAlpha"
                aria-label="Opsi"
                size="md"
                mt="0.75vw"
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
            <Flex ml="auto" mr="3vw">
              <Menu>
                <MenuTitle title="Beranda" handleClick={home} />
                <MenuTitle title="Profil" handleClick={profil} />
                <MenuTitle title="Akademik" handleClick={akademik} />
                <MenuTitle title="Dokumen" handleClick={dokumen} />
                <MenuTitle title="Galeri" handleClick={galeri} />
                <MenuTitle title="Penelitian" handleClick={penelitian} />
                <MenuTitle title="Pengabdian" handleClick={pengabdian} />
                <MenuTitle title="Kemahasiswaan" handleClick={kemahasiswaan} />
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
                  <DrawerTitle title="Akademik" handleClick={akademik} />
                  <DrawerTitle title="Dokumen" handleClick={dokumen} />
                  <DrawerTitle title="Galeri" handleClick={galeri} />
                  <DrawerTitle title="Pengabdian" handleClick={penelitian} />
                  <DrawerTitle title="Pengabdian" handleClick={pengabdian} />
                  <DrawerTitle title="Kemahasiswaan" handleClick={kemahasiswaan} />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
        {props.children}
      </Box>
      {isVisible && (
        <Box
          onClick={scrollToTop}
          position='fixed'
          bottom='20px'
          right={['16px', '84px']}
          zIndex={3}>
          <Button
            size={'sm'}
            rightIcon={<ArrowUpIcon />}
            colorScheme="teal"
            variant='solid'>
            Kembali Ke Atas
          </Button>
        </Box>
      )}
    </React.Fragment>
  );
};

export default MenuUtama;

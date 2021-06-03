import React from "react";
import { useRouter } from 'next/router'
import {
  Button, Text, useDisclosure, Drawer, DrawerBody, DrawerHeader, Img, Flex, Link,
  DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, Box
} from "@chakra-ui/react";
import useWindowDimensions from "./WindowDimensions";
import { HamburgerIcon } from '@chakra-ui/icons';

function DrawerTitle(props) {
  return (
    <Button width="100%" mt="1" justifyContent="flex-start" _focusWithin={{ borderRadius: 5 }} onClick={props.handleClick}
      _hover={{ textDecoration: "none" }} color="teal.700">
      {props.title}
    </Button>
  );
}

function MenuTitle(props) {
  return (
    <Box mr="3vw" mt="3vw" zIndex="1">
      <Link onClick={props.handleClick} _hover={{ textDecoration: "none" }} color="white" >
        <Text _hover={{ color: "teal.400" }} fontSize={13} as="b">
          {props.title.toUpperCase()}
        </Text>
      </Link>
    </Box>
  );
}

export default function Menu(props) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const home = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const akademik = (e) => {
    e.preventDefault()
    router.push('/akademik')
  }

  const dokumen = (e) => {
    e.preventDefault()
    router.push('/dokumen')
  }

  return (
    <>
      <Box bg="gray.700" w="100%" h={props.pageHeight} color="white">
        {props.slide}
        <Flex pt="2.5vw" zIndex="100" flexDirection="row">
          <Box mx="4vw" mt="2.25vw">
            {
              width < 1280 &&
              <IconButton variant="ghost" colorScheme="teal" aria-label="Opsi" size="lg" icon={<HamburgerIcon />} onClick={onOpen} />
            }
          </Box>
          <Box mr={{ xl: "14vw", "2xl": "24vw" }} mt="1.5vw" onClick={home}>
            <Img src="/white-logo.png" alt="Logo UIN RF Putih" maxW="250" />
          </Box>
          {
            width >= 1280 &&
            <>
              <MenuTitle title="Beranda" handleClick={home} />
              <MenuTitle title="Akademik" handleClick={akademik} />
              <MenuTitle title="Dokumen" handleClick={dokumen} />
              <MenuTitle title="Galeri" />
              <MenuTitle title="Fasilitas" />
              <MenuTitle title="Kemahasiswaan" />
            </>
          }
          <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton mt="2" />
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                  <DrawerTitle title="Beranda" handleClick={home} />
                  <DrawerTitle title="Akademik" handleClick={akademik} />
                  <DrawerTitle title="Dokumen" handleClick={dokumen} />
                  <DrawerTitle title="Galeri" />
                  <DrawerTitle title="Fasilitas" />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
        {props.slideShow}
        {props.children}
      </Box>
    </>
  );
}

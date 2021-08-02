import { useRouter } from 'next/router'
import {
  Button, useDisclosure, Drawer, DrawerBody, DrawerHeader, Img, Flex, Link,
  DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, Box, Menu,
  MenuButton, Portal, MenuList, MenuItem, Icon
} from "@chakra-ui/react";
import { FcCalendar, FcCollaboration, FcDocument, FcViewDetails } from "react-icons/fc";
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
      <Link onClick={props.handleClick}
        color="white"
        _hover={{ color: "teal.400" }}
        fontSize={13}
        fontWeight="bold"
      >
        {props.title.toUpperCase()}
      </Link>
    </Box>
  );
}

export default function MenuUtama(props) {
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
          <Box mr={{ xl: "14vw", "2xl": "18vw" }} mt="1.5vw" onClick={home}>
            <Img width="100%" src="/white-logo.png" alt="Logo UIN RF Putih" maxW="250" />
          </Box>
          {
            width >= 1280 &&
            <>
              <Menu>
                <MenuTitle title="Beranda" handleClick={home} />
                <MenuTitle title="Profil" />
                <MenuButton zIndex="100">
                  <MenuTitle title="Akademik" handleClick={dokumen} />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem>
                      <Icon as={FcViewDetails} w="30px" h="auto" mr="10px" />
                      Kurikulum
                    </MenuItem>
                    <MenuItem>
                      <Icon as={FcCollaboration} w="30px" h="auto" mr="10px" />
                      Pengabdian
                    </MenuItem>
                    <MenuItem>
                      <Icon as={FcCalendar} w="30px" h="auto" mr="10px" />
                      Kalender Akademik
                    </MenuItem>
                    <MenuItem>
                      <Icon as={FcDocument} w="30px" h="auto" mr="10px" />
                      HaKI
                    </MenuItem>
                  </MenuList>
                </Portal>
                <MenuTitle title="Dokumen" />
                <MenuTitle title="Galeri" />
                <MenuTitle title="Fasilitas" />
                <MenuTitle title="Kemahasiswaan" />
              </Menu>
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

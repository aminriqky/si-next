import { useRouter } from 'next/router'
import {
  Button, useDisclosure, Drawer, DrawerBody, DrawerHeader, Image, Flex, Link,
  DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, Box, Menu,
  MenuButton, Portal, MenuList, MenuItem, Icon, useMediaQuery
} from "@chakra-ui/react";
import { FcCalendar, FcCollaboration, FcDocument, FcViewDetails } from "react-icons/fc";
import { HamburgerIcon } from '@chakra-ui/icons';

function DrawerTitle(props) {
  return (
    <Button justifyContent="flex-start" color="teal.700" _hover={{ textDecoration: "none" }}
      _focusWithin={{ borderRadius: 5 }} onClick={props.handleClick} width="100%" mt="1" >
      {props.title}
    </Button>
  );
}

function MenuTitle(props) {
  return (
    <Box mr="3vw" mt="3vw" zIndex="1">
      <Link onClick={props.handleClick} _hover={{ color: "teal.400" }}
        fontSize={13} fontWeight="bold" color="white">
        {props.title.toUpperCase()}
      </Link>
    </Box>
  );
}

export default function MenuUtama(props) {
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)")
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const home = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const profil = (e) => {
    e.preventDefault()
    router.push('/profil')
  }

  const kurikulum = (e) => {
    e.preventDefault()
    router.push('/akademik/kurikulum')
  }

  const pengabdian = (e) => {
    e.preventDefault()
    router.push('/akademik/pengabdian')
  }

  const kalender = (e) => {
    e.preventDefault()
    router.push('/akademik/kalender')
  }

  const haki = (e) => {
    e.preventDefault()
    router.push('/akademik/haki')
  }

  const dokumen = (e) => {
    e.preventDefault()
    router.push('/dokumen')
  }

  const galeri = (e) => {
    e.preventDefault()
    router.push('/galeri')
  }

  return (
    <Box bg="gray.700" w="100%" h={props.pageHeight} color="white">
      {props.slide}
      <Flex pt="2.5vw" zIndex="100" flexDirection="row">
        <Box ml="8vw" mr={{ base: "4vw", xl: 0 }} mt="2.5vw">
          {
            isSmallerThan1280 &&
            <IconButton
              colorScheme="whiteAlpha"
              aria-label="Opsi"
              size="md"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          }
        </Box>
        <Link mt="1.5vw" zIndex={999} onClick={home}>
          <Image width="100%" src="/white-logo.png" alt="Logo UIN RF Putih" maxW="250" />
        </Link>
        {
          isLargerThan1280 &&
          <Flex ml="auto" mr="5vw">
            <Menu>
              <MenuTitle title="Beranda" handleClick={home} />
              <MenuTitle title="Profil" handleClick={profil} />
              <MenuButton zIndex="100">
                <MenuTitle title="Akademik" />
              </MenuButton>
              <Portal>
                <MenuList ml="-20px">
                  <MenuItem onClick={kurikulum}>
                    <Icon as={FcViewDetails} w="30px" h="auto" mr="10px" />
                    Kurikulum
                  </MenuItem>
                  <MenuItem onClick={pengabdian}>
                    <Icon as={FcCollaboration} w="30px" h="auto" mr="10px" />
                    Pengabdian
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
              <MenuTitle title="Fasilitas" />
              <MenuTitle title="Kemahasiswaan" />
            </Menu>
          </Flex>
        }
        <Drawer zIndex={9999} placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton mt="2" />
              <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
              <DrawerBody>
                <DrawerTitle title="Beranda" handleClick={home} />
                <DrawerTitle title="Profil" handleClick={profil} />
                <DrawerTitle title="Akademik" />
                <DrawerTitle title="Dokumen" handleClick={dokumen} />
                <DrawerTitle title="Galeri" />
                <DrawerTitle title="Fasilitas" />
                <DrawerTitle title="Kemahasiswaan" />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
      {props.slideShow}
      {props.children}
    </Box>
  );
}

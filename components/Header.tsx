import {
  IconButton,
  HStack,
  Center,
  Link,
  Spacer,
  useBreakpointValue,
  useDisclosure,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { AccountButton, AccountModal } from "./account"
import NavLogotypeButton from "./nav/logotype"
import { ButtonGroup, Container } from "@chakra-ui/react"
import { Button } from "@chakra-ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDiscord,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

export const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isMobileOpen,
    onOpen: onMobileOpen,
    onClose: onMobileClose,
  } = useDisclosure()

  const isMobile = useBreakpointValue({ base: true, xl: false })

  const handleScroll = (id: string) => {
    onMobileClose()
    if (isMobile) {
      setTimeout(function () {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        })
      }, 400)
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  return (
    <Center position="fixed" w="100vw" zIndex="100">
      <Container maxW="container.xl" p={0}>
        <Stack
          p="1em"
          top={0}
          w="100%"
          zIndex={6}
          backdropFilter="blur(8px)"
          alignItems="center"
        >
          <HStack h={10} w="100%" justifyContent="space-between">
            <HStack>
              <NavLogotypeButton />
              {!isMobile && <AccountButton onOpen={onOpen} />}
            </HStack>

            {isMobile && <Spacer />}
            {isMobile && (
              <IconButton
                ml="0 !important"
                mr="-1em !important"
                size="lg"
                color="white"
                aria-label="menu"
                variant="unstyled"
                icon={<FontAwesomeIcon icon={faBars} />}
                onClick={onMobileOpen}
              />
            )}

            {!isMobile && <Spacer />}

            <HStack alignItems="center" pr="4">
              {!isMobile && (
                <>
                  <ButtonGroup spacing="2em" alignItems="center">
                    <>
                      <Button
                        as={Link}
                        variant="link"
                        fontSize="small"
                        colorScheme="primary"
                        fontStyle="italic"
                        color="white"
                        onClick={() => handleScroll("mint")}
                      >
                        MINT AN ALIEN
                      </Button>

                      <Button
                        as={Link}
                        variant="link"
                        fontSize="small"
                        colorScheme="primary"
                        fontStyle="italic"
                        color="white"
                        onClick={() => handleScroll("about")}
                      >
                        ABOUT
                      </Button>
                      <Button
                        as={Link}
                        variant="link"
                        fontSize="small"
                        colorScheme="primary"
                        fontStyle="italic"
                        color="white"
                        onClick={() => {
                          handleScroll("carbonize")
                        }}
                      >
                        CARBONIZE
                      </Button>
                      <Button
                        as={Link}
                        variant="link"
                        fontSize="small"
                        colorScheme="primary"
                        fontStyle="italic"
                        color="white"
                        onClick={() => handleScroll("roadmap")}
                      >
                        ROADMAP
                      </Button>
                      <Button
                        as={Link}
                        fontSize="small"
                        fontStyle="italic"
                        variant="link"
                        colorScheme="primary"
                        color="white"
                        onClick={() => handleScroll("faq")}
                      >
                        FAQ
                      </Button>
                    </>
                  </ButtonGroup>
                  <Socials />
                </>
              )}
            </HStack>
          </HStack>
        </Stack>
        <AccountModal isOpen={isOpen} onClose={onClose} />
        <Drawer
          closeOnOverlayClick={true}
          size="xs"
          isOpen={isMobileOpen}
          placement="right"
          onClose={onMobileClose}
        >
          <DrawerOverlay />
          <DrawerContent
            boxShadow="none"
            border="none"
            backgroundColor="transparent"
          >
            <DrawerCloseButton />

            <VStack mt="3em" alignItems="flex-end" mr="1em">
              <Stack
                onClick={() => {
                  if (isMobile) onMobileClose()
                }}
              >
                <AccountButton
                  onOpen={() => {
                    onOpen()
                  }}
                />
              </Stack>
              <Button
                as={Link}
                variant="link"
                fontSize="small"
                colorScheme="primary"
                fontStyle="italic"
                color="white"
                onClick={() => handleScroll("mint")}
              >
                MINT AN ALIEN
              </Button>

              <Button
                as={Link}
                variant="link"
                fontSize="small"
                colorScheme="primary"
                fontStyle="italic"
                color="white"
                onClick={() => handleScroll("carbonize")}
              >
                CARBONIZE
              </Button>
              <Button
                as={Link}
                variant="link"
                fontSize="small"
                colorScheme="primary"
                fontStyle="italic"
                color="white"
                onClick={() => handleScroll("roadmap")}
              >
                ROADMAP
              </Button>

              <Button
                as={Link}
                variant="link"
                fontSize="small"
                colorScheme="primary"
                fontStyle="italic"
                color="white"
                onClick={() => handleScroll("about")}
              >
                ABOUT
              </Button>

              <Button
                as={Link}
                fontSize="small"
                fontStyle="italic"
                variant="link"
                colorScheme="primary"
                color="white"
                onClick={() => handleScroll("faq")}
              >
                FAQ
              </Button>
              <Socials />
            </VStack>
          </DrawerContent>
        </Drawer>
      </Container>
    </Center>
  )
}

export const Socials = () => {
  return (
    <ButtonGroup ml="5em !important" spacing="-.5em">
      <Link target="_blank" href="https://twitter.com/celostrials">
        <IconButton
          color="white"
          ml="0 !important"
          size="sm"
          aria-label="twitter"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTwitter} />}
        />
      </Link>
      <Link target="_blank" href="https://www.instagram.com/celostrials/">
        <IconButton
          ml="0 !important"
          color="white"
          size="sm"
          aria-label="twitter"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faInstagram} />}
        />
      </Link>
      <Link target="_blank" href="https://discord.com/invite/qgCWPrkWaW">
        <IconButton
          ml="0 !important"
          color="white"
          size="sm"
          aria-label="twitter"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faDiscord} />}
        />
      </Link>
    </ButtonGroup>
  )
}

import { Box, Center, Flex, useColorModeValue as mode } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Header } from "../components"
import { Footer } from "../components/Footer"

const image =
  "https://res.cloudinary.com/resource-network/image/upload/v1651186746/resource-protocol/nibera/3_xrl3sh.jpg"

export const Layout = ({ children }: { children?: ReactNode }) => (
  <>
    <div className="stars"></div>
    <div className="twinkling"></div>
    <Header />
    <Flex
      // pt={"5em"}
      zIndex={1}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      as="main"
    >
      {children}
    </Flex>
    <Footer />
  </>
)

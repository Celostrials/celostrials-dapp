// imports
import {
  Center,
  Flex,
  IconButton,
  Box,
  Input,
  Link,
  useColorMode,
} from "@chakra-ui/react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { nanoid } from "nanoid"
import { useRouter } from "next/router"
import { ChangeEvent, useCallback } from "react"
import { useState } from "react"

import {
  contracts,
  joinUs,
  learnMore,
  resources,
  socials,
  trade,
} from "../config/data"

// images
const logotypeWhiteSrcName = "/brand/resource-logotype-white_osat1c.svg"
const logotypeBlackSrcName = "/brand/resource-logotype-black_lsczap.svg"

// for email capture
const apiKey = process.env.REACT_APP_CIO_API_KEY
const siteId = process.env.REACT_APP_CIO_SITE_ID
const writeToken = process.env.REACT_APP_SEGMENT_WRITE_KEY

export const Footer = () => {
  return <></>
}

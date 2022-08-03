import { Image, Link } from "@chakra-ui/react"
import { LOGOTYPE } from "../../public/images"
import { useRouter } from "next/router"

const NavLogotypeButton = () => {
  const router = useRouter()

  return (
    <Link
      onClick={() => router.push("/")}
      w={"15em"}
      _active={{ boxShadow: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Image minW={"15em"} src={LOGOTYPE.dark} alt={LOGOTYPE.alt} />
    </Link>
  )
}

export default NavLogotypeButton

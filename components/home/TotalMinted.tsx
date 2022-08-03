import { useState, useEffect } from "react"
import { useInterval } from "react-use"
import { HStack, Text, Spinner } from "@chakra-ui/react"
import colors from "../../styles/theme/foundations/colors"
import { useCelo } from "@celo/react-celo"
import { useCelostrialsContract } from "../../hooks/useCelostrialsContract"

export const TotalMintedInfo = () => {
  const [maxSupply, setMaxSupply] = useState("1500")
  const [totalSupply, setTotalSupply] = useState("----")

  const { totalSupply: getTotalSupply, maxSupply: getMaxSupply } =
    useCelostrialsContract()

  const { connect, initialised, address } = useCelo()

  useInterval(async () => {
    console.log("checking total supply")
    const _totalSupply = Number(await getTotalSupply())
    if (_totalSupply != undefined) {
      setTotalSupply(
        _totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      )
    }
  }, 2000)

  useEffect(() => {
    async function loadBalance() {
      const _maxSupply = Number(await getMaxSupply())
      const _totalSupply = Number(await getTotalSupply())
      setMaxSupply(
        _maxSupply
          ? _maxSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "0",
      )
      setTotalSupply(
        _totalSupply
          ? _totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "0",
      )
    }
    loadBalance()
  }, [initialised, address, connect, getMaxSupply, getTotalSupply])
  return (
    <HStack alignSelf="center" m="1em !important">
      <Text color={colors.orange.dark}>
        {totalSupply === "0" ? <Spinner /> : totalSupply}
      </Text>
      <Text ml=".4em !important" color={colors.gray.cement}>
        {" "}
        / {maxSupply === "0" ? <Spinner /> : maxSupply} MINTED
      </Text>
    </HStack>
  )
}

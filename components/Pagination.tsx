import ReactPagination from "react-js-pagination"
import { Box, BoxProps, useBreakpointValue } from "@chakra-ui/react"

interface PaginationProps extends BoxProps {
  pageSize: number
  total: number
  current: number
  handleChange: (page: number) => void
}

const Pagination = ({
  current,
  pageSize,
  total,
  handleChange,
  ...rest
}: PaginationProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (isMobile && total <= pageSize) return null

  return (
    <Box visibility={total <= pageSize ? "hidden" : "visible"} {...rest}>
      <ReactPagination
        activePage={current > 0 ? current : 1}
        itemsCountPerPage={pageSize}
        totalItemsCount={total}
        pageRangeDisplayed={5}
        onChange={handleChange}
        hideDisabled={true}
      />
    </Box>
  )
}

export default Pagination

import { Box, Flex, Link as ChakraLink, Spacer, Heading } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <Box bg="blue.500" color="white" px={6} py={4} boxShadow="sm">
      <Flex align="center">
        <Heading size="md">
          <Link to="/">FSS Hockey</Link>
        </Heading>
        <Spacer />
        <Flex gap={4}>
          <ChakraLink as={Link} to="/">Home</ChakraLink>
          <ChakraLink as={Link} to="/teams">Teams</ChakraLink>
        </Flex>
      </Flex>
    </Box>
  )
}

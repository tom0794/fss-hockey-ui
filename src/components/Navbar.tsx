// src/components/Navbar.tsx
import {
  Box,
  Flex,
  Link as ChakraLink,
  Spacer,
  Heading,
  IconButton,
  useColorMode
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg="blue.500" color="white" px={6} py={4} boxShadow="sm">
      <Flex align="center">
        <Heading size="md">
          <Link to="/">FSS Hockey</Link>
        </Heading>
        <Spacer />
        <Flex align="center" gap={4}>
          <ChakraLink as={Link} to="/">Home</ChakraLink>
          <ChakraLink as={Link} to="/teams">Teams</ChakraLink>
          <ChakraLink as={Link} to="/debug">Debug</ChakraLink>
          <IconButton
            size="sm"
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            variant="ghost"
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  )
}

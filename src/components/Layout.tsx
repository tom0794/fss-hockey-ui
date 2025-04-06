import { Box, Container } from "@chakra-ui/react"
import Navbar from "./Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Navbar />
      <Container maxW="6xl" pt={6}>
        {children}
      </Container>
    </Box>
  )
}

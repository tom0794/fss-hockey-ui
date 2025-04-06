import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)

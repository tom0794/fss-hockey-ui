// src/App.tsx
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Teams from "./pages/Teams"
import Debug from "./pages/Debug"
import Layout from "./components/Layout"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/teams"
        element={
          <Layout>
            <Teams />
          </Layout>
        }
      />
      <Route
        path="/debug"
        element={
          <Layout>
            <Debug />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App

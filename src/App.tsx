// src/App.tsx
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Teams from "./pages/Teams"
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
    </Routes>
  )
}

export default App

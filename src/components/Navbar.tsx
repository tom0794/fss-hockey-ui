import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: '1rem', background: '#f4f4f4' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/players" style={{ marginRight: '1rem' }}>Players</Link>
      <Link to="/teams">Teams</Link>
    </nav>
  )
}

export default Navbar

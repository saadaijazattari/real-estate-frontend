import React from 'react'
import './Navbar.scss'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='left'>
        <a href="/" className='logo'>
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className='right'>
        <a href="/">sign in</a>
        <a href="/">sign up</a>
      </div>
    </nav>
  )
}

export default Navbar
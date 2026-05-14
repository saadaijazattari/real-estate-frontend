import React, { useState } from 'react'
import './Navbar.scss'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
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
        <a href="/" className='register'>sign up</a>
        <div className='menuIcon'>
          <img src="/menu.png" alt="" 
          onClick={()=> setIsOpen((prev)=> !prev)}/>
        </div>
        <div className={isOpen ? "menu active" : "menu"}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
        <a href="/">SignIn</a>
        <a href="/">SignUp</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
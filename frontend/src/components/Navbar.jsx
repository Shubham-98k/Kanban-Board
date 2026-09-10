import React, { useState } from "react"
import { MdClose, MdMenu } from "react-icons/md"
import SideMenu from "./SideMenu.jsx"

const Navbar = ({ activeMenu }) => {
  // State to track if the mobile side menu is open (true) or closed (false)
  const [openSideMenu, setOpenSideMenu] = useState(false) 

  return (
    // 'sticky top-0' keeps it glued to the top. 'justify-between' pushes the button and text to opposite ends.
    <header className="sticky top-0 flex justify-between">
      
      <div className="flex">
        {/* 'lg:hidden' ensures this hamburger button ONLY shows on mobile/tablets, never desktop */}
        <button
          className="lg:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)} // Flips the state between true and false on click
        >
          {/* If open, show an 'X' icon. If closed, show the hamburger menu icon */}
          {openSideMenu ? <MdClose /> : <MdMenu />} 
        </button>

      </div>

      {/* If openSideMenu is TRUE, render the HTML below. If FALSE, ignore it completely. */}
      {openSideMenu && (
        
        // 'fixed inset-0' creates a fullscreen overlay spanning all 4 corners of the browser.
        // 'z-40' elevates it above the rest of the page content.
        <div className="fixed inset-0 flex lg:hidden z-40">
          
          {/* This is the clickable background area. Clicking it closes the menu. */}
          <div 
            className="fixed inset-0" 
            onClick={() => setOpenSideMenu(false)} 
          />
          
          {/* 'relative z-50' puts the drawer box ON TOP of the clickable background. */}
          {/* 'w-72' sets drawer width to 288px. 'bg-white' makes it solid so you can't see through it. */}
          <div className="relative w-72 h-full bg-white z-50">
            <SideMenu activeMenu={activeMenu} /> {/* We reuse the SideMenu component here for mobile! */}
          </div>

        </div>
      )}
    </header>
  )
}

export default Navbar
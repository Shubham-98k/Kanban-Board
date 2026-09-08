import React from "react"
import SideMenu from "./SideMenu"
import Navbar from "./Navbar"

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Permanent Desktop Sidebar Rail */}
      <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white">
        <SideMenu activeMenu={activeMenu} />
      </aside>

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <Navbar activeMenu={activeMenu} />
        
        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout
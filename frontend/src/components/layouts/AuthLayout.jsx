import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
  {/* Left Panel: Scrollable Form Space */}
  <div className="w-full md:w-1/2 overflow-y-auto">
    <div className="min-h-full flex flex-col px-12 pt-8 pb-12">
      <div className="grow flex items-center justify-center">
        {children}
      </div>
    </div>
  </div>

  {/* Right Panel: Hero Grasphic (Desktop Only) */}
  <div className="hidden md:block w-1/2">
    <img 
      src="/hero.png" 
      alt="Background" 
      className="h-full w-full object-cover" 
    />
  </div>
</div>
  )
}

export default AuthLayout
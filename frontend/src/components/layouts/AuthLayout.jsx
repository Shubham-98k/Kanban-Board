import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden" >
      {children}
    </div>
  )
}

export default AuthLayout
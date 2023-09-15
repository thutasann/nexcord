import React from 'react'

interface IAuthLayout {
  children: React.ReactNode
}

function AuthLayout({ children }: IAuthLayout) {
  return <div className="bg-red-500 h-[100vh]">{children}</div>
}

export default AuthLayout

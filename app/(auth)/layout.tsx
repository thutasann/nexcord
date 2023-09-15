import React from 'react'

interface IAuthLayout {
  children: React.ReactNode
}

function AuthLayout({ children }: IAuthLayout) {
  return <div className="h-full flex items-center justify-center">{children}</div>
}

export default AuthLayout

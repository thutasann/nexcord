import React from 'react'

interface IMainLayout {
  children: React.ReactNode
}

async function MainLayout({ children }: IMainLayout) {
  return <div>{children}</div>
}

export default MainLayout

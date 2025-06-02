"use client"

import { SessionProvider } from "next-auth/react"
import React from "react"

const SessionWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    <SessionProvider>{children}</SessionProvider> // holds session information and shares it with children components
  )
}

export default SessionWrapper;
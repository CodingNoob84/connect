"use client"

const { SessionProvider } = require("next-auth/react")

const AuthProvider = ({children})=>{
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider;
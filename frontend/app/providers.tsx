'use client'

import {ThemeProvider} from '@/components/theme/theme-provider'
import {NextUIProvider} from '@nextui-org/react'
import { AuthenticationContextProvider } from './(contexts)/AuthenticationContext'

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthenticationContextProvider>
            <NextUIProvider>
                    {children}
            </NextUIProvider>
            </AuthenticationContextProvider>
        </ThemeProvider>
    )
}
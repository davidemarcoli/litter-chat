'use client'

import {ThemeProvider} from '@/components/theme/theme-provider'
import {NextUIProvider} from '@nextui-org/react'
import { AuthenticationContextProvider } from './(contexts)/AuthenticationContext'
import { DataContextProvider } from './(contexts)/DataContext'

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >            
            <NextUIProvider>
                <AuthenticationContextProvider>
                    <DataContextProvider>
                    {children}
                    </DataContextProvider>
                </AuthenticationContextProvider>
            </NextUIProvider>
        </ThemeProvider>
    )
}
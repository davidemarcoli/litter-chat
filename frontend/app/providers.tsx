'use client'

import {ThemeProvider} from '@/components/theme/theme-provider'
import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ThemeProvider>
    )
}
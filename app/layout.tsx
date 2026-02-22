import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/ThemeProvider'
import SmoothScrolling from '@/components/SmoothScrolling'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Tanveen's Protfolio",
    description: 'A premium MERN Stack Developer portfolio showcasing cutting-edge web animations and stunning visual design.',
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/icon.png' }
        ],
        apple: '/icon.png',
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SmoothScrolling>
                        {children}
                    </SmoothScrolling>
                </ThemeProvider>
            </body>
        </html>
    )
}

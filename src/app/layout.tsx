'use client'
import BottomNav from '@/component/bottom-navigation'
import './globals.css'
import { Poppins } from 'next/font/google'
import Nav from '@/component/nav'
import {NextUIProvider} from "@nextui-org/react";

const poppins = Poppins(
  {
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  }
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <NextUIProvider>
       <Nav />
        {children}
        <BottomNav /> 
        </NextUIProvider>
        </body>
    </html>
  )
}
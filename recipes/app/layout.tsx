"use client"
import Provider from '@/components/Provider'
import './globals.css'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import NavBar2 from '@/components/NavBar2'
import Nav from '@/components/ResponsiveNavBar/Nav'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <Provider>
          <body className={` bg-gray-100 ${inter.className} min-h-screen max-h-max text-white`}>
            <div className='relative z-50'>
              <Nav />
            </div>
            <div className='relative z-0 flex flex-col flex-wrap justify-center content-center'>
              {children}
            </div>
          </body>
      </Provider>
    </QueryClientProvider>
    </html>
  )
}

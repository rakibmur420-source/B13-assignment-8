import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CommonLayout({ children }) {
	return (
		<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
			<Navbar />
			<main className='min-h-screen'>{children}</main>
			<Footer />
			<ToastContainer />
		</ThemeProvider>
	)
}
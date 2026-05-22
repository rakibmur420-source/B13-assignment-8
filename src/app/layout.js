import { Plus_Jakarta_Sans, Sora } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
	variable: '--font-plus-jakarta',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

const sora = Sora({
	variable: '--font-sora',
	subsets: ['latin'],
	weight: ['400', '600', '700', '800'],
})

export const metadata = {
	title: 'SkillSphere – Learn. Grow. Succeed.',
	description: 'A modern online learning platform where you can explore courses, learn from industry experts, and upgrade your skills.',
}

export default function RootLayout({ children }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${plusJakarta.variable} ${sora.variable} h-screen antialiased`}
		>
			<body className='min-h-full flex flex-col font-(--font-plus-jakarta)'>
				<main className='min-h-screen'>{children}</main>
			</body>
		</html>
	)
}

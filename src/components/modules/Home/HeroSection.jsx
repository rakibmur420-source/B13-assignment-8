'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

const HeroSection = () => {
	return (
		<header className='relative overflow-hidden min-h-screen flex items-center bg-background text-foreground'>
			{/* Animated gradient background */}
			<div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary pointer-events-none' />
			<div className='absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none' />
			<div className='absolute bottom-10 left-10 w-56 h-56 rounded-full bg-primary/8 blur-2xl pointer-events-none' />
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20'>
				<div className='text-center'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<span className='inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/25 backdrop-blur-md'>
							🚀 Online Learning Platform
						</span>
					</motion.div>

					<motion.h1
						className='text-5xl lg:text-7xl font-bold mb-6 leading-tight text-foreground'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						Upgrade Your Skills{' '}
						<span className='text-primary'>Today 🚀</span>
					</motion.h1>

					<motion.p
						className='max-w-2xl mx-auto text-lg text-muted-foreground mb-10'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						Learn from Industry Experts. Explore hundreds of courses in Web
						Development, Design, Marketing, Data Science and more. Start your
						journey today — completely free.
					</motion.p>

					<motion.div
						className='flex flex-wrap justify-center gap-4 mb-16'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<Link
							href='/courses'
							className='px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full shadow-lg hover:opacity-90 hover:-translate-y-1 transition-all'
						>
							Explore Courses
						</Link>
						<Link
							href='/register'
							className='px-8 py-4 bg-secondary text-foreground font-bold rounded-full border border-border hover:bg-hover transition-all'
						>
							Get Started Free
						</Link>
					</motion.div>

					{/* Stats */}
					<motion.div
						className='flex flex-wrap justify-center gap-8 md:gap-16'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						{[
							{ value: '50+', label: 'Courses' },
							{ value: '10K+', label: 'Students' },
							{ value: '20+', label: 'Instructors' },
							{ value: '4.8★', label: 'Avg Rating' },
						].map((stat) => (
							<div key={stat.label} className='text-center'>
								<div className='text-3xl font-bold text-primary'>{stat.value}</div>
								<div className='text-sm text-muted-foreground mt-1'>
									{stat.label}
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</header>
	)
}

export default HeroSection

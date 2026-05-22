'use client'

import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className='border-t border-white/10 bg-[#0a0b14] text-white transition-colors duration-300'>
			<div className='container mx-auto px-6 py-14'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-10 mb-10'>
					{/* Brand */}
					<div className='md:col-span-2'>
						<div className='flex items-center gap-2 mb-4'>
							<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary'>
								<GraduationCap className='text-primary-foreground' size={20} />
							</div>
							<span className='text-2xl font-bold text-white'>SkillSphere</span>
						</div>
						<p className='text-zinc-400 text-sm leading-7 max-w-sm mb-6'>
							Empowering learners worldwide with quality online education. Learn
							from industry experts, earn certificates, and level up your career.
						</p>
						<div className='flex gap-3'>
							{[
								{ icon: <FaFacebookF size={15} />, href: '#' },
								{ icon: <FaTwitter size={15} />, href: '#' },
								{ icon: <FaLinkedinIn size={15} />, href: '#' },
								{ icon: <FaYoutube size={16} />, href: '#' },
							].map((s, i) => (
								<a
									key={i}
									href={s.href}
									className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-primary hover:text-white'
								>
									{s.icon}
								</a>
							))}
						</div>
					</div>

					{/* Links */}
					<div>
						<h3 className='font-bold text-white mb-4 uppercase text-xs tracking-widest'>
							Platform
						</h3>
						<ul className='space-y-2 text-sm text-zinc-400'>
							<li>
								<Link href='/' className='hover:text-primary transition-colors'>
									Home
								</Link>
							</li>
							<li>
								<Link
									href='/courses'
									className='hover:text-primary transition-colors'
								>
									All Courses
								</Link>
							</li>
							<li>
								<Link
									href='/profile'
									className='hover:text-primary transition-colors'
								>
									My Profile
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className='font-bold text-white mb-4 uppercase text-xs tracking-widest'>
							Contact
						</h3>
						<ul className='space-y-2 text-sm text-zinc-400'>
							<li>📧 support@skillsphere.com</li>
							<li>📞 +880 1700-000000</li>
							<li>📍 Dhaka, Bangladesh</li>
						</ul>
						<div className='mt-4 flex flex-col gap-1 text-sm text-zinc-500'>
							<a href='#' className='hover:text-primary transition-colors'>
								Terms & Conditions
							</a>
							<a href='#' className='hover:text-primary transition-colors'>
								Privacy Policy
							</a>
						</div>
					</div>
				</div>

				<div className='border-t border-white/10 pt-6 text-center text-sm text-zinc-500'>
					© {new Date().getFullYear()} SkillSphere. All rights reserved. Built
					with ❤️ for learners.
				</div>
			</div>
		</footer>
	)
}

export default Footer

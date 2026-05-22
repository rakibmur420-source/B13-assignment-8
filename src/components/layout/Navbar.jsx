'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Avatar, Button, Dropdown } from '@heroui/react'
import { Menu, GraduationCap } from 'lucide-react'
import ThemeToggler from '@/lib/ThemeToggler'
import { authClient } from '@/lib/auth-client'

const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Courses', href: '/courses' },
]

const Navbar = () => {
	const router = useRouter()
	const { data: session, isPending } = authClient.useSession()
	const user = session?.user

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success('Logged out successfully 👋', {
						position: 'top-right',
						autoClose: 3000,
					})
					router.push('/')
					router.refresh()
				},
			},
		})
	}

	return (
		<nav className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl'>
			<header className='container mx-auto flex items-center justify-between py-4 px-4'>
				{/* Logo */}
				<Link href='/' className='group flex items-center gap-2'>
					<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg transition-transform duration-300 group-hover:scale-105'>
						<GraduationCap className='text-primary-foreground' size={22} />
					</div>
					<div className='hidden flex-col md:flex'>
						<span className='text-xl font-bold tracking-tight text-foreground'>
							SkillSphere
						</span>
						<span className='text-xs text-muted-foreground'>
							Learn. Grow. Succeed.
						</span>
					</div>
				</Link>

				{/* Desktop Nav */}
				<ul className='hidden items-center gap-8 md:flex'>
					{navLinks.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className='font-medium text-foreground transition-colors duration-200 hover:text-primary'
							>
								{link.label}
							</Link>
						</li>
					))}
					{user && (
						<li>
							<Link
								href='/profile'
								className='font-medium text-foreground transition-colors duration-200 hover:text-primary'
							>
								My Profile
							</Link>
						</li>
					)}
				</ul>

				{/* Right Side */}
				<div className='flex items-center gap-3'>
					<div className='rounded-full border border-border bg-secondary p-1'>
						<ThemeToggler />
					</div>

					{isPending && (
						<div className='h-10 w-24 animate-pulse rounded-2xl bg-muted' />
					)}

					{/* Logged In Desktop */}
					{!isPending && user && (
						<div className='hidden items-center gap-3 md:flex'>
							<div className='flex flex-col items-end'>
								<span className='text-sm font-semibold text-foreground'>
									{user.name}
								</span>
								<span className='text-xs text-muted-foreground'>{user.email}</span>
							</div>
							<Link href='/profile'>
								<Avatar
									src={user.image || ''}
									name={user.name || 'User'}
									size='sm'
									isBordered
									color='primary'
									className='cursor-pointer ring-2 ring-border transition-transform hover:scale-105'
								/>
							</Link>
							<Button
								size='sm'
								variant='flat'
								onPress={handleLogout}
								className='border border-border bg-secondary font-medium text-foreground transition-colors hover:bg-hover'
							>
								Logout
							</Button>
						</div>
					)}

					{/* Logged Out Desktop */}
					{!isPending && !user && (
						<div className='hidden items-center gap-2 md:flex'>
							<Button
								asChild
								size='sm'
								variant='light'
								className='font-medium text-foreground transition-colors hover:bg-hover'
							>
								<Link href='/login'>Login</Link>
							</Button>
							<Button
								asChild
								size='sm'
								className='bg-primary font-medium text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:opacity-90'
							>
								<Link href='/register'>Register</Link>
							</Button>
						</div>
					)}

					{/* Mobile Avatar */}
					{!isPending && user && (
						<Link href='/profile' className='md:hidden'>
							<Avatar
								src={user.image || ''}
								name={user.name || 'User'}
								size='sm'
								isBordered
								color='primary'
								className='cursor-pointer'
							/>
						</Link>
					)}

					{/* Mobile Hamburger */}
					<div className='md:hidden'>
						<Dropdown>
							<Dropdown.Trigger>
    <button
        aria-label='Open navigation menu'
        className='border border-border bg-secondary text-foreground p-2 rounded-lg'
    >
        <Menu size={20} />
    </button>
</Dropdown.Trigger>
							<Dropdown.Popover className='w-full mt-5'>
								<Dropdown.Menu aria-label='Navigation menu'>
									{navLinks.map((link) => (
										<Dropdown.Item key={link.href} textValue={link.label}>
											<Link
												href={link.href}
												className='block w-full font-medium text-foreground'
											>
												{link.label}
											</Link>
										</Dropdown.Item>
									))}
									{user
										? [
												<Dropdown.Item key='profile' textValue='My Profile'>
													<Link
														href='/profile'
														className='block w-full font-medium text-foreground'
													>
														My Profile
													</Link>
												</Dropdown.Item>,
												<Dropdown.Item
													key='logout'
													textValue='Logout'
													className='text-danger'
													onAction={handleLogout}
												>
													Logout
												</Dropdown.Item>,
											]
										: [
												<Dropdown.Item key='login' textValue='Login'>
													<Link
														href='/login'
														className='block w-full font-medium text-foreground'
													>
														Login
													</Link>
												</Dropdown.Item>,
												<Dropdown.Item
													key='register'
													textValue='Register'
													className='font-medium text-primary'
												>
													<Link
														href='/register'
														className='block w-full font-medium text-primary'
													>
														Register
													</Link>
												</Dropdown.Item>,
											]}
								</Dropdown.Menu>
							</Dropdown.Popover>
						</Dropdown>
					</div>
				</div>
			</header>
		</nav>
	)
}

export default Navbar

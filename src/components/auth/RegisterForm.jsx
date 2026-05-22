'use client'

import { useState } from 'react'
import { Card, InputGroup, TextField, Label, Button } from '@heroui/react'
import { Mail, Lock, User, Image as ImageIcon, Eye, EyeOff, GraduationCap } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { toast } from 'react-toastify'

const RegisterForm = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleRegister = async (formData) => {
		const name = formData.get('name')
		const image = formData.get('image')
		const email = formData.get('email')
		const password = formData.get('password')
		const confirmPassword = formData.get('confirmPassword')

		if (password !== confirmPassword) {
			toast.warning('Passwords do not match', {
				position: 'top-right',
				autoClose: 4000,
			})
			return
		}
		if (password.length < 6) {
			toast.warning('Password must be at least 6 characters', {
				position: 'top-right',
				autoClose: 4000,
			})
			return
		}

		try {
			await authClient.signUp.email(
				{ name, email, password, image },
				{
					onRequest: () => setLoading(true),
					onSuccess: () => {
						setLoading(false)
						toast.success('Account created! 🎓 Welcome to SkillSphere!', {
							position: 'top-right',
							autoClose: 3000,
						})
						router.push('/login')
					},
					onError: (ctx) => {
						setLoading(false)
						toast.error(
							ctx.error.message || 'Registration failed. Please try again',
							{ position: 'top-right', autoClose: 4000 },
						)
					},
				},
			)
		} catch (err) {
			setLoading(false)
			toast.error('Something went wrong', {
				position: 'top-right',
				autoClose: 4000,
			})
			console.log(err)
		}
	}

	const handleGoogleRegister = async () => {
		try {
			await authClient.signIn.social({ provider: 'google' })
		} catch {
			toast.error('Google signup failed. Please try again.', {
				position: 'top-right',
				autoClose: 4000,
			})
		}
	}

	return (
		<Card className='w-full max-w-md p-8 shadow-2xl rounded-[2.5rem] border border-border bg-card text-card-foreground transition-colors duration-300'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='w-16 h-16 mx-auto bg-primary/10 text-primary flex items-center justify-center rounded-2xl mb-4'>
					<GraduationCap size={30} />
				</div>
				<h1 className='text-3xl font-bold text-foreground'>Join SkillSphere</h1>
				<p className='text-muted-foreground mt-2'>
					Create your account and start learning today 🚀
				</p>
			</div>

			{/* Form */}
			<form action={handleRegister} className='space-y-4'>
				{/* Name */}
				<TextField isRequired>
					<Label className='text-foreground font-medium mb-2'>Full Name</Label>
					<InputGroup
						fullWidth
						className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
					>
						<InputGroup.Prefix>
							<User size={18} className='text-primary' />
						</InputGroup.Prefix>
						<InputGroup.Input
							name='name'
							type='text'
							placeholder='Your full name'
							className='bg-transparent text-foreground placeholder:text-muted-foreground'
						/>
					</InputGroup>
				</TextField>

				{/* Photo URL */}
				<TextField>
					<Label className='text-foreground font-medium mb-2'>
						Photo URL (optional)
					</Label>
					<InputGroup
						fullWidth
						className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
					>
						<InputGroup.Prefix>
							<ImageIcon size={18} className='text-primary' />
						</InputGroup.Prefix>
						<InputGroup.Input
							name='image'
							type='text'
							placeholder='https://example.com/photo.jpg'
							className='bg-transparent text-foreground placeholder:text-muted-foreground'
						/>
					</InputGroup>
				</TextField>

				{/* Email */}
				<TextField isRequired>
					<Label className='text-foreground font-medium mb-2'>Email</Label>
					<InputGroup
						fullWidth
						className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
					>
						<InputGroup.Prefix>
							<Mail size={18} className='text-primary' />
						</InputGroup.Prefix>
						<InputGroup.Input
							name='email'
							type='email'
							placeholder='you@example.com'
							className='bg-transparent text-foreground placeholder:text-muted-foreground'
						/>
					</InputGroup>
				</TextField>

				{/* Password */}
				<TextField isRequired>
					<Label className='text-foreground font-medium mb-2'>Password</Label>
					<InputGroup
						fullWidth
						className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
					>
						<InputGroup.Prefix>
							<Lock size={18} className='text-primary' />
						</InputGroup.Prefix>
						<InputGroup.Input
							name='password'
							type={showPassword ? 'text' : 'password'}
							placeholder='••••••••'
							className='bg-transparent text-foreground placeholder:text-muted-foreground'
						/>
						<InputGroup.Suffix>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='text-muted-foreground hover:text-primary transition'
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</InputGroup.Suffix>
					</InputGroup>
				</TextField>

				{/* Confirm Password */}
				<TextField isRequired>
					<Label className='text-foreground font-medium mb-2'>
						Confirm Password
					</Label>
					<InputGroup
						fullWidth
						className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
					>
						<InputGroup.Prefix>
							<Lock size={18} className='text-primary' />
						</InputGroup.Prefix>
						<InputGroup.Input
							name='confirmPassword'
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder='••••••••'
							className='bg-transparent text-foreground placeholder:text-muted-foreground'
						/>
						<InputGroup.Suffix>
							<button
								type='button'
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className='text-muted-foreground hover:text-primary transition'
							>
								{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</InputGroup.Suffix>
					</InputGroup>
				</TextField>

				{/* Submit */}
				<Button
					type='submit'
					isLoading={loading}
					className='w-full bg-primary text-primary-foreground font-bold rounded-2xl h-12'
				>
					Create Account
				</Button>

				{/* Divider */}
				<div className='flex items-center gap-3 my-4'>
					<div className='h-px bg-border flex-1' />
					<span className='text-xs text-muted-foreground'>OR</span>
					<div className='h-px bg-border flex-1' />
				</div>

				{/* Google */}
				<Button
					variant='secondary'
					className='w-full bg-secondary text-foreground border border-border rounded-2xl'
					onPress={handleGoogleRegister}
				>
					<FcGoogle size={20} />
					<span>Continue with Google</span>
				</Button>

				{/* Login link */}
				<p className='text-center text-sm text-muted-foreground mt-4'>
					Already have an account?{' '}
					<Link href='/login' className='text-primary font-bold hover:underline'>
						Sign in
					</Link>
				</p>
			</form>
		</Card>
	)
}

export default RegisterForm

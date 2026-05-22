'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, Button } from '@heroui/react'
import { useSession, authClient } from '@/lib/auth-client'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { User, Mail, Image as ImageIcon, Edit2, BookOpen, Award } from 'lucide-react'

const ENROLLED_COURSES = [
	{ id: 1, title: 'Complete Web Development Bootcamp', progress: 65, category: 'Development' },
	{ id: 2, title: 'UI/UX Design Masterclass', progress: 30, category: 'Design' },
]

const MyProfilePage = () => {
	const router = useRouter()
	const { data: session, isPending } = useSession()
	const user = session?.user

	const [editing, setEditing] = useState(false)
	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [loading, setLoading] = useState(false)
	const [activeTab, setActiveTab] = useState('courses')

	if (isPending) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
					<p className='text-muted-foreground'>Loading profile...</p>
				</div>
			</div>
		)
	}

	if (!user) {
		router.push('/login')
		return null
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			await authClient.updateUser({
				name: name || user.name,
				image: image || user.image,
			})
			toast.success('Profile updated successfully! ✅', {
				position: 'top-right',
				autoClose: 3000,
			})
			setEditing(false)
			router.refresh()
		} catch {
			toast.error('Update failed. Please try again.', {
				position: 'top-right',
				autoClose: 3000,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-background text-foreground p-4 md:p-8'>
			<div className='max-w-5xl mx-auto'>
				{/* Header */}
				<header className='mb-10'>
					<h1 className='text-4xl font-bold text-foreground mb-1'>
						My Profile
					</h1>
					<p className='text-muted-foreground'>
						Welcome back, {user.name}! 👋
					</p>
				</header>

				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar */}
					<aside className='w-full lg:w-72 shrink-0 space-y-4'>
						{/* Profile Card */}
						<div className='bg-card p-6 rounded-2xl border border-border shadow-sm text-center'>
							<Avatar
								src={user.image || ''}
								name={user.name || 'User'}
								className='w-20 h-20 text-2xl mx-auto mb-4'
								isBordered
								color='primary'
							/>
							<h2 className='text-xl font-bold text-foreground'>{user.name}</h2>
							<p className='text-muted-foreground text-sm mb-4'>{user.email}</p>
							<span className='inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full'>
								🎓 Active Learner
							</span>
						</div>

						{/* Nav Tabs */}
						<nav className='bg-card rounded-2xl border border-border p-2 space-y-1'>
							{[
								{ id: 'courses', label: 'My Courses', icon: <BookOpen size={16} /> },
								{ id: 'settings', label: 'Account Settings', icon: <User size={16} /> },
							].map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
										activeTab === tab.id
											? 'bg-secondary text-primary'
											: 'text-muted-foreground hover:bg-secondary'
									}`}
								>
									{tab.icon}
									{tab.label}
								</button>
							))}
						</nav>
					</aside>

					{/* Main Content */}
					<main className='grow'>
						{/* My Courses Tab */}
						{activeTab === 'courses' && (
							<div className='space-y-4'>
								<h2 className='text-xl font-bold text-foreground mb-4'>
									Enrolled Courses
								</h2>
								{ENROLLED_COURSES.map((course) => (
									<div
										key={course.id}
										className='bg-card rounded-2xl border border-border p-5 shadow-sm'
									>
										<div className='flex items-center justify-between mb-3'>
											<div>
												<span className='text-xs text-primary bg-primary/10 px-2 py-1 rounded-full mb-1 inline-block'>
													{course.category}
												</span>
												<h3 className='font-bold text-foreground'>{course.title}</h3>
											</div>
											<span className='text-sm font-bold text-primary'>
												{course.progress}%
											</span>
										</div>
										<div className='h-2 bg-secondary rounded-full overflow-hidden'>
											<div
												className='h-full bg-primary rounded-full transition-all'
												style={{ width: `${course.progress}%` }}
											/>
										</div>
										<Link
											href={`/courses/${course.id}`}
											className='mt-3 inline-block text-sm text-primary hover:underline'
										>
											Continue Learning →
										</Link>
									</div>
								))}
								<Link
									href='/courses'
									className='block text-center w-full py-3 border-2 border-dashed border-border rounded-2xl text-muted-foreground hover:text-primary hover:border-primary transition-colors text-sm font-semibold'
								>
									+ Explore More Courses
								</Link>
							</div>
						)}

						{/* Settings Tab */}
						{activeTab === 'settings' && (
							<div className='bg-card rounded-2xl border border-border p-6 shadow-sm'>
								<h2 className='text-xl font-bold text-foreground mb-6'>
									Account Information
								</h2>

								{/* Current Info */}
								<div className='space-y-4 mb-6'>
									<div className='flex items-center gap-3 bg-secondary rounded-xl p-4'>
										<User size={18} className='text-primary' />
										<div>
											<p className='text-xs text-muted-foreground'>Name</p>
											<p className='font-semibold text-foreground'>{user.name}</p>
										</div>
									</div>
									<div className='flex items-center gap-3 bg-secondary rounded-xl p-4'>
										<Mail size={18} className='text-primary' />
										<div>
											<p className='text-xs text-muted-foreground'>Email</p>
											<p className='font-semibold text-foreground'>{user.email}</p>
										</div>
									</div>
								</div>

								{!editing ? (
									<Button
										onPress={() => {
											setName(user.name || '')
											setImage(user.image || '')
											setEditing(true)
										}}
										className='w-full bg-primary text-primary-foreground font-semibold'
									>
										<Edit2 size={16} className='mr-2' /> Update Information
									</Button>
								) : (
									<form onSubmit={handleUpdate} className='space-y-4'>
										<div>
											<label className='text-sm text-muted-foreground flex items-center gap-2 mb-1'>
												<User size={14} /> Full Name
											</label>
											<input
												type='text'
												value={name}
												onChange={(e) => setName(e.target.value)}
												className='w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
												placeholder='Your full name'
											/>
										</div>
										<div>
											<label className='text-sm text-muted-foreground flex items-center gap-2 mb-1'>
												<ImageIcon size={14} /> Photo URL
											</label>
											<input
												type='url'
												value={image}
												onChange={(e) => setImage(e.target.value)}
												className='w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
												placeholder='https://example.com/photo.jpg'
											/>
										</div>
										<div className='flex gap-3'>
											<Button
												type='submit'
												isLoading={loading}
												className='flex-1 bg-primary text-primary-foreground font-semibold'
											>
												Save Changes
											</Button>
											<Button
												type='button'
												variant='flat'
												onPress={() => setEditing(false)}
												className='flex-1'
											>
												Cancel
											</Button>
										</div>
									</form>
								)}
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	)
}

export default MyProfilePage

import Loading from './loading'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { Star, Clock, Users, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const CourseDetailsPage = async ({ params }) => {
	// ---- PROTECTED ROUTE ----
	const session = await auth.api.getSession({ headers: await headers() })
	if (!session) {
		const { id } = await params
		redirect(`/login?redirect=/courses/${id}`)
	}

	const { id } = await params

	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`, {
		cache: 'no-store',
	})
	const courses = await res.json()
	const course = courses.find((c) => c.id === parseInt(id))

	if (!course) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen'>
				<div className='text-6xl mb-4'>😕</div>
				<h1 className='text-2xl font-bold text-foreground mb-4'>
					Course Not Found
				</h1>
				<Link href='/courses' className='text-primary hover:underline'>
					← Back to All Courses
				</Link>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Header Banner */}
			<div className='bg-gradient-to-br from-primary/20 to-secondary py-16 border-b border-border'>
				<div className='container mx-auto px-4 max-w-5xl'>
					<Link
						href='/courses'
						className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6'
					>
						<ArrowLeft size={16} /> Back to All Courses
					</Link>
					<div className='flex flex-wrap items-center gap-3 mb-4'>
						<span className='text-xs font-semibold uppercase text-primary bg-primary/15 px-3 py-1 rounded-full border border-primary/25'>
							{course.category}
						</span>
						<span className='text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full border border-border'>
							{course.level}
						</span>
					</div>
					<h1 className='text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight'>
						{course.title}
					</h1>
					<p className='text-muted-foreground text-lg mb-6'>{course.description}</p>
					<div className='flex flex-wrap gap-6 text-sm'>
						<span className='flex items-center gap-2 text-foreground'>
							<Star size={16} className='text-yellow-400 fill-yellow-400' />
							<strong>{course.rating}</strong> Rating
						</span>
						<span className='flex items-center gap-2 text-foreground'>
							<Clock size={16} className='text-primary' />
							{course.duration}
						</span>
						<span className='flex items-center gap-2 text-foreground'>
							<Users size={16} className='text-primary' />
							{course.students?.toLocaleString()} Students
						</span>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className='container mx-auto px-4 max-w-5xl py-12'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
					{/* Main */}
					<div className='lg:col-span-2'>
						{/* About */}
						<div className='bg-card rounded-2xl border border-border p-6 mb-6'>
							<h2 className='font-bold text-foreground text-xl mb-4'>
								About This Course
							</h2>
							<p className='text-muted-foreground leading-relaxed'>
								{course.description}
							</p>
							<div className='grid grid-cols-2 gap-4 mt-6'>
								<div className='bg-secondary rounded-xl p-4'>
									<p className='text-xs text-muted-foreground mb-1'>Instructor</p>
									<p className='font-semibold text-foreground'>{course.instructor}</p>
								</div>
								<div className='bg-secondary rounded-xl p-4'>
									<p className='text-xs text-muted-foreground mb-1'>Level</p>
									<p className='font-semibold text-foreground'>{course.level}</p>
								</div>
								<div className='bg-secondary rounded-xl p-4'>
									<p className='text-xs text-muted-foreground mb-1'>Duration</p>
									<p className='font-semibold text-foreground'>{course.duration}</p>
								</div>
								<div className='bg-secondary rounded-xl p-4'>
									<p className='text-xs text-muted-foreground mb-1'>Category</p>
									<p className='font-semibold text-foreground'>{course.category}</p>
								</div>
							</div>
						</div>

						{/* Curriculum */}
						<div className='bg-card rounded-2xl border border-border p-6'>
							<h2 className='font-bold text-foreground text-xl mb-5'>
								📋 Course Curriculum
							</h2>
							<ul className='space-y-3'>
								{course.curriculum?.map((item, i) => (
									<li
										key={i}
										className='flex items-center gap-3 p-3 rounded-xl bg-secondary'
									>
										<CheckCircle
											size={18}
											className='text-primary shrink-0'
										/>
										<span className='text-foreground'>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Sidebar */}
					<div className='lg:col-span-1'>
						<div className='sticky top-24 bg-card rounded-2xl border border-border p-6 shadow-lg'>
							<div className='h-44 rounded-xl bg-gradient-to-br from-primary/30 to-secondary flex items-center justify-center mb-5'>
								<span className='text-7xl'>🎓</span>
							</div>
							<h3 className='font-bold text-foreground text-lg mb-1 line-clamp-2'>
								{course.title}
							</h3>
							<p className='text-muted-foreground text-sm mb-5'>
								by {course.instructor}
							</p>
							<div className='flex items-center justify-between text-sm mb-6'>
								<span className='flex items-center gap-1'>
									<Star
										size={14}
										className='text-yellow-400 fill-yellow-400'
									/>
									{course.rating}
								</span>
								<span className='text-muted-foreground'>
									{course.students?.toLocaleString()} students
								</span>
							</div>
							<button className='w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity mb-3'>
								Enroll Now — Free
							</button>
							<Link
								href='/courses'
								className='block text-center text-sm text-muted-foreground hover:text-primary transition-colors'
							>
								← Browse All Courses
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CourseDetailsPage

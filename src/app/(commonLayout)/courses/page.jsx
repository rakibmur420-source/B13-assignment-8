'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Star, Clock, Users, Filter } from 'lucide-react'

const CoursesPage = () => {
	const [courses, setCourses] = useState([])
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch('/data.json')
			.then((res) => res.json())
			.then((data) => {
				setCourses(data)
				setLoading(false)
			})
	}, [])

	const filtered = courses.filter((c) =>
		c.title.toLowerCase().includes(search.toLowerCase()),
	)

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
					<p className='text-muted-foreground'>Loading courses...</p>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Page Header */}
			<div className='bg-secondary border-b border-border py-16'>
				<div className='container mx-auto px-4 text-center'>
					<h1 className='text-4xl font-bold text-foreground mb-3'>
						All Courses
					</h1>
					<p className='text-muted-foreground mb-8'>
						Explore our complete library of {courses.length} expert-led courses
					</p>

					{/* Search */}
					<div className='relative max-w-lg mx-auto'>
						<Search
							className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
							size={18}
						/>
						<input
							type='text'
							placeholder='Search courses by title...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className='w-full pl-11 pr-4 py-3 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm'
						/>
					</div>
				</div>
			</div>

			{/* Results */}
			<div className='container mx-auto px-4 py-12'>
				{search && (
					<p className='text-sm text-muted-foreground mb-6'>
						Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}{' '}
						for &ldquo;{search}&rdquo;
					</p>
				)}

				{filtered.length === 0 ? (
					<div className='text-center py-20'>
						<div className='text-6xl mb-4'>🔍</div>
						<p className='text-xl font-semibold text-foreground mb-2'>
							No courses found
						</p>
						<p className='text-muted-foreground'>
							Try a different search term
						</p>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{filtered.map((course) => (
							<div
								key={course.id}
								className='rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
							>
								<div className='h-40 bg-gradient-to-br from-primary/25 to-secondary flex items-center justify-center'>
									<span className='text-5xl'>📚</span>
								</div>
								<div className='p-5'>
									<div className='flex items-center justify-between mb-2'>
										<span className='text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full'>
											{course.category}
										</span>
										<span className='text-xs text-muted-foreground'>
											{course.level}
										</span>
									</div>
									<h3 className='font-bold text-foreground mb-1 line-clamp-2 leading-snug'>
										{course.title}
									</h3>
									<p className='text-sm text-muted-foreground mb-3'>
										by {course.instructor}
									</p>
									<div className='flex items-center justify-between text-xs text-muted-foreground mb-4'>
										<span className='flex items-center gap-1'>
											<Star
												size={12}
												className='text-yellow-400 fill-yellow-400'
											/>
											{course.rating}
										</span>
										<span className='flex items-center gap-1'>
											<Clock size={12} />
											{course.duration}
										</span>
										<span className='flex items-center gap-1'>
											<Users size={12} />
											{course.students?.toLocaleString()}
										</span>
									</div>
									<Link
										href={`/courses/${course.id}`}
										className='block text-center w-full py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm'
									>
										Details →
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default CoursesPage

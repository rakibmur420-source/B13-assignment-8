import Link from 'next/link'
import { Star, Clock, Users } from 'lucide-react'

const PopularCourses = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/data.json`, {
		cache: 'no-store',
	})
	const courses = await res.json()
	const popular = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3)

	return (
		<section className='container mx-auto px-4 py-20'>
			<div className='text-center mb-12'>
				<span className='inline-block px-4 py-1.5 mb-4 text-sm font-semibold uppercase tracking-wider rounded-full bg-secondary text-secondary-foreground'>
					Top Rated
				</span>
				<h2 className='text-4xl font-bold text-foreground mb-3'>
					🔥 Popular Courses
				</h2>
				<p className='text-muted-foreground'>
					Top-rated courses loved by thousands of learners
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{popular.map((course) => (
					<div
						key={course.id}
						className='rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
					>
						<div className='h-48 bg-gradient-to-br from-primary/30 to-secondary flex items-center justify-center'>
							<span className='text-6xl'>📚</span>
						</div>
						<div className='p-6'>
							<div className='flex items-center justify-between mb-3'>
								<span className='text-xs font-semibold uppercase text-primary bg-primary/10 px-3 py-1 rounded-full'>
									{course.category}
								</span>
								<span className='text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full'>
									{course.level}
								</span>
							</div>
							<h3 className='font-bold text-foreground mb-2 text-lg leading-tight'>
								{course.title}
							</h3>
							<p className='text-sm text-muted-foreground mb-4'>
								by {course.instructor}
							</p>
							<div className='flex items-center justify-between text-sm text-muted-foreground mb-5'>
								<span className='flex items-center gap-1'>
									<Star size={14} className='text-yellow-400 fill-yellow-400' />
									{course.rating}
								</span>
								<span className='flex items-center gap-1'>
									<Clock size={14} />
									{course.duration}
								</span>
								<span className='flex items-center gap-1'>
									<Users size={14} />
									{course.students?.toLocaleString()}
								</span>
							</div>
							<Link
								href={`/courses/${course.id}`}
								className='block text-center w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity'
							>
								View Details
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default PopularCourses

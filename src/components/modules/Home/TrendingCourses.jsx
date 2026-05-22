import Link from 'next/link'
import { Star } from 'lucide-react'

const TrendingCourses = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`, {
		cache: 'no-store',
	})
	const courses = await res.json()
	const trending = courses.slice(3, 7)

	return (
		<section className='bg-secondary py-20'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<span className='inline-block px-4 py-1.5 mb-4 text-sm font-semibold uppercase tracking-wider rounded-full bg-background text-foreground border border-border'>
						This Month
					</span>
					<h2 className='text-4xl font-bold text-foreground mb-3'>
						🆕 Trending Courses
					</h2>
					<p className='text-muted-foreground'>
						The most popular picks this month
					</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{trending.map((course) => (
						<div
							key={course.id}
							className='bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
						>
							<div className='h-32 rounded-xl bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center mb-4'>
								<span className='text-4xl'>🎓</span>
							</div>
							<span className='text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full'>
								{course.category}
							</span>
							<h3 className='font-bold text-foreground mt-2 mb-1 text-sm leading-snug line-clamp-2'>
								{course.title}
							</h3>
							<p className='text-xs text-muted-foreground mb-3 flex items-center gap-1'>
								<Star size={11} className='text-yellow-400 fill-yellow-400' />
								{course.rating} · by {course.instructor}
							</p>
							<Link
								href={`/courses/${course.id}`}
								className='block text-center py-2 bg-primary/10 text-primary rounded-lg font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all'
							>
								View Details →
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default TrendingCourses

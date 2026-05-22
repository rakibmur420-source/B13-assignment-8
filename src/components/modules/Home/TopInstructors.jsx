const instructors = [
	{
		name: 'John Doe',
		subject: 'Web Development',
		avatar: '👨‍💻',
		students: '12.5K',
		rating: 4.8,
		courses: 5,
	},
	{
		name: 'Sarah Lee',
		subject: 'UI/UX Design',
		avatar: '👩‍🎨',
		students: '8.9K',
		rating: 4.9,
		courses: 3,
	},
	{
		name: 'Emily Chen',
		subject: 'Data Science',
		avatar: '👩‍🔬',
		students: '15K',
		rating: 4.9,
		courses: 4,
	},
	{
		name: 'Mike Johnson',
		subject: 'Digital Marketing',
		avatar: '👨‍💼',
		students: '6.7K',
		rating: 4.7,
		courses: 2,
	},
]

const TopInstructors = () => {
	return (
		<section className='container mx-auto px-4 py-20'>
			<div className='text-center mb-12'>
				<span className='inline-block px-4 py-1.5 mb-4 text-sm font-semibold uppercase tracking-wider rounded-full bg-secondary text-secondary-foreground'>
					Expert Educators
				</span>
				<h2 className='text-4xl font-bold text-foreground mb-3'>
					🏆 Top Instructors
				</h2>
				<p className='text-muted-foreground'>
					Learn from the best minds in their fields
				</p>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{instructors.map((ins) => (
					<div
						key={ins.name}
						className='text-center bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
					>
						<div className='text-6xl mb-4'>{ins.avatar}</div>
						<h3 className='font-bold text-foreground text-lg'>{ins.name}</h3>
						<p className='text-primary text-sm font-semibold mb-3'>
							{ins.subject}
						</p>
						<div className='flex justify-center gap-4 text-xs text-muted-foreground'>
							<span>👥 {ins.students}</span>
							<span>⭐ {ins.rating}</span>
							<span>📚 {ins.courses} courses</span>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default TopInstructors

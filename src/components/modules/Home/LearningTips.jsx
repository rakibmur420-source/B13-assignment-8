const tips = [
	{
		icon: '🎯',
		title: 'Set Clear Goals',
		desc: 'Define what you want to learn and break it into small, achievable milestones for consistent progress.',
	},
	{
		icon: '⏰',
		title: 'Study Daily',
		desc: 'Consistency beats cramming. Even 30 minutes of focused study daily builds strong, lasting skills.',
	},
	{
		icon: '📝',
		title: 'Take Notes',
		desc: 'Write key concepts in your own words to deepen understanding and improve long-term retention.',
	},
	{
		icon: '🔄',
		title: 'Practice & Repeat',
		desc: 'Apply what you learn through hands-on projects and exercises to reinforce your knowledge.',
	},
]

const LearningTips = () => {
	return (
		<section className='bg-secondary py-20'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<span className='inline-block px-4 py-1.5 mb-4 text-sm font-semibold uppercase tracking-wider rounded-full bg-background text-foreground border border-border'>
						Study Smarter
					</span>
					<h2 className='text-4xl font-bold text-foreground mb-3'>
						📌 Learning Tips
					</h2>
					<p className='text-muted-foreground'>
						Proven strategies to help you learn faster and smarter
					</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{tips.map((tip) => (
						<div
							key={tip.title}
							className='bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'
						>
							<div className='text-4xl mb-4'>{tip.icon}</div>
							<h3 className='font-bold text-foreground mb-2'>{tip.title}</h3>
							<p className='text-sm text-muted-foreground leading-relaxed'>
								{tip.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default LearningTips

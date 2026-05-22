import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4'>
			<div className='text-8xl mb-6'>🎓</div>
			<h1 className='text-7xl font-bold text-primary mb-4'>404</h1>
			<h2 className='text-2xl font-semibold text-foreground mb-3'>
				Page Not Found
			</h2>
			<p className='text-muted-foreground mb-8 text-center max-w-sm'>
				Oops! This lesson doesn&apos;t exist. Let&apos;s get you back on track.
			</p>
			<Link
				href='/'
				className='px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:opacity-90 transition-opacity'
			>
				Back to Home
			</Link>
		</div>
	)
}

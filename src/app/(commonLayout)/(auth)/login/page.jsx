import LoginForm from '@/components/auth/LoginForm'

export const metadata = {
	title: 'Login – SkillSphere',
}

export default function LoginPage() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-background px-4 py-16'>
			<LoginForm />
		</div>
	)
}

import RegisterForm from '@/components/auth/RegisterForm'

export const metadata = {
	title: 'Register – SkillSphere',
}

export default function RegisterPage() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-background px-4 py-16'>
			<RegisterForm />
		</div>
	)
}

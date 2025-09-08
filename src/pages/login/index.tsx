import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import('../../components/login').then(m => m.LoginForm), {
    ssr: false,
})

export default function LoginPage() {
	return (
		<div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
			<h1>Login</h1>
			<LoginForm />
		</div>
	)
}

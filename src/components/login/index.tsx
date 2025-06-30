import { Button, TextField, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { getToken } from '../../lib/auth'
import { useAuthService } from '../../services/login'
import { useEffect } from 'react'
import { routes } from '@/utils/routes'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export const LoginForm = () => {
  const router = useRouter()
  const { handleLogin, loading } = useAuthService()

  useEffect(() => {
    const token = getToken()
    if (token) {
      router.push(routes.dashboard)
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await handleLogin(data)
    router.push(routes.dashboard)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Senha"
        type="password"
        fullWidth
        margin="normal"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 3 }}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </Box>
  )
}

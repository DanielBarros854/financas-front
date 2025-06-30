import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getToken } from '../lib/auth'
import { routes } from '@/utils/routes'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    router.push(token ? routes.dashboard : routes.login)
  }, [router])
}

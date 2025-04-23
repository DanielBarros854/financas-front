import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getToken } from '../lib/auth'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    router.push(token ? '/dashboard' : '/login')
  }, [router])
}

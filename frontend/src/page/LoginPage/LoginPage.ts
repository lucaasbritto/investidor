import { ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'

export function LoginPageScript() {
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')
  const router = useRouter()

  const handleLogin = async () => {
    loading.value = true
    error.value = ''
    try {
      const response = await api.post('/login', {
        email: email.value,
        password: password.value
      })

      const token = response.data.access_token
      localStorage.setItem('token', token)

      router.push('/')
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Erro ao fazer login'
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    password,
    loading,
    error,
    handleLogin
  }
}

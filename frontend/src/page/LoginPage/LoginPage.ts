import { ref } from 'vue'
import api from '@/api'

export function LoginPageScript() {
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')

  const handleLogin = async () => {
    loading.value = true
    error.value = ''
    try {
      const response = await api.post('/login', {
        email: email.value,
        password: password.value
      })
      localStorage.setItem('token', response.data.token)      
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao entrar'
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

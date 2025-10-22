import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

export function LoginPageScript() {
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')
  const router = useRouter()
  const userStore = useUserStore()

  const handleLogin = async () => {
    loading.value = true
    error.value = ''
    try {

      await userStore.login(email.value, password.value)

      router.push('/')
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer login'
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

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

interface User {
  id: number
  name: string
  email?: string
}

export default function headerScript() {
  const userStore = useUserStore()
  const router = useRouter()

  const user = computed(() => userStore.user as User | null)

  function logout(): void {
    userStore.logout()
    router.push({ name: 'Login' })
  }

  return {
    user,
    logout
  }
}

import { ref, watchEffect } from 'vue'
import { auth } from '@/shared/config/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'

const currentUser = ref<User | null>(auth.currentUser)
const isAuth = ref(false)

watchEffect(() => {
  currentUser.value = auth.currentUser
})

onAuthStateChanged(auth, (user) => {
  currentUser.value = user
  isAuth.value = true
})

export { currentUser, isAuth }

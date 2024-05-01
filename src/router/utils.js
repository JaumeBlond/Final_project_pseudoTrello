import { useUserStore } from '@/stores/userStore'

export const generalBeforeEach = async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  next()
}

export const canAccess = async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  if (!userStore.user) {
    next({ name: 'login' })
  } else {
    next()
  }
}

export const isUserLogged = async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user) {
    next({ name: 'board' })
  } else {
    next()
  }
}

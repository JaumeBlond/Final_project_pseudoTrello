import { supabase } from '@/api/supabase'

export const fetchActualUser = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return data?.session?.user || null
}

export const createNewUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  return data.user
}

export const logIn = async (email, password) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message)
  }
  return user
}

export const recoverPasswordEmail = async (email) => {
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://trolloist.netlify.app/'
  })
}

export const setNewPassword = async (passwords) => {
  const accessToken = supabase.auth.getSession().access_token

  const {
    data: { user },
    error
  } = await supabase.auth.updateUser(accessToken, { password: passwords })
  console.log('patata')
  if (error) {
    throw new Error(error.message)
  }
  return user
}

export const logInWithProvider = async (provider) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithOAuth({ provider })

  if (error) {
    throw new Error(error.message)
  }

  return user
}

export const logOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

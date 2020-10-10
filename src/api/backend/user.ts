import { AxiosResponse } from 'axios'
import { plainAxios, secureAxios } from '.'

interface User {
  email: string;
}

export function signIn (email: string, password: string): Promise<AxiosResponse> {
  return plainAxios.post('/user/v1/sign_in', { user: { email, password } })
}

export function signOut () {
  return secureAxios.delete('/user/v1/sign_out')
}

export function signUp (email: string, password: string, confirmPassword: string): Promise<AxiosResponse> {
  if (password !== confirmPassword) {
    return new Promise((resolve, reject) => {
      reject(new Error("Passwords don't match."))
    })
  }

  return plainAxios.post('/user/v1', { user: { email, password } })
}

export function readCurrentUser (): Promise<User> {
  return secureAxios.get('/api/v1/user')
    .then(response => response.data as User)
}

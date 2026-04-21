import { baseRequestApi } from "./baseRequest.api";



export function signUpApi(data) {

  return baseRequestApi('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  })

}


export function loginApi(data) {
  
  return baseRequestApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  })

}



// { RESET PASSWORD API REQUEST }

// forgot password
export function forgotPasswordApi(email) {

  return baseRequestApi('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(email)
  })

}


// reset password
export function resetPasswordApi(payload) {
  const {newPassword, token} = payload

  return baseRequestApi(`/auth/reset-password?token=${token}`, {
    method: 'POST',
    body: JSON.stringify({newPassword})
  })

}
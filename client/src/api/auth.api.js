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


// verify reset code
export function verifyCodeApi(code) {

  return baseRequestApi('/auth/verify-reset-code', {
    method: 'POST',
    body: JSON.stringify(code)
  })

}


// reset password
export function resetPasswordApi(password) {

  return baseRequestApi('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(password)
  })

}
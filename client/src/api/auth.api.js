import { baseRequestApi } from "./baseRequest.api";



export function signUpApi(data) {

  console.log(data)
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
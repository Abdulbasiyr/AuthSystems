import { baseRequestApi } from "./baseRequest.api";



export function signUp(data) {

  return baseRequestApi('/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  })

}


export function login(data) {

  return baseRequestApi('/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  })

}
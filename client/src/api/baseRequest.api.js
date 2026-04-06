
const REQ_URL = 'http://localhost:3001'


export async function baseRequestApi(path, options = {}) {

  const res = await fetch(`${REQ_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'include'
  })

  const data = await res.json().catch(() => null)

  if(!res.ok) throw new Error(data?.message || 'Network doesnt work, please try later')

  return data

}
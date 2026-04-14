

export function resCookie(res, token) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge:  604800000
  })
}
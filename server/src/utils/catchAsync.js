

export const catchAsync = (fn) => {
  return(req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

// Forgot password 
export async function serviceForgotPassword(email) {

  try {
    const user = await findUserByEmail(email)
    if(!user) return 

    const token = crypto.randomBytes(32).toString('hex')
    const code  = crypto.randomInt(100000, 999999).toString()

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const codeHash  = crypto.createHash('sha256').update(code).digest('hex')

    const expiresAt = new Date(Date.now() + RESET_TTL)

    await removePasswordReset(user.id)
    await createPasswordReset({userId: user.id, tokenHash, codeHash, expiresAt})

    return data = {
      token,
      code
    }
  } catch(err) {
    throw new AppError('Forgot password failed', 500, {techMessage: err?.message, errorCode: 'FORGOT_PASSWORD_FAILED'} )
  }

}
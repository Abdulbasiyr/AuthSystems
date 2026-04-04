


export async function controllerSignUp(req, res, next) {

  try {

    const validatedData = validateSignUp(req.body)

  } catch(err) {
    next(err)
  }

}



export async function controllerLogin(req, res, next) {

  try {

    const validatedData = validateLogin(req.body)

  } catch(err) {
    next(err)
  }

}
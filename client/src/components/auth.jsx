
import { useSearchParams } from 'react-router-dom'

import '../css/auth.css'
import Login from './Auth components/login'
import Register from './Auth components/signup'



const Auth = () => {

  const [ searchParams ] = useSearchParams()  
  const mode = searchParams.get('mode')


  return(

    <div className="authContainer">
      { mode === 'login' ? <Login /> : <Register /> }
    </div>

  )

}

export default Auth
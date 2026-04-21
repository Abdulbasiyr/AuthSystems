

import { useState } from "react";
import { AuthContext } from "./Context";

export function AuthProvider({children}) {

  const [user, setUser] = useState(null)

  return(
     <AuthContext.Provider value={{user, setUser}}>
       {children}
     </AuthContext.Provider>
  )
}
import {createContext, useContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "../firebase/firebase";

type AuthContextType = {
    user: any,
    isLogged: boolean | undefined
}

export const AuthContext = createContext<AuthContextType>({} as any)

const AuthContextProvider = ({children}: any) => {

    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [user, setUser] = useState<any>()

    const auth = getAuth(firebaseApp);

    useEffect(() => {
        init()

    }, [auth])

    const init = async () => {
        onAuthStateChanged(auth, (user) => {

            if (user) {
                setIsLogged(true)
                setUser(user)
            } else {
                setIsLogged(false)
            }
        })


    }


    return (
        <AuthContext.Provider value={{user, isLogged}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;


export const useAuthContext = () => {
    return useContext(AuthContext)

}
import { useState, createContext } from "react";
import {toast} from 'react-toastify';
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth-token')?true:false);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${ConnString}/auth/admin/logout`,{
                method:"GET",
                credentials:"include"
            })
            
            const json = await response.json();
            if(json.success){
                localStorage.clear();
                setIsLoggedIn(false);
                toast.success("Successfully Logout")
            }
            else{
                throw new Error(json.error);
            }
        }
        catch(error){
            toast.error(error.nessage);
        }
    }

    const contextValue = {handleLogout,isLoggedIn,setIsLoggedIn};

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
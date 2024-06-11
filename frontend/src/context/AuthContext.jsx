import { useState, createContext, useContext } from "react";
import { toast } from 'react-toastify';
import { ShopContext } from "./ShopContext";
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth-token') ? true : false);
    const handleLogout = async () => {
        try {
            const response = await fetch(`${ConnString}/auth/user/logout`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
            })

            const json = await response.json();
            if (json.success) {
                localStorage.clear();
                setIsLoggedIn(false);
                window.location.assign('/')
                toast.success("Successfully Logout")
            }
            else {
                throw new Error(json.error);
            }
        }
        catch (error) {
            toast.error(error.nessage);
        }
    }

    const contextValue = { handleLogout, isLoggedIn, setIsLoggedIn };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
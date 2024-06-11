import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}
export const ShopContextProvider = ({ children }) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart)  
    useEffect(() => {
        const fetch_all_products = async () => {
            await fetch(`${ConnString}/user/fetchallproducts`, {
                method: "GET"
            }).then((response) => response.json()).then((data) => setAll_Product(data.products))
        }
        const fetch_cart_items = async () => {
            if (localStorage.getItem('auth-token')) {
                try {

                    const response = await fetch(`${ConnString}/user/getcart`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                        },
                    });
                    const json = await response.json();
                    if (json.success) {
                        setCartItems(json.cartItems);
                    }
                    else {
                        localStorage.clear();
                        window.location.assign('/cart')
                        toast.error("Unauthorized access!");
                    }
                }
                catch (err) {
                    toast.error("Unexpected error!");
                }
            }
        }

        fetch_all_products();
        fetch_cart_items();
    }, [])
    const addToCart = async (itemId) => {
        if (localStorage.getItem('auth-token')) {
            try {

                const response = await fetch(`${ConnString}/user/addtocart`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "itemId": itemId }),
                });
                const json = await response.json();
                if (json.success) {
                    setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 })
                }
                else {
                    toast.error("Unauthorized access! Refesh the page");
                }
            }
            catch (err) {
                toast.error("Unexpected error!");
            }
        }
        else {
            setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 })
        }
    }
    const removeFromCart = async (itemId) => {
        if (localStorage.getItem('auth-token')) {
            try {

                const response = await fetch(`${ConnString}/user/removefromcart`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "itemId": itemId }),
                });
                const json = await response.json();
                if (json.success) {
                    setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 })
                }
                else {
                    toast.error("Unauthorized access! Refesh the page");
                }
            }
            catch (err) {
                toast.error("Unexpected error!");
            }
        }
        else {
            setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 })
        }
    }
    const deleteFromCart = async (itemId) => {
        if (localStorage.getItem('auth-token')) {
            try {

                const response = await fetch(`${ConnString}/user/deletefromcart`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "itemId": itemId }),
                });
                const json = await response.json();
                if (json.success) {
                    setCartItems({ ...cartItems, [itemId]: 0 })
                }
                else {
                    toast.error("Unauthorized access! Refesh the page");
                }
            }
            catch (err) {
                toast.error("Unexpected error!");
            }
        }
        else{
            setCartItems({ ...cartItems, [itemId]: 0 })
        }
    }
    const clearCart = async () => {
        if (localStorage.getItem('auth-token')) {
            try {

                const response = await fetch(`${ConnString}/user/clearcart`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                });
                const json = await response.json();
                if (json.success) {
                    setCartItems(getDefaultCart)
                }
                else {
                    toast.error("Unauthorized access! Refesh the page");
                }
            }
            catch (err) {
                toast.error("Unexpected error!");
            }
        }
        else{
            setCartItems(getDefaultCart)
        }
    }

    const getTotalCartAmount = () => {
        let totalAmout = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmout += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmout;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    const contextValue = { all_product, cartItems, addToCart, removeFromCart, deleteFromCart,clearCart, getTotalCartAmount, getTotalCartItems };
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}
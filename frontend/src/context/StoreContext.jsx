import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-d-backend.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    //add to cart logic
    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev,[itemId]:1}))     //user first time  cart item add karshe tyare excecute thashe
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        //to integrate frontend with backend logic
        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
        }
    };


    //remove from cart
    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove", {itemId}, {headers: {token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for(const item in cartItems){
            if(cartItems[item]){
            let itemInfo = food_list.find((product) => product._id === item)
            totalAmount = totalAmount + itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    //to load the data from db
    const fetchFoodList = async() => {
        const response = await axios.get(url+ "/api/food/list");
        setFoodList(response.data.data)
    }

    //if i refresh the webpage added items are still have to be display
    const loadCartData = async(token) => {
        const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}})
        setCartItems(response.data.cartData);
    }

    //this funtion is used for if i refresh the page user has to be still loggin
    useEffect(() => {
        
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,           //using this context we can aacess food_list anywhere
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {
                props.children
            }
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

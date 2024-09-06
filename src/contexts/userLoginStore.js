import { useState,useEffect } from "react";
import axios from "axios";
import { loginContext } from "./loginContext";
function UserLoginStore({children}) {
    let [currentUser,setUser]=useState({})
    let [loginErr,setLoginErr]=useState("")
    let [userLoginStatus,setUserLoginStatus]=useState(false)
   
    // Check for token in local storage during initialization
 

    
    //func to make user login request
    const loginUser=(userCredentialsObj)=>{
        console.log(userCredentialsObj)
        axios.post("http://localhost:3500/user-api/user-login",userCredentialsObj)
        .then((response)=>{
            console.log(response)
            if(response.data.message==="success"){
                //save token in local storage
                localStorage.setItem("token",response.data.token)
                setUser({...response.data.user})
                setLoginErr("")
                setUserLoginStatus(true)
               
                console.log("login successful")

            }
            else{
                setLoginErr(response.data.message)
            }
        })
        .catch((err)=>{
            console.log("err in user login",err)
            setLoginErr(err.message)
        })
    
    }
    const logoutUser=()=>{
        localStorage.clear()
        setUserLoginStatus(false)
       
    }
    // Function to handle token expiration
 
    return(
        <loginContext.Provider value={[currentUser, loginErr, userLoginStatus, loginUser, logoutUser, ]}>
  {children}
</loginContext.Provider>

    )
}
export default UserLoginStore
"use client" ;
import React, { useState } from "react";
import UserContext from "./UserContext";
const UserContextProvider = ({children}:any)=>{
    const [user,setUser] = useState(false);
return(
    <>
    <UserContext.Provider value={{user,setUser}}>
    {children}
    </UserContext.Provider>
    </>
)
}
export default UserContextProvider;
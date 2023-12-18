"use client" ;
import Link from 'next/link'
import React, { useContext, useLayoutEffect, useState } from 'react' ;
import { RiArrowDropDownLine } from "react-icons/ri";
import UserDetails from './userDetails';
import axios from 'axios';
import UserContext from '@/context/UserContext';
const Navbar = () => {
  const {user,setUser} = useContext(UserContext)
  // const [user,setUser] = useState(false);
  const [userdata,setUserData] = useState<string | any>(['']);
  const [dropCkick,setDropCkick] = useState<boolean>(false);
const getData = async() =>{
  try {
    await axios.get('../../api/users/me')
    .then(async(res)=>{
      // console.log(res);
       if(res.status === 200){
        setUser(true);
       await setUserData(res.data);
       }
 
    })
    .catch((err)=>{
      console.log(err);
    })
  } catch (error) {
    
  }
}
useLayoutEffect(()=>{
  getData();
},[user]);
 
    return (
      <>
      <nav className=' flex justify-end items-baseline p-2 border-b-solid border border-gray-200 ' >
          <section className=' flex flex-row items-center' >
          <Link href={'/'} className=' hover:text-myColor px-2 transition delay-100'>Home</Link>
          <Link href={''} className=' hover:text-myColor px-2 transition delay-100'>About Us</Link>
          <Link href={'../../login'} className={user?'hidden':'px-2 hover:text-myColor transition delay-100'}>Login</Link>
          <Link href={'../../signup'} className={user?'hidden':'bg-myColor p-1 hover:bg-light rounded-lg px-2 text-white'}><span>Sign Up</span></Link>
          <div onClick={()=>{dropCkick?setDropCkick(false):setDropCkick(true)}}  className={user?'cursor-pointer flex px-2 border-myColor border rounded-full tetx-4xl text-myColor':'hidden'}><p>{userdata.email}</p><span className=' flex items-center text-lg'><RiArrowDropDownLine /></span></div>
          </section>       
      </nav>
    {dropCkick? <UserDetails/>:""}
      </>
    )
 
}

export default Navbar

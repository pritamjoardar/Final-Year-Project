"use client"
import React, { useContext, useState } from 'react';
import userContext from '@/context/UserContext';
import "../style/shadow.scss";
import Link from 'next/link';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
const Page = () => {
  const { setUser } = useContext(userContext);
  const router = useRouter();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string | number>()
  const UserLogin = async (e: any) => {

    try {
      e.preventDefault();

      await axios.post('../api/users/login', { email, password },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'content-type': 'application/json; charset=utf-8'
          }
        }).then((res) => {
          if (res.status === 201) {
            setUser(true);
            toast.success("Login successfully"); 
            router.push('/');
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            toast.error(err.response.data.message);
          }

        });

    } catch (error) {

      console.log(error);  
    }
  }
  return (
    <>
      <div className=' h-[calc(100svh-4rem)] flex justify-center items-center'>
        <section id='login' className='w-1/3 p-8 flex flex-col justify-center rounded-lg h-min '>
          <h1 className='font-bold text-gray-600 text-2xl '>LOGIN</h1>
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' name="" className='outline-myColor p-2 mt-3 border-solid border border-gray-300 rounded-lg' />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' name="" className='outline-myColor p-2 mt-3 border-solid border border-gray-300 rounded-lg' />
          <span className='mt-4 mb-3 flex items-center flex-row'>
            <input className='' type="checkbox" name='' /><p className='ml-2 text-gray-500'>Remember me ?</p>
          </span>
          <button id='sha' onClick={UserLogin} className=' bg-myColor hover:bg-light rounded-lg p-1 text-white text-1xl' >LOGIN</button>
          <p className=' mb-9  flex justify-end text-gray-500 mt-1'><Link href={'#'} className='hover:text-myColor transition delay-50'>Forgot Password?</Link></p>
          <div className='relative flex flex-row justify-center items-center mb-10'>
            <p className='absolute bg-white border-solid border border-gray-300 rounded-lg p-1 text-xl text-gray-400'>OR</p>
            <hr className='w-full' />
          </div>
          <section className='flex justify-center'>
            <article className='flex flex-row'>
              <span className=' m-1 cursor-pointer flex justify-center items-center p-2 border-solid border border-gray-300 rounded-full hover:border-myColor ' ><svg width="18" height="18" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38z" />
                <path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21z" />
                <path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9z" />
                <path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z" />
                <path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4z" />
              </svg></span>
              <span className='m-1 cursor-pointer flex justify-center items-center p-2 rounded-full border-solid border border-gray-300 hover:border-myColor'><svg width="18" height="18" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" />
                <path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825" />
              </svg></span>
              <span className='outline-offset-0 hover:outline-myColor m-1 cursor-pointer flex justify-center items-center p-2 rounded-full border-solid border border-gray-300 hover:border-myColor'><svg width="18" height="18" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3z" />
                <path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 1 1-10.5 10.49a10.5 10.5 0 0 1 10.5-10.49m20.41 29h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z" />
              </svg></span>

            </article>
          </section>
          <span className=' mt-6 flex flex-row justify-center'><p>Need an account?</p><Link href={'./signup'} className='text-myColor transition delay-100 underline pl-1'>SIGN UP</Link></span>
        </section>
      </div>
      <Toaster richColors />
    </>

  )
}

export default Page

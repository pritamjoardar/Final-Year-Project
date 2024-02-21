"use client";
import React, { useContext, useState } from 'react';
import userContext from '@/context/UserContext';
import "./login.scss";
import Link from 'next/link';
import 'react-dropdown/style.css';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
const Page = () => {
  const router = useRouter();
  const { setUser } = useContext(userContext);
  interface Data {
    name: string;
    email: string;
    password: string;
    cpassword: string;
  }
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [data, setData] = useState<Data | any>({});
  const inputData = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  }
  const userSignUp = async (e: any) => {
    const { name, email, password, cpassword } = data;
    const { value } = selectedOption;
    try {
      e.preventDefault();
      if (password !== cpassword) {
        toast.error("password not match");
      }
      else {
        await axios.post('../api/users/signup', { name, email, password, value },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'content-type': 'application/json; charset=utf-8'
            }
          }).then((res) => {
            if (res.status === 201) {
              setUser(true);
              toast.success("user created successfully");
              router.push('/');
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              toast.error("Email is already exist");
            }
          });
      }
    } catch (error) {

      console.log(error);
    }
  }
  const options: any = [
    { value: 'Job', label: 'Job' },
    { value: 'Competitive', label: 'Competitive' },
    { value: 'Others', label: 'Others' },
  ];
  return (
    <>
      <div className=' h-[calc(100vh-3rem)] flex justify-center items-center'>
        <section id='login' className='h-min  w-1/3 p-8 flex flex-col justify-center rounded-lg'>
          <h1 className='font-bold text-gray-600 text-2xl'>SIGN UP</h1>
          <input onChange={inputData} type="text" placeholder='Name' name="name" className='outline-myColor p-2 mt-3 border-solid border border-gray-300 rounded-lg' />
          <input onChange={inputData} type="email" placeholder='Email' name="email" className='outline-myColor p-2 mt-3 border-solid border border-gray-300 rounded-lg' />
          <input onChange={inputData} type="password" placeholder='Password' name="password" className='outline-myColor p-2 mt-3 border-solid border border-gray-300 rounded-lg' />
          <input onChange={inputData} type="password" placeholder='Confirm Password' name="cpassword" className='outline-myColor p-2 mt-3 border-solid border border-gray-300 rounded-lg' />
          <Select
            className='mt-3'
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder='What is your goal'
            isSearchable
            name='goal'
          />
          <button id='sha' onClick={userSignUp} className='bg-myColor hover:bg-light rounded-lg p-1 text-white text-1xl mt-5' >SIGN UP</button>

          <span className='mt-6 flex flex-row justify-center'><p>Already a user?</p><Link href={'./login'} className='text-myColor transition delay-100 underline pl-1'>LOGIN</Link></span>
        </section>
      </div>
      <Toaster richColors />
    </>
  )
}

export default Page

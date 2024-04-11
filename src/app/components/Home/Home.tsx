"use client";
import React, { useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import "../../style/shadow.scss";
import Link from 'next/link';
const Home = () => {
  return (
    <>
     {/* For search */}
     <div className=" flex justify-center mt-1 px-5 ">
        <section className='w-full h-12 flex justify-center items-center border-solid border border-myColor rounded-full px-4 md:w-2/4'>
            <input className='w-full h-full rounded-full text-2xl text-gray-600 outline-none' type="search" name="" id="" placeholder='Search For Notes/ Courses/ Topic'/><span className='text-4xl hover:text-myColor text-gray-400 transition delay-100 cursor-pointer'><IoIosSearch /></span>

        </section>
    </div>
        <Link href={'/uploadnotes'} className="mx-5  mt-2 cursor-pointer flex justify-center  text-white "><button className='rounded-md bg-myColor w-full  p-1 md:w-2/4 '>Upload Your Notes</button></Link>
{/* For home page */}
<section className='grid grid-cols-4 gap-3 p-5'>
  <div id='login' className="bg-[url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bm90ZXN8ZW58MHx8MHx8fDA%3D')] cursor-pointer flex justify-center items-center h-48 rounded-lg "><p className='text-white font-bold text-3xl' >Notes Of The Day</p></div>
  <div id='login' className="bg-[url('https://plus.unsplash.com/premium_photo-1685134731588-783ca7471b65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8fDA%3D')] cursor-pointer flex justify-center items-center h-48 rounded-lg "><p className='text-white font-bold text-3xl' >Most Liked Notes</p></div>
  <div id='login' className="bg-[url('https://images.unsplash.com/photo-1569229761589-8838faca0b91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG5vdGVzfGVufDB8fDB8fHww')] cursor-pointer flex justify-center items-center h-48 rounded-lg "><p className='text-white font-bold text-3xl' >Notes In Trend</p></div>
  <div id='login' className="bg-[url('https://images.unsplash.com/photo-1576269483449-3b694997b362?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fG5vdGVzfGVufDB8fDB8fHww')] cursor-pointer flex justify-center items-center h-48 rounded-lg "><p className='text-white font-bold text-3xl' >Recently Added</p></div>
  <div id='login' className="bg-[url('https://images.unsplash.com/photo-1569360531163-a61fa3da86ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fG5vdGVzfGVufDB8fDB8fHww')] cursor-pointer flex justify-center items-center h-48 rounded-lg "><p className='text-white font-bold text-3xl' >Demo...</p></div>
  <div id='login' className="bg-[url('https://images.unsplash.com/photo-1568819297129-80fd50360f8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fG5vdGVzfGVufDB8fDB8fHww')] cursor-pointer flex justify-center items-center h-48 rounded-lg "><p className='text-white font-bold text-3xl' >Demo...</p></div>
  <div id='login' className="bg-[url('https://images.unsplash.com/photo-1514474959185-1472d4c4e0d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxub3Rlc3xlbnwwfHwwfHx8MA%3D%3D')] cursor-pointer flex justify-center items-center h-48 rounded-lg "><p className='text-white font-bold text-3xl' >Demo...</p></div>
  {/* <div  className="bg-[url('https://media.istockphoto.com/id/1401607744/vector/megaphone-loudspeaker-speaker-social-media-advertising-and-promotion-symbol-marketing.jpg?s=612x612&w=0&k=20&c=6mn25IhbAK4vCNpDwo2hySPhOO0hWwkkFDCaYw9tLLs=')] bg-cover cursor-pointer flex justify-center h-48 rounded-lg "><p className='font-bold text-3xl mt-5' >Announcements</p></div> */}
</section>
<section className='pr-5 pl-5 pb-5'>
  <div id='login' className="bg-[url('https://images.unsplash.com/photo-1584869942712-4584555b58a7?q=80&w=1234&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] cursor-pointer flex justify-center items-center h-48 rounded-lg "><p className='text-white font-bold text-3xl' >Get 
All Your Notes
In One Place</p></div>
  
</section>
  <footer className='bg-dark flex justify-center items-end h-44'>
    <p className='text-white'>&#169;2023</p>
  </footer>
    </>
  )
}

export default Home

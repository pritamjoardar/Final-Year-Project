"use client";
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link';
import axios from 'axios';
import "../../style/shadow.scss";
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { IoMdCloudDownload } from "react-icons/io";
import Announcement from '../buttons/Announcement';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();
const Home = () => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [notesData,setNotesData] = useState<[]>([]);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
      }
    
    const getNotes = async () =>{
        try {
            await axios.get('../../api/notesdata',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'content-type': 'application/json; charset=utf-8'
                }
            }
            )
            .then((res)=>{
                setNotesData(res.data.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
        useEffect(()=>{
            getNotes();
        },[])
     console.log(notesData);
    return (
        <>
            {/* For search */}
            <div className=" flex justify-center mt-1 px-5 ">
                <section className='w-full h-12 flex justify-center items-center border-solid border border-myColor rounded-full px-4 md:w-2/4'>
                    <input className='w-full h-full rounded-full text-2xl text-gray-600 outline-none' type="search" name="" id="" placeholder='Search For Notes/ Courses/ Topic' /><span className='text-4xl hover:text-myColor text-gray-400 transition delay-100 cursor-pointer'><IoIosSearch /></span>
                </section>
            </div>
            <Link href={'/uploadnotes'} className="mx-5  mt-2 cursor-pointer flex justify-center  text-white "><button className='rounded-md bg-myColor w-full  p-1 md:w-2/4 '>Upload Your Notes</button></Link>
            <Link href={"/announcements"} className="mx-5  mt-2 cursor-pointer flex justify-center  text-white "><Announcement/></Link>

            <div className="flex flex-wrap  justify-center">
           {notesData.map(({url},index)=>(
                <div className='border w-min p-2 bg-gray-300 m-2'>
                <Link href={url} target='_blank'>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess} >
                <Page className= '' width={300} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}/>
                </Document>
                </Link>
                <div className="flex justify-between"><p></p><a href={url} download className='text-blue-900 text-3xl'><IoMdCloudDownload /></a></div>
                
                </div>
           ))}
           </div>
           {/* <Link href={"/announcements"}><div className="bg-[url('https://media.istockphoto.com/id/1401607744/vector/megaphone-loudspeaker-speaker-social-media-advertising-and-promotion-symbol-marketing.jpg?s=612x612&w=0&k=20&c=6mn25IhbAK4vCNpDwo2hySPhOO0hWwkkFDCaYw9tLLs=')] bg-cover cursor-pointer flex justify-center h-48 rounded-lg "><p className='font-bold text-3xl mt-5'>Announcements</p></div></Link> */}
            <section className='pr-5 pl-5 pb-5'>
                <div className="bg-[url('https://images.unsplash.com/photo-1584869942712-4584555b58a7?q=80&w=1234&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] cursor-pointer flex justify-center items-center h-48 rounded-lg ">
                    <p className='text-white font-bold text-3xl' >Get All Your Notes In One Place</p>
                </div>
            </section>
            <footer className='bg-dark flex justify-center items-end h-44'>
                <p className='text-white'>&#169;2023</p>
            </footer>
        </>
    )
}

export default Home

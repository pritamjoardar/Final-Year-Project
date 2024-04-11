"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import { Toaster, toast } from 'sonner';
import moment from "moment"

const Page = () => {

    const [announcementList, setAnnouncementList] = useState([])

    const [announcementModalShow, setAnnouncementModalShow] = useState(false)
    const [announcementText, setAnnouncementText] = useState("")
    const [processAnnouncementApiLoading, setProcessAnnouncementApiLoading] = useState(false)

    const getAnnouncementList = () => {
        axios.get('../api/announcement/get_list', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'content-type': 'application/json; charset=utf-8'
            }
        })
            .then((res) => {
                console.log(res.data)
                setAnnouncementList(res.data.info)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        getAnnouncementList()
    }, [])

    const processAnnouncement = () => {
        if (!announcementText) {
            toast.warning("Announcement text is required");
            return
        }

        setProcessAnnouncementApiLoading(true)
        axios.post('../api/announcement/create', { announcement_text: announcementText }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'content-type': 'application/json; charset=utf-8'
            }
        })
            .then((res) => {
                setProcessAnnouncementApiLoading(false)
                if (res.status === 201) {
                    getAnnouncementList()
                    setAnnouncementModalShow(false);
                    setAnnouncementText("");

                    toast.success(res.data.message);
                }
                else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                setProcessAnnouncementApiLoading(false)
                if (err.response.status === 400) {
                    toast.error(err.message);
                }
            });
    }

    return (
        <> 
            <div className="container mx-auto my-3">
                <div className='flex align-center'>
                    <span className='text-4xl'>Announcements</span>
                    <button onClick={() => { setAnnouncementModalShow(true) }} className="bg-myColor rounded-md mx-5 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75" >+ Add Announcement</button>
                </div>

                <div className='p-4'>
                    <div className='flex text-2xl rounded-md' style={{backgroundColor:"deepskyblue"}}>
                        <span className='basis-2/3 grow px-2'>Notice Board</span>
                        <span className='basis-1/3 grow px-2'>Publish Date</span>
                    </div>
                    {
                        announcementList.length === 0 ? <div>No Announcements Yet</div> :
                            announcementList.map((x: { announcement_text: "string", publish_date: Date }, i) => {
                                return (
                                    <div className='flex py-2' key={i}>
                                        <span className='basis-2/3 grow px-2' style={{border:"1px solid grey"}} >{x.announcement_text}</span>
                                        <span className='basis-1/3 grow px-2' style={{border:"1px solid grey"}} >{moment(x.publish_date).format("lll")}</span>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>

            <Toaster richColors />

            <Transition appear show={announcementModalShow} as={React.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { setAnnouncementModalShow(false) }}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900" > Add an Announcement </Dialog.Title>

                                    <div className="mt-2">
                                        <textarea rows={4} value={announcementText} onChange={(e) => { setAnnouncementText(e.target.value) }} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write text here..."></textarea>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button onClick={() => { setAnnouncementModalShow(false) }} className="rounded-md border border-transparent bg-red-400 mx-1 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2" > Close </button>
                                        <button onClick={() => { processAnnouncement(); }} disabled={processAnnouncementApiLoading} className="rounded-md border border-transparent bg-green-400 mx-1 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2" >{processAnnouncementApiLoading ? "Please Wait..." : "Submit"}</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Page

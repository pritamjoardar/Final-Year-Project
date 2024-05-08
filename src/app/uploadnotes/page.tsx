"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import "./upload.scss";
import { Toaster, toast } from 'sonner';
interface UploadResponse {
  url: string;
}

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null); // this is your image url
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null);
  const [userData,setUserData] = useState<string | any>(['']);
  const [tagValue,setTagValue] = useState<string>("");
  const [tags,setTags] = useState<string[]>([]);
  const [title,setTitle] = useState<string>("");


  useEffect(() => {
    fetch('/api/users/me')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file || tags.length==0 || !title ){
        toast.error("Fields are empty");
        return;
      } 

      setUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploadnotes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data: UploadResponse = await response.json();

      setUploadedUrl(data.url);
      console.log("image Url", uploadedUrl);

      // save the data in database, start line
      if(data.url){
        let saveddata = await fetch("/api/savenotesindatabase", {
          method: "POST",
          body: JSON.stringify({
            "author": userData?._id,
            "author_name":userData?.name,
            "title": title,
            "tag": tags,
            "url": data.url,
            "share": 0,
            "favorite": 0,
            "like": 0,
            "views": 0,
            "comments": ""
          })
        });
      }

      if (data.url.endsWith('.pdf')) {
        setFileType('pdf');
      } else {
        setFileType('image');
      }

    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };
  const addTags = (e:any) =>{
    console.log(e);
    if(e.keyCode === 13 && tagValue){
      setTags([...tags,tagValue]);
      setTagValue("");
    }
  }

  const deleteTag = (val:any) =>{
    let remTag = tags.filter((t)=>t!==val);
    setTags(remTag);
  }
  return (
    <div className='h-[calc(100svh-4rem)] w-full flex flex-col lg:flex-row items-center justify-center'>
    <div id='login' className="grid  items-center gap-1.5 p-5 rounded-md md:w-1/3">
      <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Choose File</label>
      <input accept="application/pdf" onChange={handleFileChange} id="picture" type="file" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"/>
      <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Title</label>
      <input  id="picture" onChange={(e)=>setTitle(e.target.value)} type="text" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"/>
      <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tags</label>
      <div className="flex gap-1 flex-wrap">
        {tags.map((item,index)=>(
          <>
          <button className='border p-1 bg-slate-300' key={index} onClick={()=>deleteTag(item)}>{item}
          <span className="text-red-500 font-bold ml-2 bg-white p-1 rounded-full">x</span>
          </button>
          </>
        ))}
      </div>
      <input value={tagValue} placeholder='type your tag here' id="picture" onChange={(e)=>setTagValue(e.target.value)} onKeyDown={addTags} type="text" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"/>

          <div className='flex flex-col gap-4 items-center'>
            {uploadedUrl &&
              <p className='text-green-500 text-[20px]'>File uploaded successfully! ✔</p>
            }
            <button onClick={handleUpload} disabled={!file || uploading} className='bg-myColor w-full flex justify-center border-[2px] text-white font-bold rounded-lg border-white p-2  cursor-pointer gap-4'>
              {
                uploading ? <>
                  <p>Uploading...</p>
                  <div className="w-10 h-10 border-t-2 border-white border-solid rounded-full animate-spin"></div>

                </> : "Upload"
              }
            </button>
          </div>
          {uploadError && <p className='text-red-500 text-[20px] '>{uploadError}</p>}
    </div>
      {uploadedUrl && (
        <div>
          {fileType === 'image' && (
            <img
              src={uploadedUrl}
              alt="Uploaded file"
              className="w-[300px] lg:w-[400px] h-[200px] rounded-[10px]"
            />
          )}
        </div>
      )}
      {/* {fileType === 'pdf' && uploadedUrl && (
        <embed
          src={uploadedUrl}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      )} */}
      <Toaster richColors />
    </div>
  );
}

export default Page;

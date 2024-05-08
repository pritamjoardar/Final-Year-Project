"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaUpload } from "react-icons/fa6";

interface UploadResponse {
  url: string;
}

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);//this is your image url
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null);
  const [userData,setUserData] = useState<string | any>(['']);

  useEffect(()=>{
      fetch('/api/users/me').
      then((res)=>{
       return res.json()
      }).then((data)=>{
        setUserData(data);
      })
   },[]) 
    console.log('userDAta from uploadnotes',userData);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) return;

      setUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploadnotes", {
        method: "POST",
        body: formData,
      });

<<<<<<< HEAD
            const data: UploadResponse = await response.json();
            setUploadedUrl(data.url);
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
    console.log("image Url",uploadedUrl);
=======
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data: UploadResponse = await response.json();
>>>>>>> 37752158581e2caa5190febbb371c2a01b262a70

      setUploadedUrl(data.url);
      console.log("image Url", uploadedUrl);

      // save the data in database, start line
      if(data.url){
        let saveddata = await fetch("/api/savenotesindatabase", {
          method: "POST",
          body: JSON.stringify({
            "author": userData?._id,
            "author_name":userData?.name,
            "title": "",
            "tag": "",
            "url": data.url,
            "share": 0,
            "favorite": 0,
            "like": 0,
            "views": 0,
            "comments": "add your comment"
          })
        });
      }

      //end line

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

  return (
    <div className='w-full h-screen flex flex-col lg:flex-row items-center justify-center '>
      <div className='w-[80%] lg:w-[40%] h-[40%] lg:[40%] bg-orange-500 rounded-[10px] flex items-center justify-center'>
        <div >
          <div className='flex flex-col gap-4 items-center'>
            <div className='text-[45px] text-white'>
              <FaUpload />
            </div>

            <input type="file" onChange={handleFileChange} className='ml-[70px]' />
            {uploadedUrl &&
              <p className='text-green-500 text-[20px]'>File uploaded successfully! ✔</p>
            }
            <button onClick={handleUpload} disabled={!file || uploading} className='bg-black mr-[20px] border-[2px] border-white px-[40px] lg:px-[60px] text-white py-[17px] rounded-[10px] text-[26px] cursor-pointer flex gap-4'>
              {
                uploading ? <>
                  <p>Uploading...</p>
                  <div className="w-10 h-10 border-t-2 border-white border-solid rounded-full animate-spin"></div>

                </> : "Upload"
              }
            </button>

          </div>
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
      {fileType === 'pdf' && uploadedUrl && (
        <embed
          src={uploadedUrl}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      )}
    </div>
  );
}

export default Page

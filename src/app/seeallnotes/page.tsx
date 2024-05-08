"use client"
import React, { useState, useEffect } from 'react';

interface Note {
    _id: string;
    url: string;
}

const Page = () => {
    const [data, setData] = useState<Note[]>([]);

    useEffect(() => {
        fetch(`/api/getsavednotes`)
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array means this effect runs once after the component mounts

    return (
        <div className='min-h-[100vh] flex flex-col gap-3 bg-slate-500 '>
            {
               data && data.map((value: Note) => (
                    <div key={value._id}>                        
                        { value.url.endsWith('.pdf') ? (
                            <embed
                                src={value.url}
                                type="application/pdf"
                                width="100%"
                                height="500px"
                            />
                        ) : (
                            <div>
                                <img
                                    src={value.url}
                                    alt="Uploaded file"
                                    className="w-[300px] lg:w-[400px] h-[200px] rounded-[10px]"
                                />
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    );
};

export default Page;

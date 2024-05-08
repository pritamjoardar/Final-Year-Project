import React from 'react'

const page = async () => {
    let data = await fetch(`https://final-year-project-blond.vercel.app/api/getsavednotes`);
    let data1 = await data.json();
    return (
        <div className='min-h-[100vh] flex flex-col gap-3 bg-slate-500 '>
            {
                data1.map((value:any) => (
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
                        )
                          }
                    </div>
                ))
            }
        </div>
    )
}

export default page
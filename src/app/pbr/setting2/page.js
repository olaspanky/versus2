
"use client"

import Layout2 from '@/app/shared/Layout2'
import VideoPlayer from "../../components/Videoplayer";


export default function Page() {
  return (
    <Layout2>
      <div>
      <div className=" ">
      <div className='flex flex-col gap-5 md:flex-row justify-between items-center my-5'>
            <div className=''><h1 className='md:text-4xl text-xl font-extrabold '>How to use VERSUSTM</h1></div>
            <div className='bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md'>
          </div>
        </div>
              <VideoPlayer />
    </div>


        </div>

    </Layout2>
  ) 
}

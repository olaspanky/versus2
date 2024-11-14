"use client"

import { useRouter } from 'next/navigation'
import Otp from "../../components/Otp"
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
import "@aws-amplify/ui-react/styles.css";



 const Signup=()=> {
  const router = useRouter();

  

  return (
    <main className="flex max-h-[100vh] flex-col items-center justify-between ">
    <div className='p-[5rem] '>
      <div className='flex flex-col gap-5 my-10'>
        <div>
          <h1 className='text-5xl font-extrabold'>Welcome To VERSUS&#8482;</h1>
        </div>

        <section className=' my-9 flex flex-col gap-9 w-[90%]'>
          <div className=' flex flex-col gap-5'>
            <Otp />
          </div>
        </section>
      </div>
    </div>
  </main>
  )
}
export default Signup
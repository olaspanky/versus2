
"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared2/Layout'
import Home2 from "../../components/Home22"




const Home = () =>{
  return (
    <Layout2>
    <main className="bg-gray-100 flex flex-col items-center justify-between ">
      <Home2/>
    </main>
    </Layout2>
  )
}
export default Home

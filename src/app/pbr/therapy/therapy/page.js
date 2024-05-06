"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import Therapy from "../../../components/therapy/Therapy"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Therapy />
    </Layout2>
  )
}
export default withAuth(Home)

"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import Prescription from "../../../components/prescription/Prescription"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Prescription />
    </Layout2>
  )
}
export default withAuth(Home)
"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import Competitive from "../../../components/competitive/Competitive"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Competitive />
    </Layout2>
  )
}
export default withAuth(Home)

"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import Market from "../../../components/therapymarket/Market"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Market />
    </Layout2>
  )
}
export default withAuth(Home)

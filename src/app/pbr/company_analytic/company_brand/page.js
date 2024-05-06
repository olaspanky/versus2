"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import Performance from "../../../components/brand/Performance"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Performance />
    </Layout2>
  )
}
export default withAuth(Home)

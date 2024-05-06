
"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import BrandShare from "../../../components/weighted/Weighted"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <BrandShare />
    </Layout2>
  )
}
export default withAuth(Home)
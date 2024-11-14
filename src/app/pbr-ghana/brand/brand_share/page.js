"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout'
import BrandShare from "../../../components2/brand_share/BrandShare"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <BrandShare />
    </Layout2>
  )
}
export default withAuth(Home)
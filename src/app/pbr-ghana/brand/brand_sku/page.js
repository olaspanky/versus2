"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout'
import Sku from "../../../components2/brand_sku/BrandSku"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Sku />
    </Layout2>
  )
}
export default withAuth(Home)
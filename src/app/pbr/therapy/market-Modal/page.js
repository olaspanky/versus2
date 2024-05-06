"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import MarketModal from "../../../components/MarketModal/Index"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <MarketModal />
    </Layout2>
  )
}
export default withAuth(Home)

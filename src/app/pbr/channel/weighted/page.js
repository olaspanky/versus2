"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import Channel from "../../../components/channel_brand/Channel_brand"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Channel />
    </Layout2>
  )
}
export default withAuth(Home)
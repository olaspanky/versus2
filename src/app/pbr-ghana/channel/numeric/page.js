"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout'
import Numeric from "../../../components2/numeric/Numeric"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Numeric />
    </Layout2>
  )
}
export default withAuth(Home)
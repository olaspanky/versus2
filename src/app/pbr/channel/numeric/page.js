"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import Numeric from "../../../components/numeric/Numeric"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Numeric />
    </Layout2>
  )
}
export default withAuth(Home)
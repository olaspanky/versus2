"use client"
import Image from 'next/image'
import Layout2 from '@/app/shared/Layout2'
import Patient from "../../../components/patient/Patient"
import withAuth from '@/app/utilities/withAuth'

      



const Home = () =>{
  return (
    <Layout2>
    <Patient />
    </Layout2>
  )
}
export default withAuth(Home)


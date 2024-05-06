"use client"

import { useRouter } from 'next/navigation'
import Form from "../../components/Form"
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
import "@aws-amplify/ui-react/styles.css";



 const Signup=()=> {

 

  return (
    <main className="">
   <Form/>
    </main>
  )
}
export default Signup
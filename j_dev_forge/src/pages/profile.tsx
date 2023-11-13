/* Example File from https://github.com/nextauthjs/next-auth-example*/

import { useSession } from "next-auth/react"
import { useState } from 'react';
import Layout from "../components/layout"
import Image from 'next/image' //https://nextjs.org/docs/pages/api-reference/components/image
import AccessDenied from "@/components/access-denied"
import Link from "next/link"

export default function Profile() {
  const { data } = useSession()
  const [userData, setUserData] = useState(null);
  var isRegistered = false

  const fetchData = async (email: string) => {
    try {
      if (!email) {
        console.error('Missing email parameter')
        return;
      }

      const response = await fetch(`/api/users?email=${email}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      const data = await response.json()

      if(data.length>0){
        isRegistered = true
      }
      setUserData(data.data);
          
    } catch (error) {
      console.error(error);
    }
  };


  console.log(data)
    // If no session exists, display access denied message
    if (!data) {
      return (
        <Layout>
          <AccessDenied />
        </Layout>
      )
    }else{
      const email = data?.user?.email || ""
      fetchData(email)
    }

    
  
  return (
    <Layout>
      <h2>{data?.user?.name} | {data?.user?.email}</h2>
      <Image
      src={data?.user?.image||""}
      width={200}
      height={200}
      alt="Picture of the user"
    />
    {/* Try to get extra info from mongoDB */}
    {isRegistered ? (<div>
      {/* If it does exist show edit option */}
      <p>Thank you for registering</p>
      <p>{JSON.stringify(userData)}</p>
    </div>):(userData ? 
    ( (<div>
      {/* If it doesn't exist prompt for registration */}
          <p>Please register...</p>
          <Link href={`users/new`}>
              <button className="btn edit">Set Up Profile!</button>
          </Link>
        </div>)
        ) : (
          <div>
            {/* Show that mongoDB is being fetched */}
            <p>Loading...</p>
          </div>
      ))}

    
    
    </Layout>
  )
}
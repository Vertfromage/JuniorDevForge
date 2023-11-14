/* Example File from https://github.com/nextauthjs/next-auth-example*/

import { useSession } from "next-auth/react"
import { useState } from 'react';
import Layout from "../components/layout"
import Image from 'next/image' //https://nextjs.org/docs/pages/api-reference/components/image
import AccessDenied from "@/components/access-denied"
import Link from "next/link"

interface UserData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  city: string;
  province: string;
  description: string;
  website: string;
  projects: any[];
  linkedIn: string;
  github: string;
  reviews: any[];
}

export default function Profile() {
  const { data } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isRegistered, setIsRegistered] = useState(false)

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

      const res = await response.json()

      if(res.data[0]){
        setIsRegistered(true)
      }
      setUserData(res.data[0]);
          
    } catch (error) {
      console.error(error);
    }
  };
  
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
    console.log(isRegistered)
  return (
    <Layout>
      <h1>{data?.user?.name} | {data?.user?.email}</h1>
      <Image
      src={data?.user?.image||""}
      width={100}
      height={100}
      alt="Picture of the user"
    />
    {/* Try to get extra info from mongoDB */}
    {isRegistered && userData ? (<div>
      {/* If it does exist show edit option */}
      <div>
        <h2>{userData?.city}, {userData?.province}</h2>
        <h3> {userData?.description}</h3>
        <p><strong>Email:</strong> {userData?.email}</p>
        <p><strong>Role:</strong> {userData?.role}</p>   
        <p><strong>Website:</strong> <a href={userData?.website}>{userData?.website}</a></p>
        <p><strong>LinkedIn:</strong> <a href={userData?.linkedIn}>{userData?.linkedIn}</a></p>
        <p><strong>GitHub:</strong> <a href={userData?.github}>{userData?.github}</a></p>
          <Link href={`users/`+(userData?._id)+`/edit`}>
              <button className="btn edit">Edit Profile!</button>
          </Link>
      </div>
    </div>):(userData ? 
    ( (<div>
      {/* If it doesn't exist prompt for registration */}
          <p>Please register...</p>
          <Link href={`users/new`}>
              <button className="btn new">Set Up Profile!</button>
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
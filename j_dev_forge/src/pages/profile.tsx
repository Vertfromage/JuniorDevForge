/* Example File from https://github.com/nextauthjs/next-auth-example*/

import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import Image from 'next/image' //https://nextjs.org/docs/pages/api-reference/components/image

export default function MePage() {
  const { data } = useSession()
  console.log(data)
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
    {/* If it doesn't exist prompt for registration */}
    {/* If it does exist show edit option */}
    </Layout>
  )
}

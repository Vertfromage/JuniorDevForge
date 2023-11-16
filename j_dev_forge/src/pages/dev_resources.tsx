/* Example File from https://github.com/nextauthjs/next-auth-example*/

import DemoNav from "@/components/DemoNav"
import Layout from "../components/layout"

const DevResources = () => {
  return (
    <Layout>
    <DemoNav/>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>

      <hr/>
    </Layout>
  )
}

export default DevResources
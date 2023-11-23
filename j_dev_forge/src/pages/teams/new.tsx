import { useSession } from 'next-auth/react'
import Layout from '../../components/layout'
import Form from '@/components/teamForm'
import AccessDenied from '@/components/access-denied'


const NewTeam = () => {
  const { data } = useSession()

  if (!data) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  
  const TeamData= {
    projectId : "",
    teamMembers :[]
 }

  return (
  <Layout>
   <Form formId="add-user-form" teamForm={TeamData} />
  </Layout>
  )
}

export default NewTeam
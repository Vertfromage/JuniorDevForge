import { useSession } from 'next-auth/react'
import Layout from '../../components/layout'
import Form from '@/components/ProjectForm'
import AccessDenied from '@/components/access-denied'


const NewProject= () => {
  const { data } = useSession()

  if (!data) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }
  
  const projectData = {
    name : "",
    description : "",
    price: "",
    location: "",
    category: "",
    website: ""
  }
  

  return (
  <Layout>
   <Form formId="add-project-form" projectData={projectData}  />
  </Layout>
  )
}

export default NewProject
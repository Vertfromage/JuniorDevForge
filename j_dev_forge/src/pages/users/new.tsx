import { useSession } from 'next-auth/react'
import Layout from '../../components/layout'
import Form from '@/components/UserForm'
import AccessDenied from '@/components/access-denied'


const NewUser = () => {
  const { data } = useSession()

  if (!data) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  const name = data?.user?.name
  const email = data?.user?.email
  const photo = data?.user?.image

  // Make sure values aren't null
  if(!name||!email||!photo){
    return (
      <Layout>
        <div><p>Name, email, photo...</p></div>
      </Layout>
    )
  }
  // split name returned by github into first and last
  const splitName = name.split(" ")
  
  const userForm = {
    firstName: splitName[0],
    lastName: splitName[1],
    email: email,
    image_url: photo,
    role:  'Junior Developer',
    city: '',
    province:  '',
    description:  '',
    website:  '',
    linkedIn:  '',
    github:  '',
  }

  return (
  <Layout>
   <Form formId="add-user-form" userForm={userForm} />
  </Layout>
  )
}

export default NewUser
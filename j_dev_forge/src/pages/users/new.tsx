import Layout from '../../components/layout'
import Form from '@/components/RegisterForm'


const NewUser = () => {
  const userForm = {
    firstName: '',
    lastName: '',
    email: '',
    image_url: '',
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
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '@/components/UserForm'
import { useSession } from 'next-auth/react'
import Layout from '@/components/layout'
import AccessDenied from '@/components/access-denied'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditUser = () => {
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

  const router = useRouter()
  const { id } = router.query
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(id ? `/api/users/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!user) return null



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
  return <Layout><Form formId="edit-user-form" userForm={userForm} forNewUser={false} /></Layout>
}

export default EditUser
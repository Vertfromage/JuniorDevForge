import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '@/components/teamForm'
import { useSession } from 'next-auth/react'
import Layout from '@/components/layout'
import AccessDenied from '@/components/access-denied'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditTeam = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: team,
    error,
    isLoading,
  } = useSWR(id ? `/api/teams/${id}` : null, fetcher)

  const { data } = useSession()

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!team) return null

  if (!data) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }
  const name = data?.user?.name || "defult"
  
  const TeamData= {
    projectId : "",
    teamMembers :[name]
 }


  return <Layout><Form formId="edit-team-form" teamForm={TeamData} forNewTeam={false} /></Layout>
}

export default EditTeam
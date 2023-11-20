import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr' //https://swr.vercel.app/

interface TeamData {
    projectId : string
    teamMembers : string[]
 }

type Props = {
    formId: string
    teamForm: TeamData
    forNewTeam?: boolean
  }

  
const Form = ({ formId, teamForm, forNewTeam = true }: Props) => {
    const router = useRouter()
    const contentType = 'application/json'
    const [message, setMessage] = useState('')
  
    const [form, setForm] = useState({
    projectId : teamForm.projectId,
    teamMembers : teamForm.teamMembers,
    })

    /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: TeamData) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/teams/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      const { data } = await res.json()

      mutate(`/api/teams/${id}`, data, false) // Update the local data without a revalidation
      router.push('/') //should push back in to project page this team goes with 
    } catch (error) {
      setMessage('Failed to update Team')
    }
  }


  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: TeamData) => {

    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      router.push('/') //should push back in to project page this team goes with 
    } catch (error) {
      console.log(error)
      setMessage('Failed to add team')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
  
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

      forNewTeam ? postData(form) : putData(form)

  }

  return (
    <>
      
      <form id={formId} onSubmit={handleSubmit}>
        {forNewTeam ? 
        (
      <><label htmlFor="projectId">Project</label><input
                          type="text"
                          name="projectId"
                          maxLength={10}
                          value={form.projectId}
                          onChange={handleChange}
                           />
                           <button type="submit" className="btn">
                           Submit
                         </button></>
  ): (<><button type="submit" className="btn">
          Join Team
        </button></>)
        }
      </form>
    </>
  )
}

export default Form

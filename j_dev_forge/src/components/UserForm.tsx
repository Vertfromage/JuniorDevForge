import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr' //https://swr.vercel.app/

interface FormData {
  firstName: string // required 
  lastName: string
  email: string // required
  imageUrl: string // required
  role: string // required
  city: string
  province: string
  description: string
  website: string
  linkedIn: string 
  github: string
}

interface Error {
  firstName?: string
  email?: string
  role?: string
  imageUrl?: string
}

type Props = {
  formId: string
  userForm: FormData
  forNewUser?: boolean
}

const Form = ({ formId, userForm, forNewUser = true }: Props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    firstName: userForm.firstName,
    lastName: userForm.lastName,
    email : userForm.email,
    imageUrl: userForm.imageUrl,
    role: userForm.role,
    city: userForm.city,
    province: userForm.province,
    description: userForm.description,
    website: userForm.website,
    linkedIn: userForm.linkedIn,
    github: userForm.github,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/users/${id}`, {
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

      mutate(`/api/users/${id}`, data, false) // Update the local data without a revalidation
      router.push('/profile')
    } catch (error) {
      setMessage('Failed to update User')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {

    try {
      const res = await fetch('/api/users', {
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

      router.push('/profile')
    } catch (error) {
      console.log(error)
      setMessage('Failed to add user')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const value =
      target.type === 'checkbox'
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;
  
    setForm({
      ...form,
      [name]: value,
    });
  };
  

  /* Makes sure User info is filled for User name, email, and image url*/
  const formValidate = () => {
    let err: Error = {}
    if (!form.firstName) err.firstName = 'First name is required'
    if (!form.email) err.email = 'Email is required'
    if (!form.imageUrl) err.imageUrl = 'Image URL is required'
    return err
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = formValidate()

    if (Object.keys(errs).length === 0) {
      forNewUser ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      
      <form id={formId} onSubmit={handleSubmit}>
      <h1>Hello {form.firstName} {form.lastName}, {form.email}</h1>
      <p>We need some information for your profile!</p>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="Junior Developer">Junior Developer</option>
          <option value="Project Manager">Project Manager</option>

        </select>

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          maxLength={10}
          value={form.city}
          onChange={handleChange}
        />

        <label htmlFor="province">Province</label>
        <input
          type="text"
          name="province"
          maxLength={10}
          value={form.province}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          maxLength={60}
          value={form.description}
          onChange={handleChange}
        />
        <label htmlFor="website">Website</label>
        <input
          type="text"
          name="website"
          maxLength={60}
          value={form.website}
          onChange={handleChange}
        />
        <label htmlFor="linkedIn">LinkedIn</label>
        <input
          type="text"
          name="linkedIn"
          maxLength={60}
          value={form.linkedIn}
          onChange={handleChange}
        />

        <label htmlFor="github">GitHub</label>
        <input
          type="text"
          name="github"
          maxLength={60}
          value={form.github}
          onChange={handleChange}
        />


        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form

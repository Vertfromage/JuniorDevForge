//Used base code from UserFrom file

import { useState } from 'react'
import { useRouter } from 'next/router'

interface FormData {
  name: string // required
  description: string // required
  category: string 
  price: string // required
  location: string // required
  website: string
}

interface Error {
  name?: string
  description?: string
  price?: string
  location?: string
}

type Props = {
  formId: string
  projectData: FormData
  forNewProject?: boolean
}

const Form = ({ formId,  projectData, forNewProject = true }: Props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name:         projectData.name,
    description:    projectData.description,
    category:       projectData.category,
    price:          projectData.price,
    location:       projectData.location,
    website:        projectData.website,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/projects/${id}`, {
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

    } catch (error) {
      setMessage('Failed to update project')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {

    try {
      const res = await fetch('/api/projects', {
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

      router.push('/projects')
    } catch (error) {
      console.log(error)
      setMessage('Failed to add project')
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
  

  /* Makes sure Project info is filled with the required info*/
  const formValidate = () => {
    let err: Error = {}
    if (!form.name) err.name = 'Project name is required'
    if (!form.description) err.description = 'Description is required'
    if (!form.price) err.price = 'Price is required'
    if (!form.location) err.location = 'Location is required'
    return err
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = formValidate()

    if (Object.keys(errs).length === 0) {
      forNewProject ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      
      <form id={formId} onSubmit={handleSubmit}>
      <p>We need some information for your project!</p>

      <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          maxLength={20}
          value={form.name}
          onChange={handleChange}
        />

      <label htmlFor="description">Description</label>
        <textarea
          name="description"
          maxLength={60}
          value={form.description}
          onChange={handleChange}
        />

        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >

          <option value="Mobile">Mobile Project</option>
          <option value="Desktop">Desktop Project</option>

        </select>

        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          maxLength={10}
          value={form.price}
          onChange={handleChange}
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          maxLength={20}
          value={form.location}
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
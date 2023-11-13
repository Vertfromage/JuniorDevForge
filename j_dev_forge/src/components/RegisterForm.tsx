import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr' //https://swr.vercel.app/

interface FormData {
  firstName: string // required 
  lastName: string
  email: string // required
  image_url: string // required
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
  image_url?: string
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
    image_url: userForm.image_url,
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

    const user = {
      email : form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      imageUrl: form.image_url,
      role: form.role,
      profile: {
        city: form.city,
        province: form.province,
        description: form.description,
        website: form.website,
        //projects: [],
        socialMedia: {
          linkedIn: form.linkedIn,
          github: form.github,
        },     
        //reviews:[]   
      }
    }

    try {
      const res = await fetch(`/api/Users/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(user),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      const { data } = await res.json()

      mutate(`/api/Users/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update User')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    const user = {
      email : form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      imageUrl: form.image_url,
      role: form.role,
      profile: {
        city: form.city,
        province: form.province,
        description: form.description,
        website: form.website,
        //projects: [],
        socialMedia: {
          linkedIn: form.linkedIn,
          github: form.github,
        },     
        //reviews:[]   
      }
    }

    try {
      const res = await fetch('/api/Users', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(user),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add User')
    }
  }

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const target = e.target
  //   const value =
  //     target.name === 'role'
  //       ? (target as HTMLInputElement).checked
  //       : target.value
  //   const name = target.name

  //   setForm({
  //     ...form,
  //     [name]: value,
  //   })
  // }

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
    if (!form.image_url) err.image_url = 'Image URL is required'
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
      <h1>Hello {form.firstName} {form.lastName},</h1>
      <p>We need some information for your profile!</p>
        {/* <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          maxLength={20}
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          maxLength={20}
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          maxLength={30}
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="image_url">Image Url</label>
        <input
          type="text"
          name="image_url"
          maxLength={30}
          value={form.image_url}
          onChange={handleChange}
        /> */}

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

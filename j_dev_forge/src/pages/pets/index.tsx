/* Example File from https://github.com/nextauthjs/next-auth-example*/

import Layout from "../../components/layout"
import Link from 'next/link'
// import Image from "next/image"
import dbConnect from '../../lib/dbConnect'
import Pet, { Pets } from '../../models/Pet'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'

type Props = {
  pets: Pets[]
}

const IndexPage = ({ pets }: Props) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const petID = router.query.id

    try {
      await fetch(`/api/pets/${petID}`, {
        method: 'DELETE',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the pet.')
    }
  }
  return (
    <Layout>
      <h1>with-mongodb-mongoose Example</h1>
      <p>
        This is an example to demonstrate how to use{" "}
        <a href="https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose">MongoDB with mongoose</a> for data retrieval.
      </p>
      <h2><Link href={{ pathname: 'pets/new'}}><button className="btn new">Add New Pet!</button></Link></h2>

      <hr/>

      <>
      {pets && pets.map((pet) => (
        <div key={pet._id}>
          <div className="card">
            <img src={pet.image_url} />
            {/* <Image src={"pet.image_url"} alt={""}></Image> */}
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>

              {/* Extra Pet Info: Likes and Dislikes */}
              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>

              <div className="btn-container">
                <Link href={{ pathname: 'pets/[id]/edit', query: { id: pet._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: 'pets/[id]', query: { id: pet._id } }}>
                  <button className="btn view">View</button>
                </Link>
                <button className="btn delete" onClick={handleDelete}>
                Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>







    </Layout>
  )
}

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect()

  /* find all the data in our database */
  const result = await Pet.find({})

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const pets = result.map((doc) => {
    const pet = JSON.parse(JSON.stringify(doc))
    return pet
  })

  return { props: { pets: pets } }
}

export default IndexPage

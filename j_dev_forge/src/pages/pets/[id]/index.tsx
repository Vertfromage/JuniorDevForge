import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import Image from 'next/image'
import dbConnect from '../../../lib/dbConnect'
import Pet, { Pets } from '../../../models/Pet'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Layout from '@/components/layout'

interface Params extends ParsedUrlQuery {
  id: string
}

type Props = {
  pet: Pets
}

/* Allows you to view pet card info and delete pet card*/
const PetPage = ({ pet }: Props) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const petID = router.query.id

    try {
      await fetch(`/api/pets/${petID}`, {
        method: 'Delete',
      })
      router.push('/pets')
    } catch (error) {
      setMessage('Failed to delete the pet.')
    }
  }

  return (
    <Layout>
    <h1>{pet.name}'s Page</h1>
    <div key={pet._id}>
      <div className="card">
      <img src={pet.image_url} />
      {/* <Image src={"pet.image_url"} alt={pet.name+"'s picture"}></Image> */}
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
            <Link href={`pets/${pet._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
     </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect()

  if (!params?.id) {
    return {
      notFound: true,
    }
  }

  const pet = await Pet.findById(params.id).lean()

  if (!pet) {
    return {
      notFound: true,
    }
  }

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const serializedPet = JSON.parse(JSON.stringify(pet))

  return {
    props: {
      pet: serializedPet,
    },
  }
}

export default PetPage

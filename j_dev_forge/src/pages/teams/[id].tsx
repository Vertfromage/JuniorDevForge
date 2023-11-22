import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import dbConnect from '../../lib/dbConnect';
import Team, { Teams } from '../../models/Team';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image'
import User from "@/models/User";
import Link from "next/link";

interface Props {
  team: Teams;
}

interface User {
    _id: string;
    email: string;
    imageUrl: string;
    firstName: string;
    lastName?: string;
    role: string;
    city: string;
    province: string;
  }

const TeamProfile = ({ team }: Props) => {
  const [members, setMembers] = useState<User[]>([]);
  console.log(team)

  useEffect(() => {
  const fetchUser = async (id: string) => {
    console.log("fetching "+id)
    try {
      const response = await fetch('/api/users/'+id);
      const data = await response.json();
      return data.data
    } catch (error) {
      console.error('Error fetching user:', error);
      return null
    }
  };
  const fetchAllMembers = async () => {
    const userPromises = team.teamMembers.map((mem) => fetchUser(mem)); // fetch all members
    const usersData = await Promise.all(userPromises); // wait for all responses
    const filteredUsersData = usersData.filter((userData) => userData !== null); // get rid of nulls from errors
    
    if (filteredUsersData.length > 0) {
        const updatedMembers = [...members, ...filteredUsersData];
        setMembers(updatedMembers);
      }
  }
  setMembers([])
  fetchAllMembers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []) 
console.log(members)

  return (
    <Layout>
      <h1>Team Page: {team.projectId}</h1>
      {
        members.map( (mem)=>(
            <div key={mem._id}>
                  <div className="membersButton">
                  <style jsx>{`
                                .membersButton {
                                  width: 100%;
                                  text-align: center;
                                  margin: 10px; 
                                }

                                .btn {
                                  width: 100%;
                                  padding: 10px; 
                                  text-align: center;
                                  text-decoration: none;
                                  display: block;
                                  font-size: 16px;
                                  cursor: pointer;
                                  border: 1px solid #ccc;
                                }
                                .btn:hover {
                                  background-color: #e0e0e0; 
                                }

                                h2 {
                                  margin-bottom: 5px; 
                                }
                              `}
                  </style>
                    <Link href={`/users/${mem._id}`}>
                      <button className="btn view">
                <h2>{mem.firstName} {mem.lastName}</h2>
                {mem.imageUrl ? <Image
                    src={mem?.imageUrl||""}
                    width={100}
                    height={100}
                    alt="Picture of the user"
                  /> : <></>}</button>
                    </Link>
                  </div>
            </div>
        ))
      }
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  await dbConnect();

  const teamId = context.params?.id as string;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return {
        notFound: true,
      };
    }

    const serializedTeam = JSON.parse(JSON.stringify(team));

    return {
      props: {
        team: serializedTeam,
      },
    };
  } catch (error) {
    console.error('Error fetching team:', error);

    return {
      notFound: true,
    };
  }
};





export default TeamProfile;
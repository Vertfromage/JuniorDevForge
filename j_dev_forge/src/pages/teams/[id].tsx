import Layout from "../../components/layout";
import dbConnect from '../../lib/dbConnect';
import Team, { Teams } from '../../models/Team';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image'

interface Props {
  team: Teams;
}

const teamProfile = ({ team }: Props) => {
  console.log(team)
  return (
    <Layout>
      <h1>Team Page</h1>
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

export default teamProfile;

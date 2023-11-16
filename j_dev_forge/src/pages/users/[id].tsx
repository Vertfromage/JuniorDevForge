import Layout from "../../components/layout";
import dbConnect from '../../lib/dbConnect';
import User, { Users } from '../../models/User';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface Props {
  user: Users;
}

const UserProfile = ({ user }: Props) => {
  return (
    <Layout>
      <h1>{user.firstName} {user.lastName}'s Profile</h1>
      <div className="card">
        <div className="content">
          <p className="user-name">{user.firstName} {user.lastName}</p>
          <p className="email">Email: {user.email}</p>
          <p className="role">Role: {user.role}</p>
          <p className="city">City: {user.city}</p>
          <p className="province">Province: {user.province}</p>
          <p className="description">Description: {user.description}</p>
          <p className="website">Website: {user.website}</p>
          <p className="linkedIn">LinkedIn: {user.linkedIn}</p>
          <p className="github">GitHub: {user.github}</p>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  await dbConnect();

  const userId = context.params?.id as string;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return {
        notFound: true,
      };
    }

    const serializedUser = JSON.parse(JSON.stringify(user));

    return {
      props: {
        user: serializedUser,
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);

    return {
      notFound: true,
    };
  }
};

export default UserProfile;

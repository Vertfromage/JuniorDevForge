import Layout from "../../components/layout";
import dbConnect from '../../lib/dbConnect';
import User, { Users } from '../../models/User';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface Props {
  user: Users;
}

const UserProfile = ({ user }: Props) => {
  console.log(user)
  return (
    <Layout>
      <h1>{user.firstName} {user.lastName}&apos;s Profile</h1>
      <div>
        <div className="conent">
          {/* Role */}
          <p>
            <span className="profile-field">{user.role}</span>
          </p>

          {/* Location */}
          <p>
            <span className="profile-field">Located in: </span>
            <span className="value">{user.city}, {user.province}</span>
          </p>

          {/* Description */}
          <p>
            <span className="profile-field">Description: </span>
            <span className="value">{user.description}</span>
          </p>
          <p>
            <span className="profile-field">Website: </span>
            <span className="value">{user.website}</span>
          </p>
          <p>
            <span className="profile-field">LinkedIn: </span>
            <span className="value">{user.linkedIn}</span>
          </p>
          <p>
            <span className="profile-field">Github: </span>
            <span className="value">{user.github}</span>
          </p>
          {/* GitHub */}
          
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
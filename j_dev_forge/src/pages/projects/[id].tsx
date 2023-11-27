import { User as NextAuthUser } from "next-auth"; // Rename User to NextAuthUser
import Layout from "../../components/layout";
import dbConnect from '../../lib/dbConnect';
import Project, { Projects as ProjectType } from '../../models/Project';
import User, { Users } from '../../models/User';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import TeamProfile from "../teams/[id]";

interface Props {
  project: ProjectType;
  // user: Users; // This was causing a type error, but it wasn't actually being used. 
}


const ProjectDetails = ({ project }: Props) => {
  const team = {
     _id:"655e1f88f4ba3e8b56af9696",
     projectId :"",
     teamMembers :[],
  }

  return (
    <Layout>
      <h1>{project.description}</h1>
      <div>
        {/* Owner */}
        <p>
          <span className="profile-field">Owner: </span>
          {/* Broken: <span className="value">{project.owner.firstName} {project.owner.lastName}</span> */}
        </p>

        {/* Description */}
        <p>
          <span className="profile-field">Description: </span>
          <span className="value">{project.description}</span>
        </p>


          {/* Category */}
          <p>
            <span className="profile-field">Category: </span>
            <span className="value">{project.category}</span>
          </p>

          {/* Price */}
          <p>
            <span className="profile-field">Price: </span>
            <span className="value">{project.price}</span>
          </p>

          {/* Location */}
          <p>
            <span className="profile-field">Location: </span>
            <span className="value">{project.location}</span>
          </p>

          {/* Tech Stack */}
          <p>
            <span className="profile-field">Tech Stack: </span>
            <span className="value">{project.tech_stack.join(', ')}</span>
          </p>

          {/* Website */}
          <p>
            <span className="profile-field">Website: </span>
            <span className="value"><a href={project.website}>{project.website}</a></span>
          </p>

          {/* Status */}
          <p>
            <span className="profile-field">Status: </span>
            <span className="value">{project.status}</span>
          </p>

          {/* Members */}
          <p>
            <span className="profile-field">Members: </span>
          </p>

          {/* Payment Received */}
          <p>
            <span className="profile-field">Payment Received: </span>
            <span className="value">{project.payment_received ? 'Yes' : 'No'}</span>
          </p>

          <iframe id="myIframe" src={"/teams/"+project.team} style={{height:'600px'}}>

          </iframe>
        </div>
    </Layout>
  );
};

// ... (import statements remain unchanged)

export const getServerSideProps: GetServerSideProps<Props> = async (
    context: GetServerSidePropsContext
  ) => {
    await dbConnect();
  
    const projectId = context.params?.id as string;
  
    try {
      // Fetch project
      const project = await Project.findById(projectId);
  
      if (!project) {
        return {
          notFound: true,
        };
      }
  
      // Fetch owner user data based on owner_id
      const owner = await User.findById(project.owner_id);
  
      if (!owner) {
        return {
          notFound: true,
        };
      }
  
      // Combine project and owner data
      const serializedProject = JSON.parse(JSON.stringify(project));
      const serializedOwner = JSON.parse(JSON.stringify(owner));
  
      return {
        props: {
          project: { ...serializedProject, owner: serializedOwner },
        },
      };
    } catch (error) {
      console.error('Error fetching project:', error);
  
      return {
        notFound: true,
      };
    }
  };
  
  export default ProjectDetails;
import { useEffect, useState } from 'react';
import Layout from "../components/layout";
import Link from "next/link";
import Image from 'next/image'

interface Project {
    project_id: string;
    owner_id: mongoose.Types.ObjectId; // References Users
    description: string;
    category: string;
    price: number;
    location: string;
    tech_stack: string[];
    website: string;
    status: string;
    members: mongoose.Types.ObjectId[]; // Array of user IDs referencing Users
    payment_received: boolean;
  }



const ListProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
  
    useEffect(() => {
      // Fetch users when the component mounts
      const fetchProjects = async () => {
        try {
          const response = await fetch('/api/projects');
          const data = await response.json();
          setProjects(data.data); // Assuming data is structured as { success: true, data: users }
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
  
      fetchProjects();
    }, []);
  
  
    return (
      <Layout>
        <div className="search-bar">
  
        { (
          <>
            <h1>Users</h1>
            {projects.map((project) => (
              <div key={project.project_id}>
                <div className="card">
                  <div className="content">
                    <h5 className="user-name">{project.owner_id} {project.description}</h5>
                    <p className="role">Role: {project.category}</p>
                    <div className="btn-container">
                    <p className="role">Role: {project.price}</p>
                    <p className="role">Role: {project.location}</p>
                    <p className="role">Role: {project.tech_stack}</p>
                    <p className="role">Role: {project.members}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </Layout>
    );
  };
  
  export default ListProjects;
  
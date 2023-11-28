// pages/listprojects.tsx
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Link from 'next/link';
import AccessDenied from "@/components/access-denied"

interface Project {
  _id: string;
  description: string;
  category: string;
  price: number;
  location: string;
  tech_stack: string[];
  website: string;
  status: string;
}

const ListProjects = () => {
  const { data } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.data); // Assuming data is structured as { success: true, data: projects }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);
      // If no session exists, display access denied message
      if (!data) {
        return (
          <Layout>
            <AccessDenied />
          </Layout>
        )
      }


  return (
    <Layout>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <div className="card">
              <div className="content">
                <p className="project-description">{project.description}</p>
                <p className="project-category">Category: {project.category}</p>
                <p className="project-price">Price: {project.price}</p>
                <p className="project-location">Location: {project.location}</p>
                {/* Add more project details as needed */}
                <div className="btn-container">
                  <Link href={`/projects/${project._id}`}>
                    <button className="btn view">View Project</button>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ListProjects;

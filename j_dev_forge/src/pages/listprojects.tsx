// pages/listprojects.tsx
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Link from 'next/link';
import AccessDenied from "@/components/access-denied"
import Image from 'next/image';
import mongoose from 'mongoose';

interface Project {
  _id: string;
  owner_id: mongoose.Types.ObjectId;
  name:string;
  description: string;
  category: string;
  price: number;
  location: string;
  tech_stack: string[];
  website: string;
  status: string;
  // members: mongoose.Types.ObjectId[]; //This is implemented in teams branch
  payment_received: boolean;
}

const ListProjects = () => {
  const { data } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [ok, setOk] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchOption, setSearchOption] = useState<string>('name');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects'); // Adjust the API endpoint as per your project
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

      
  const filteredProjects = projects.filter(project => {
    const name = project.name;
    const location = project.location;
    switch (searchOption) {
      case 'name':
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      case 'location':
        return location.toLowerCase().includes(searchQuery.toLowerCase())
      default:
        return true;
    }
  });


  return (
    <Layout>
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search by ${searchOption === 'name' ? 'name' : 'location'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSearchOption(e.target.value)} value={searchOption}>
          <option value="name">Name</option>
          <option value="location">Location</option>
        </select>
      </div>
      <ul>
      <h1>Projects</h1>
          {filteredProjects.map((project) => (
          <li key={project._id}>
            <div className="card">
              <div className="content">
              <h5 className="project-name">{project.name}</h5>
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


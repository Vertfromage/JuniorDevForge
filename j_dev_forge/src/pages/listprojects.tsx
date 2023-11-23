
import { useEffect, useState } from 'react';
import Layout from "../components/layout";
import Image from 'next/image';
import mongoose from 'mongoose';
import Link from "next/link";

interface Project {
  project_id: string;
  owner_id: mongoose.Types.ObjectId;
  name:string;
  description: string;
  category: string;
  price: number;
  location: string;
  tech_stack: string[];
  website: string;
  status: string;
  members: mongoose.Types.ObjectId[];
  payment_received: boolean;
}

const ListProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchOption, setSearchOption] = useState<string>('name');

  useEffect(() => {
    // Fetch project when the component mounts
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

      {searchQuery !== '' && (
        <>
          <h1>Projects</h1>
          {filteredProjects.map((project) => (
            <div key={project.project_id}>
              <div className="card">
                <div className="content">
                <h5 className="project-name">{project.name}</h5>
                  <h5 className="project-description">{project.description}</h5>
                  <p className="category">Category: {project.category}</p>
                  <p className="price">Price: {project.price}</p>
                  <p className="location">Location: {project.location}</p>
                  {/* Display other project details as needed */}
                  <div className="btn-container">
                    {/* Add buttons or links as needed */}
                    <Link href={`projects/${project.project_id}`}>
                      <button className="btn view">View Project</button>
                    </Link></div>
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

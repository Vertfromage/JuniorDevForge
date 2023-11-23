import { useEffect, useState } from 'react';
import Layout from "../components/layout";
import Image from 'next/image';
import mongoose from 'mongoose';

interface Project {
  project_id: string;
  owner_id: mongoose.Types.ObjectId;
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
  const [searchOption, setSearchOption] = useState<string>('name'); // Assuming 'name' as the default search option

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    switch (searchOption) {
      case 'name':
        return project.description.toLowerCase().includes(searchQuery.toLowerCase());
      case 'location':
        return project.location.toLowerCase().includes(searchQuery.toLowerCase());
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
                  <h5 className="project-name">{project.description}</h5>
                  <p className="category">Category: {project.category}</p>
                  {/* Display other project details as needed */}
                  <div className="btn-container">
                    {/* Add buttons or links as needed */}
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

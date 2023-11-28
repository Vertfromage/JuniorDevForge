// pages/postproject.tsx
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Layout from '../components/layout';
import AccessDenied from '@/components/access-denied';

const PostProject = () => {
    const { data } = useSession();
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    location: '',
    tech_stack: '',
    website: '',
    status: 'Pending',
    payment_received: false,
  });

  if (!data) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formValidate = () => {
    let err = {};
    if (!projectData.name) err = { ...err, name: 'Project name is required' };
    if (!projectData.description) err = { ...err, description: 'Description is required' };
    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contentType = 'application/json'

    const errs = formValidate();
    if(errs) {
        setErrors(errs);
      }

      if (data) {
        try {
          const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
              },
            body: JSON.stringify(projectData),
          });

          // Throw error with status code in case Fetch API req failed
          if (!response.ok) {
            throw new Error(response.status.toString());
          }
          window.alert('Project successfully posted');
        } catch (error) {
          console.error('Error posting project:', error);
          window.alert('Failed to post project'+ error);
        }
      } else {
        console.error('Unauthorized access to post project');
      }

  };


  return (
    <Layout>
      <h1>Post a Project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input type="text" name="name" value={projectData.name} onChange={handleInputChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={projectData.description} onChange={handleInputChange} required />
        </label>

        <label>
          Category:
          <input type="text" name="category" value={projectData.category} onChange={handleInputChange} required />
        </label>

        <label>
          Price:
          <input type="number" name="price" value={projectData.price} onChange={handleInputChange} required />
        </label>

        <label>
          Location:
          <input type="text" name="location" value={projectData.location} onChange={handleInputChange} required />
        </label>

        <label>
          Tech Stack:
          <input type="text" name="tech_stack" value={projectData.tech_stack} onChange={handleInputChange} required />
        </label>

        <label>
          Website:
          <input type="text" name="website" value={projectData.website} onChange={handleInputChange} required />
        </label>

        <label>
          Status:
          <select name="status" value={projectData.status}>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
          </select>
        </label>


        <button type="submit" onSubmit={handleSubmit}>Submit Project</button>
      </form>
    </Layout>
  );
};

export default PostProject;

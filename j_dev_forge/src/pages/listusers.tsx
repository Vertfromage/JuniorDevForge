import { useEffect, useState } from 'react';
import Layout from "../components/layout";
import Link from "next/link";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName?: string;
  role: string;
  // Add other fields as needed
}

const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data.data); // Assuming data is structured as { success: true, data: users }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Layout>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user._id}>
          <div className="card">
            <div className="content">
              <h5 className="user-name">{user.firstName} {user.lastName}</h5>
              <p className="email">Email: {user.email}</p>
              <p className="role">Role: {user.role}</p>

              <div className="btn-container">
                <Link href={`users/${user._id}`}>
                  <button className="btn view">View Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default ListUsers;

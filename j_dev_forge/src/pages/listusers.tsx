import { useEffect, useState } from 'react';
import Layout from "../components/layout";
import Link from "next/link";
import Image from 'next/image'

interface User {
  _id: string;
  email: string;
  imageUrl: string;
  firstName: string;
  lastName?: string;
  role: string;
  city: string;
  province: string;
}
// ...

const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchOption, setSearchOption] = useState<string>('name');

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

  const filteredUsers = users.filter(user => {
    const fullName = user.firstName + ' ' + (user.lastName || '');
    const cityAndProvince = user.city+ ' ' + (user.province || '');
    switch (searchOption) {
      case 'name':
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      case 'location':
        return cityAndProvince.toLowerCase().includes(searchQuery.toLowerCase())
        ///user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // user.province.toLowerCase().includes(searchQuery.toLowerCase());
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
          <h1>Users</h1>
          {filteredUsers.map((user) => (
            <div key={user._id}>
              <div className="card">
                <div className="content">
                  <h5 className="user-name">{user.firstName} {user.lastName}</h5>
                  <p className="role">Role: {user.role}</p>
                  {user.imageUrl ? <Image
                    src={user?.imageUrl||""}
                    width={100}
                    height={100}
                    alt="Picture of the user"
                  /> : <></>}
                  <div className="btn-container">
                    <Link href={`./users/${user._id}`}>
                      <button className="btn view">View Profile</button>
                    </Link>
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

export default ListUsers;

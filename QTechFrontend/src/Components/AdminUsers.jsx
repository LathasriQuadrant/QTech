import axios from 'axios';
import { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5104/api/Qtech/Users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4 px-4">
      <h2 className="text-xl font-bold mb-4 text-violet-800 text-center">Users</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-1 border border-gray-300 rounded text-sm"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {filteredUsers.filter(x => x.role === "User").map((details, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow border border-gray-200 flex flex-col items-center text-center text-sm">
            <div className="w-10 h-10 bg-violet-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
              {details.firstName.charAt(0)}{details.lastName.charAt(0)}
            </div>
            <h3 className="text-base font-semibold mt-2">{details.firstName} {details.lastName}</h3>
            <p className="text-gray-600 mt-1 text-xs">{details.email}</p>
            <p className="text-gray-500 mt-1 text-xs">Role: {details.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;

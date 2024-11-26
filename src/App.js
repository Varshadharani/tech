import React, { useState } from 'react';
import './App.css';

const App = () => {
  const initialUsers = [
    { id: '1', name: 'John', username: 'Doe', email: 'john.doe@example.com', website: 'IT' },
    { id: '2', name: 'Jane', username: 'Smith', email: 'jane.smith@example.com', website: 'HR' },
    { id: '3', name: 'Alice', username: 'Johnson', email: 'alice.johnson@example.com', website: 'Marketing' },
    { id: '4', name: 'Bob', username: 'Brown', email: 'bob.brown@example.com', website: 'Sales' },
    { id: '5', name: 'Charlie', username: 'Davis', email: 'charlie.davis@example.com', website: 'Finance' },
    { id: '6', name: 'Diana', username: 'Miller', email: 'diana.miller@example.com', website: 'Operations' },
    { id: '7', name: 'Edward', username: 'Wilson', email: 'edward.wilson@example.com', website: 'IT' },
    { id: '8', name: 'Fiona', username: 'Taylor', email: 'fiona.taylor@example.com', website: 'HR' },
    { id: '9', name: 'George', username: 'Anderson', email: 'george.anderson@example.com', website: 'Marketing' },
    { id: '10', name: 'Hannah', username: 'Thomas', email: 'hannah.thomas@example.com', website: 'Sales' },
    { id: '11', name: 'Isabella', username: 'Lee', email: 'isabella.lee@example.com', website: 'IT' },
    { id: '12', name: 'Jack', username: 'Moore', email: 'jack.moore@example.com', website: 'HR' },
    { id: '13', name: 'Lily', username: 'Adams', email: 'lily.adams@example.com', website: 'Finance' },
    { id: '14', name: 'Mia', username: 'King', email: 'mia.king@example.com', website: 'Marketing' },
    { id: '15', name: 'Noah', username: 'Scott', email: 'noah.scott@example.com', website: 'Sales' }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [userForm, setUserForm] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    website: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate the index of the first and last user on the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Total pages calculation
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setUsers(users.map(user => user.id === userForm.id ? userForm : user));
      setEditing(false);
    } else {
      setUsers([...users, userForm]);
    }
    setUserForm({ id: '', name: '', username: '', email: '', website: '' });
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setUserForm(userToEdit);
    setEditing(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={userForm.id}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={userForm.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Last Name"
          value={userForm.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userForm.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="website"
          placeholder="Department"
          value={userForm.website}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editing ? 'Update User' : 'Add User'}</button>
      </form>

      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

// src/UserForm.js
import React, { useState, useEffect } from 'react';

const UserForm = ({ userId, onFormSubmit, existingUsers }) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    website: '',
  });

  useEffect(() => {
    if (userId) {
      const selectedUser = existingUsers.find(u => u.id === userId);
      setUser(selectedUser || {});
    }
  }, [userId, existingUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.id || isNaN(user.id)) {
      alert('Please enter a valid ID');
      return;
    }

    const existingUser = existingUsers.find(u => u.id === parseInt(user.id));
    if (existingUser) {
      alert('ID already exists, please choose another ID');
      return;
    }

    onFormSubmit(user);
    setUser({
      id: '',
      name: '',
      username: '',
      email: '',
      website: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={user.id}
        onChange={(e) => setUser({ ...user, id: e.target.value })}
        placeholder="ID"
        required
      />
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={user.website}
        onChange={(e) => setUser({ ...user, website: e.target.value })}
        placeholder="Department"
        required
      />
      <button type="submit">{userId ? 'Update User' : 'Add User'}</button>
    </form>
  );
};

export default UserForm;

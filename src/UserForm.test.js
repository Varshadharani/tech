import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserForm from './UserForm';

const mockOnFormSubmit = jest.fn();
const mockExistingUsers = [
  { id: 1, name: 'John', username: 'Doe', email: 'john.doe@example.com', website: 'IT' },
  { id: 2, name: 'Jane', username: 'Smith', email: 'jane.smith@example.com', website: 'HR' },
];

describe('UserForm', () => {
  it('renders the form with empty fields when no userId is provided', () => {
    render(<UserForm userId={null} onFormSubmit={mockOnFormSubmit} existingUsers={mockExistingUsers} />);

    expect(screen.getByPlaceholderText('ID (Manually Enter)')).toHaveValue('');
    expect(screen.getByPlaceholderText('First Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Last Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Department')).toHaveValue('');
  });

  it('renders the form with user data when userId is provided', () => {
    render(<UserForm userId={1} onFormSubmit={mockOnFormSubmit} existingUsers={mockExistingUsers} />);

    expect(screen.getByPlaceholderText('ID (Manually Enter)')).toHaveValue('1');
    expect(screen.getByPlaceholderText('First Name')).toHaveValue('John');
    expect(screen.getByPlaceholderText('Last Name')).toHaveValue('Doe');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('john.doe@example.com');
    expect(screen.getByPlaceholderText('Department')).toHaveValue('IT');
  });

  it('calls onFormSubmit with correct data when form is submitted', () => {
    render(<UserForm userId={null} onFormSubmit={mockOnFormSubmit} existingUsers={mockExistingUsers} />);

    fireEvent.change(screen.getByPlaceholderText('ID (Manually Enter)'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Johnson' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'alice.johnson@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Department'), { target: { value: 'Finance' } });

    fireEvent.click(screen.getByText('Add User'));

    expect(mockOnFormSubmit).toHaveBeenCalledWith({
      id: '3',
      name: 'Alice',
      username: 'Johnson',
      email: 'alice.johnson@example.com',
      website: 'Finance',
    }, 'add');
  });

  it('validates ID field before submitting the form', () => {
    render(<UserForm userId={null} onFormSubmit={mockOnFormSubmit} existingUsers={mockExistingUsers} />);

    fireEvent.change(screen.getByPlaceholderText('ID (Manually Enter)'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Johnson' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'alice.johnson@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Department'), { target: { value: 'Finance' } });

    fireEvent.click(screen.getByText('Add User'));

    expect(screen.getByText('Please enter a valid ID')).toBeInTheDocument();
    expect(mockOnFormSubmit).not.toHaveBeenCalled();
  });

  it('prevents submission if ID already exists', () => {
    render(<UserForm userId={null} onFormSubmit={mockOnFormSubmit} existingUsers={mockExistingUsers} />);

    fireEvent.change(screen.getByPlaceholderText('ID (Manually Enter)'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Johnson' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'alice.johnson@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Department'), { target: { value: 'Finance' } });

    fireEvent.click(screen.getByText('Add User'));

    expect(screen.getByText('ID already exists, please choose another ID')).toBeInTheDocument();
    expect(mockOnFormSubmit).not.toHaveBeenCalled();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App', () => {
  it('renders the initial list of users', () => {
    render(<App />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();

    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('HR')).toBeInTheDocument();
  });

  it('adds a new user when the form is submitted', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('ID (Manually Enter)'), { target: { value: '11' } });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Martin' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'bob.martin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Department'), { target: { value: 'Engineering' } });

    fireEvent.click(screen.getByText('Add User'));

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Martin')).toBeInTheDocument();
    expect(screen.getByText('bob.martin@example.com')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('edits an existing user when the form is submitted', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Edit', { selector: 'button' }));

    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Johnathan' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Department'), { target: { value: 'IT' } });

    fireEvent.click(screen.getByText('Update User'));

    expect(screen.getByText('Johnathan')).toBeInTheDocument();
  });

  it('deletes a user when the delete button is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Delete', { selector: 'button' }));

    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('Doe')).not.toBeInTheDocument();
  });
});

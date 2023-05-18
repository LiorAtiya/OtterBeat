import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '../components/Error';

it('renders component correctly', () => {
    render(<Error />);
    const element = screen.getByText(/Something went wrong. Please try again./i);
    expect(element).toBeInTheDocument();
});
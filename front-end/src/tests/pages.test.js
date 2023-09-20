/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Error from '../pages/Error'
// import ArtistsList from '../pages/ArtistsList';
// import Routes from '../api/routes';

it('Test Error Page', () => {
    render(<Error />);

    const headingElements = screen.getAllByRole('heading', { level: 1 });
    expect(headingElements).toHaveLength(2);

    expect(headingElements[0]).toHaveTextContent('Page Not Found');
    expect(headingElements[1]).toHaveTextContent('404');
});

// it('Test ArtistsList Page', () => {
//     render(<ArtistsList />);

//     // Test for the presence of the Searchbar
//     expect(screen.getByRole('textbox', { name: /artist/i })).toBeInTheDocument();

//     // Test for the presence of the "Artists" heading
//     expect(screen.getByText(/artists/i)).toBeInTheDocument();

//     // Test that the loading state is rendered initially
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
// });

// it('renders filtered artist cards after data loading', async () => {
//     const mockData = [
//         { id: 1, name: 'Artist 1' },
//         { id: 2, name: 'Artist 2' },
//         { id: 3, name: 'Artist 3' },
//     ];

//     jest.spyOn(Routes, 'getAllArtists').mockResolvedValueOnce({ data: mockData });

//     render(<ArtistsList />);

//     // Wait for the data to load
//     await waitFor(() => {
//         expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
//     });

//     // Test for the presence of filtered artist cards
//     expect(screen.getByText(/artist 1/i)).toBeInTheDocument();
//     expect(screen.getByText(/artist 2/i)).toBeInTheDocument();
//     expect(screen.getByText(/artist 3/i)).toBeInTheDocument();
// });
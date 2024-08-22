import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VirtualizedList from './VirtualizedList';
import { DataProvider } from './DataContext';

test('renders VirtualizedList and loads initial items', async () => {
    render(
        <DataProvider>
            <VirtualizedList />
        </DataProvider>
    );

    // Check if initial items are loaded
    await waitFor(() => {
        expect(screen.getByText(/No First Name No Last Name/i)).toBeInTheDocument();
    });
});

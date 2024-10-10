import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { act } from 'react';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test('renders custom data table', async () => {
  const queryClient = createTestQueryClient();

  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  });

  const linkElement = screen.getByText(/Custom Data Table/i);
  expect(linkElement).toBeInTheDocument();
});

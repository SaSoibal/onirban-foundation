import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Home from '../../pages/public/Home';

const renderWithProviders = (ui) => render(<BrowserRouter><AuthProvider>{ui}</AuthProvider></BrowserRouter>);

jest.mock('../../services/api', () => ({
  get: jest.fn(),
}));

import api from '../../services/api';

describe('Home', () => {
  test('renders hero heading', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/programs')) return Promise.resolve({ data: { data: [] } });
      if (url.includes('/settings')) return Promise.resolve({ data: { data: [] } });
      return Promise.resolve({ data: { data: [] } });
    });

    renderWithProviders(<Home />);
    expect(screen.getByText(/Save Lives Through Blood Donation/i)).toBeDefined();
  });

  test('displays stats', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/programs')) return Promise.resolve({ data: { data: [] } });
      if (url.includes('/settings')) return Promise.resolve({ data: { data: [{ key: 'total_donors', value: '10' }, { key: 'active_blood_requests', value: '2' }] } });
      return Promise.resolve({ data: { data: [] } });
    });

    renderWithProviders(<Home />);
    await waitFor(() => expect(screen.getByText('10')).toBeDefined());
  });
});

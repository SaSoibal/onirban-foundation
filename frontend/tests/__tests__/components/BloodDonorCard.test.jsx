import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import DonorCard from '../../components/public/DonorCard';

const renderWithProviders = (ui) => render(<BrowserRouter><AuthProvider>{ui}</AuthProvider></BrowserRouter>);

describe('DonorCard', () => {
  const donor = {
    id: 1,
    name: 'John Doe',
    blood_group: 'O+',
    district: 'Dhaka',
    photo: 'https://example.com/photo.jpg',
  };

  test('renders donor name', () => {
    renderWithProviders(<DonorCard donor={donor} />);
    expect(screen.getByText('John Doe')).toBeDefined();
  });

  test('renders blood group', () => {
    renderWithProviders(<DonorCard donor={donor} />);
    expect(screen.getByText('O+')).toBeDefined();
  });

  test('renders district', () => {
    renderWithProviders(<DonorCard donor={donor} />);
    expect(screen.getByText('Dhaka')).toBeDefined();
  });
});

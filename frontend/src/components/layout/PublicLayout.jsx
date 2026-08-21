import { Outlet } from 'react-router-dom';
import PublicHeader from './Header';
import PublicFooter from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}

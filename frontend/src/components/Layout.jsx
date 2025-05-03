import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="p-4" style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

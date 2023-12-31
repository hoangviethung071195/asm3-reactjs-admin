import Layout from '../../layout/Layout';
import { AuthContextProvider } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
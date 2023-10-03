import Layout from '../../layout/layout';
import { AuthContextProvider } from '../../context/authContext';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
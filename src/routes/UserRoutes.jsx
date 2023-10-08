import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UserPages';
import { Navbar } from '../components/layout/Navbar';
import { RegisterPage } from '../pages/RegisterPage';
import { useAuth } from '../auth/hooks/useAuth';

export const UserRoutes = () => {
  const { login } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="users" element={<UsersPages />} />
        {!login.isAdmin || (
          <>
            <Route path="users/register" element={<RegisterPage />} />
            <Route path="users/edit/:id" element={<RegisterPage />} />
          </>
        )}
        <Route path="/" element={<Navigate to="/users" />} />
      </Routes>
    </>
  );
};

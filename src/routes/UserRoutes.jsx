import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UserPages';
import { Navbar } from '../components/layout/Navbar';
import { PropTypes } from 'prop-types';
import { RegisterPage } from '../pages/RegisterPage';
import { UserProvider } from '../context/UserProvider';

export const UserRoutes = ({ login, handlerLogout }) => {
  return (
    <>
      <UserProvider>
        <Navbar handlerLogout={handlerLogout} login={login} />
        <Routes>
          <Route path="users" element={<UsersPages />} />
          <Route path="users/register" element={<RegisterPage />} />
          <Route path="users/edit/:id" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </UserProvider>
    </>
  );
};

UserRoutes.propTypes = {
  login: PropTypes.object.isRequired,
  handlerLogout: PropTypes.func.isRequired,
};

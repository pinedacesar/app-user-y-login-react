import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UserPages';
import { Navbar } from '../components/layout/Navbar';
import { PropTypes } from 'prop-types';

export const UserRoutes = ({ login, handlerLogout }) => {
  return (
    <>
      <Navbar handlerLogout={handlerLogout} login={login} />
      <Routes>
        <Route path="users" element={<UsersPages />} />
        <Route path="/" element={<Navigate to="/users" />} />
      </Routes>
    </>
  );
};

UserRoutes.propTypes = {
  login: PropTypes.object,
  handlerLogout: PropTypes.finc,
};

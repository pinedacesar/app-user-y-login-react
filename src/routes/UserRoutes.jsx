import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPages } from '../pages/UserPages';
import { Navbar } from '../components/layout/Navbar';
import { PropTypes } from 'prop-types';
import { RegisterPage } from '../pages/RegisterPage';
import { useUsers } from '../hooks/useUsers';

export const UserRoutes = ({ login, handlerLogout }) => {
  const {
    users,
    userSelected,
    initialUsersForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
  } = useUsers();

  return (
    <>
      <Navbar handlerLogout={handlerLogout} login={login} />
      <Routes>
        <Route
          path="users"
          element={
            <UsersPages
              users={users}
              userSelected={userSelected}
              initialUsersForm={initialUsersForm}
              visibleForm={visibleForm}
              handlerAddUser={handlerAddUser}
              handlerRemoveUser={handlerRemoveUser}
              handlerUserSelectedForm={handlerUserSelectedForm}
              handlerOpenForm={handlerOpenForm}
              handlerCloseForm={handlerCloseForm}
            />
          }
        />
        <Route
          path="users/register"
          element={
            <RegisterPage
              handlerAddUser={handlerAddUser}
              initialUsersForm={initialUsersForm}
            />
          }
        />
        <Route
          path="users/edit/:id"
          element={
            <RegisterPage
              users={users}
              handlerAddUser={handlerAddUser}
              initialUsersForm={initialUsersForm}
            />
          }
        />
        <Route path="/" element={<Navigate to="/users" />} />
      </Routes>
    </>
  );
};

UserRoutes.propTypes = {
  login: PropTypes.object.isRequired,
  handlerLogout: PropTypes.func.isRequired,
};

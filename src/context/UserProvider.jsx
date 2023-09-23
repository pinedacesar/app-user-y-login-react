import { PropTypes } from 'prop-types';
import { useUsers } from '../hooks/useUsers';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
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
    getUser,
  } = useUsers();

  return (
    <UserContext.Provider
      value={{
        users,
        userSelected,
        initialUsersForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.array.isRequired,
};

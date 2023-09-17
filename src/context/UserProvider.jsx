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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

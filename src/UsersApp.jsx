import { UserForm } from './components/UserForm';
import { UsersList } from './components/UsersList';
import { useUsers } from './hooks/useUsers';

export const UsersApp = () => {
  const {
    users,
    userSelected,
    initialUsersForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
  } = useUsers();

  return (
    <div className="container my-4">
      <h1>Users App</h1>
      <div className="row">
        <div className="col">
          <UserForm
            handlerAddUser={handlerAddUser}
            initialUsersForm={initialUsersForm}
            userSelected={userSelected}
          />
        </div>
        <div className="col">
          {users.length === 0 ? (
            <div className="alert alert-warning">
              No hay usuarios en el sistema
            </div>
          ) : (
            <UsersList
              users={users}
              handlerRemoveUser={handlerRemoveUser}
              handlerUserSelectedForm={handlerUserSelectedForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import { UserModalForm } from './components/UserModalForm';
import { UsersList } from './components/UsersList';
import { useUsers } from './hooks/useUsers';

export const UsersApp = () => {
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
      {!visibleForm || (
        <UserModalForm
          handlerAddUser={handlerAddUser}
          initialUsersForm={initialUsersForm}
          userSelected={userSelected}
          handlerCloseForm={handlerCloseForm}
        />
      )}
      <div className="container my-4">
        <h1>Users App</h1>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary my-2" onClick={handlerOpenForm}>
              Nuevo Usuario
            </button>

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
      </div>{' '}
    </>
  );
};

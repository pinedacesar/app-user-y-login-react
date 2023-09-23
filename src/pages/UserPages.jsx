import { UserModalForm } from '../components/UserModalForm';
import { UsersList } from '../components/UsersList';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';

export const UsersPages = () => {
  const { users, visibleForm, handlerOpenForm, getUser } =
    useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {!visibleForm || <UserModalForm />}
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
              <UsersList />
            )}
          </div>
        </div>
      </div>{' '}
    </>
  );
};

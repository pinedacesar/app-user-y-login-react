import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { UserForm } from '../components/UserForm';
import { useParams } from 'react-router-dom';

export const RegisterPage = ({
  users = [],
  handlerAddUser,
  initialUsersForm,
}) => {
  const [userSelected, setUserSelected] = useState(initialUsersForm);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const user = users.find((u) => u.id == id) || initialUsersForm;
      setUserSelected(user);
    }
  }, [id]);

  return (
    <div className="container my-4">
      <h4>{userSelected.id > 0 ? 'Editar' : 'Registrar'} Usuario</h4>
      <div className="row">
        <div className="col">
          <UserForm
            userSelected={userSelected}
            handlerAddUser={handlerAddUser}
            initialUsersForm={initialUsersForm}
          />
        </div>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  handlerAddUser: PropTypes.func.isRequired,
  initialUsersForm: PropTypes.object.isRequired,
  users: PropTypes.array,
};
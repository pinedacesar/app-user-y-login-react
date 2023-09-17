import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const UserForm = ({
  handlerAddUser,
  initialUsersForm,
  userSelected,
  handlerCloseForm,
}) => {
  const [userForm, setUserForm] = useState(initialUsersForm);

  const { id, username, password, email } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: '',
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || (!password && id === 0) || !email) {
      Swal.fire(
        'Error de validación',
        'Debe completar los campos del formulario!',
        'error'
      );
      return;
    }

    // Guardar el userForm en el estado de usuario
    handlerAddUser(userForm);
    setUserForm(initialUsersForm);
  };

  const onCloseForm = () => {
    handlerCloseForm(), setUserForm(initialUsersForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      {id > 0 || (
        <input
          className="form-control my-3 w-75"
          placeholder="password"
          name="password"
          type="password"
          value={password}
          onChange={onInputChange}
        />
      )}

      <input
        className="form-control my-3 w-75"
        placeholder="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input type="hidden" name="id" value={id} />
      <button className="btn btn-primary" type="submit">
        {id > 0 ? 'editar' : 'crear'}
      </button>
      <button
        className="btn btn-primary mx-2"
        type="button"
        onClick={onCloseForm}
      >
        Cerrar
      </button>
    </form>
  );
};

UserForm.propTypes = {
  handlerAddUser: PropTypes.func,
  initialUsersForm: PropTypes.object,
  userSelected: PropTypes.object,
  handlerCloseForm: PropTypes.func,
};

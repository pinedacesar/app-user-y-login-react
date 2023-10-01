import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';

export const UserForm = ({ userSelected, handlerCloseForm }) => {
  const { handlerAddUser, initialUsersForm, errors } = useContext(UserContext);

  const [userForm, setUserForm] = useState(initialUsersForm);
  const [checked, setChecked] = useState(userForm.admin);

  const { id, username, password, email, admin } = userForm;

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

  const onCheckboxChange = () => {
    setChecked(!checked);
    setUserForm({
      ...userForm,
      admin: checked,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // lo comentamos porque se validad desde el Backend
    // if (!username || (!password && id === 0) || !email) {
    //   Swal.fire(
    //     'Error de validación',
    //     'Debe completar los campos del formulario!',
    //     'error'
    //   );
    //   return;
    // }

    // if (!(email.includes('@') && email.includes('.'))) {
    //   Swal.fire(
    //     'Error de validación email',
    //     'El email debe ser valido, incluir un @ y un .xx!',
    //     'error'
    //   );
    //   return;
    // }

    // Guardar el userForm en el estado de usuario
    handlerAddUser(userForm);
    // setUserForm(initialUsersForm); // se elimina para poder mantener el estado
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
      <p className="text-danger">{errors?.username}</p>
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
      <p className="text-danger">{errors?.password}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.email}</p>

      <div className="my-3 form-check">
        <input
          type="checkbox"
          name="admin"
          checked={admin}
          className="form-check-input"
          onChange={onCheckboxChange}
        />
        <label className="form-check-label">Admin</label>
      </div>

      <input type="hidden" name="id" value={id} />
      <button className="btn btn-primary" type="submit">
        {id > 0 ? 'editar' : 'crear'}
      </button>
      {!handlerCloseForm || (
        <button
          className="btn btn-primary mx-2"
          type="button"
          onClick={onCloseForm}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};

UserForm.propTypes = {
  userSelected: PropTypes.object.isRequired,
  handlerCloseForm: PropTypes.func,
};

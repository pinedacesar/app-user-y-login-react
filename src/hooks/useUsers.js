import { useReducer, useState } from 'react';
import { usersReducer } from '../reducer/usersReducer';
import Swal from 'sweetalert2';

const initialUsers = [
  {
    id: 1,
    username: 'pepe',
    password: '12345',
    email: 'pepe@correo.com',
  },
];

const initialUsersForm = {
  id: 0,
  username: '',
  password: '',
  email: '',
};
export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUsersForm);
  const [visibleForm, setVisibleForm] = useState(false);

  const handlerAddUser = (user) => {
    console.log(user);
    dispatch({
      type: user.id === 0 ? 'addUser' : 'updateUser',
      payload: user,
    });
    Swal.fire(
      user.id === 0 ? 'Usuario Creado!' : 'Usuario Actualizado',
      user.id === 0
        ? 'El usuarios ha sido creado!'
        : 'El usuarios ha sido actualizado!',
      'success'
    );
    handlerCloseForm();
  };

  const handlerRemoveUser = (id) => {
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: 'Cuidado el usuario sera eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'removeUser',
          payload: id,
        });
        Swal.fire(
          'Usuario Eliminado!',
          'El usuarios ha sido Eliminado con exito!',
          'success'
        );
      }
    });
  };

  const handlerUserSelectedForm = (user) => {
    // console.log(user);
    setVisibleForm(true);
    setUserSelected({ ...user });
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUsersForm);
  };

  return {
    users,
    userSelected,
    initialUsersForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
  };
};

import { useReducer, useState } from 'react';
import { usersReducer } from '../reducer/usersReducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { findAll, remuve, save, update } from '../services/userService';

const initialUsers = [];

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
  const navigate = useNavigate();

  const getUser = async () => {
    const result = await findAll();
    dispatch({
      type: 'loadingUser',
      payload: result.data,
    });
  };

  const handlerAddUser = async (user) => {
    let response;
    if (user.id === 0) {
      response = await save(user);
    } else {
      response = await update(user);
    }

    dispatch({
      type: user.id === 0 ? 'addUser' : 'updateUser',
      payload: response.data,
    });
    Swal.fire(
      user.id === 0 ? 'Usuario Creado!' : 'Usuario Actualizado',
      user.id === 0
        ? 'El usuarios ha sido creado!'
        : 'El usuarios ha sido actualizado!',
      'success'
    );
    handlerCloseForm();
    navigate('/users');
  };

  const handlerRemoveUser = (id) => {
    // console.log(id);
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
        remuve(id);
        console.log(id);
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
    getUser,
  };
};

import { useContext, useReducer, useState } from 'react';
import { usersReducer } from '../reducer/usersReducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { findAll, remuve, save, update } from '../services/userService';
import { AuthContext } from '../auth/context/AuthContext';

const initialUsers = [];

const initialUsersForm = {
  id: 0,
  username: '',
  password: '',
  email: '',
};

const initialErrors = {
  username: '',
  password: '',
  email: '',
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUsersForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const { login, handlerLogout } = useContext(AuthContext);

  const [errors, setErrors] = useState(initialErrors);
  const navigate = useNavigate();

  const getUser = async () => {
    const result = await findAll();
    dispatch({
      type: 'loadingUser',
      payload: result.data,
    });
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) return;

    let response;
    try {
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
    } catch (error) {
      if (error.response && error.response.status == 400) {
        setErrors(error.response.data);
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes('constraint')
      ) {
        if (error.response.data?.message?.includes('UK_username')) {
          setErrors({ username: 'El username ya existe' });
        }
        if (error.response.data?.message?.includes('UK_email')) {
          setErrors({ email: 'El email ya existe' });
        }
      } else if (error.response?.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerRemoveUser = (id) => {
    if (!login.isAdmin) return;
    // console.log(id);
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: 'Cuidado el usuario sera eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remuve(id);
          // console.log(id);
          dispatch({
            type: 'removeUser',
            payload: id,
          });
          Swal.fire(
            'Usuario Eliminado!',
            'El usuarios ha sido Eliminado con exito!',
            'success'
          );
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
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
    setErrors({});
  };

  return {
    users,
    userSelected,
    initialUsersForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUser,
  };
};

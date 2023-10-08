import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { findAll, remuve, save, update } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUser,
  removeUser,
  updateUser,
  loadingUser,
  onUserSelectedForm,
  initialUsersForm,
  loadingError,
  onOpenForm,
  onCloseForm,
} from '../store/slices/users/usersSlice';
import { useAuth } from '../auth/hooks/useAuth';

export const useUsers = () => {
  const { users, userSelected, visibleForm, errors } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const { login, handlerLogout } = useAuth();

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const result = await findAll();
      dispatch(loadingUser(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) return;

    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
        dispatch(addUser(response.data));
      } else {
        response = await update(user);
        dispatch(updateUser(response.data));
      }

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
        dispatch(loadingError(error.response.data));
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes('constraint')
      ) {
        if (error.response.data?.message?.includes('UK_username')) {
          dispatch(loadingError({ username: 'El username ya existe' }));
        }
        if (error.response.data?.message?.includes('UK_email')) {
          dispatch(loadingError({ email: 'El email ya existe' }));
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
          dispatch(removeUser(id));

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
    dispatch(onUserSelectedForm({ ...user }));
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
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

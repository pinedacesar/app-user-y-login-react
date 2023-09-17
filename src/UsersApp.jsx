import { useReducer } from 'react';
import { LoginPage } from './auth/pages/LoginPage';
import { UsersPages } from './pages/UserPages';
import { loginReducer } from './auth/reducers/loginReducer';
import Swal from 'sweetalert2';

const initialLogin = {
  isAuth: false,
  user: undefined,
};

export const UsersApp = () => {
  const [login, dispach] = useReducer(loginReducer, initialLogin);

  const handlerLogin = ({ username, password }) => {
    if (username === 'admin' && password === '12345') {
      const user = { username: 'admin' };
      dispach({
        type: 'login',
        payload: user,
      });
      console.log('logueado');
    } else {
      Swal.fire('Error Login', 'Username y password invalidos', 'error');
    }
  };

  return (
    <>
      {login.isAuth ? (
        <UsersPages />
      ) : (
        <LoginPage handlerLogin={handlerLogin} />
      )}
    </>
  );
};

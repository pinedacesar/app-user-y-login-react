import usersApi from '../apis/usersApi';

const BASE_URL = '';

// se creo la carpeta apis para hacer interceptor y se elimina de tercer parametro el config()
// const config = () => {
//   return {
//     headers: {
//       Authorization: sessionStorage.getItem('token'),
//       'Content-Type': 'application/json',
//     },
//   };
// };

export const findAll = async () => {
  try {
    const response = await usersApi.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const save = async ({ username, email, password, admin }) => {
  try {
    return await usersApi.post(BASE_URL, {
      username,
      email,
      password,
      admin,
    });
  } catch (error) {
    throw error;
  }
};

export const update = async ({ id, username, email, admin }) => {
  try {
    return await usersApi.put(`${BASE_URL}/${id}`, {
      username,
      email,
      admin,
      // password: 'nothing', // si lo dejamos activo en el backend no lo corrige solo evita que en el front nos de el error
    });
  } catch (error) {
    throw error;
  }
};

export const remuve = async (id) => {
  try {
    // console.log('remove: ' + id);
    return await usersApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

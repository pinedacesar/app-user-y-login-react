export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'addUser':
      return [
        ...state,
        {
          ...action.payload,
          // id: new Date().getTime(), // ya lo maneja la base de datos
        },
      ];

    case 'removeUser':
      return state.filter((user) => user.id !== action.payload);

    case 'updateUser':
      return state.map((u) => {
        if (u.id === action.payload.id) {
          return {
            ...action.payload,
            password: u.password,
          };
        }
        return u;
      });

    case 'loadingUser':
      return action.payload;

    default:
      return state;
  }
};

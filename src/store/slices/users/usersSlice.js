import { createSlice } from '@reduxjs/toolkit';

export const initialUsersForm = {
  id: 0,
  username: '',
  password: '',
  email: '',
  admin: false,
};

const initialErrors = {
  username: '',
  password: '',
  email: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userSelected: initialUsersForm,
    visibleForm: false,
    errors: initialErrors,
  },
  reducers: {
    addUser: (state, action) => {
      state.users = [
        ...state.users,
        {
          ...action.payload,
        },
      ];
      state.userSelected = initialUsersForm;
      state.visibleForm = false;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      state.users = state.users.map((u) => {
        if (u.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return u;
      });
      state.userSelected = initialUsersForm;
      state.visibleForm = false;
    },
    loadingUser: (state, { payload }) => {
      state.users = payload;
    },
    onUserSelectedForm: (state, { payload }) => {
      state.userSelected = payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.userSelected = initialUsersForm;
    },
    loadingError: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  updateUser,
  loadingUser,
  onUserSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = usersSlice.actions;

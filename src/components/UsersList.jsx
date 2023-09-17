import { PropTypes } from 'prop-types';
import { UserRow } from './UserRow';

export const UsersList = ({
  users,
  handlerRemoveUser,
  handlerUserSelectedForm,
}) => {
  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>usename</th>
          <th>email</th>
          <th>update</th>
          <th>update route</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, username, email }) => (
          <UserRow
            key={id}
            id={id}
            username={username}
            email={email}
            handlerUserSelectedForm={handlerUserSelectedForm}
            handlerRemoveUser={handlerRemoveUser}
          />
        ))}
      </tbody>
    </table>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  handlerRemoveUser: PropTypes.func,
  handlerUserSelectedForm: PropTypes.func,
};

import { UserRow } from './UserRow';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const UsersList = () => {
  const { users } = useContext(UserContext);

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
          <UserRow key={id} id={id} username={username} email={email} />
        ))}
      </tbody>
    </table>
  );
};

import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const UserRow = ({ id, username, email }) => {
  const { handlerRemoveUser, handlerUserSelectedForm } =
    useContext(UserContext);

  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() =>
            handlerUserSelectedForm({
              id: id,
              username: username,
              email: email,
            })
          }
        >
          update
        </button>
      </td>
      <td>
        <NavLink className="btn btn-secondary btn-sm" to={'/users/edit/' + id}>
          update route
        </NavLink>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => handlerRemoveUser(id)}
        >
          remove
        </button>
      </td>
    </tr>
  );
};
UserRow.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

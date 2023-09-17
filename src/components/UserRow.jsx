import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

export const UserRow = ({
  id,
  username,
  email,
  handlerRemoveUser,
  handlerUserSelectedForm,
}) => {
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
          eliminar
        </button>
      </td>
    </tr>
  );
};
UserRow.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handlerRemoveUser: PropTypes.func.isRequired,
  handlerUserSelectedForm: PropTypes.func.isRequired,
};

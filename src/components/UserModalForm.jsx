import { PropTypes } from 'prop-types';
import { UserForm } from './UserForm';

export const UserModalForm = ({
  handlerAddUser,
  initialUsersForm,
  userSelected,
  handlerCloseForm,
}) => {
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {userSelected.id > 0 ? 'Editar' : 'Crear'} Modal Usuarios
              </h5>
            </div>
            <div className="modal-body">
              <UserForm
                handlerAddUser={handlerAddUser}
                initialUsersForm={initialUsersForm}
                userSelected={userSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserModalForm.propTypes = {
  handlerAddUser: PropTypes.func,
  initialUsersForm: PropTypes.object,
  userSelected: PropTypes.object,
  handlerCloseForm: PropTypes.func,
};

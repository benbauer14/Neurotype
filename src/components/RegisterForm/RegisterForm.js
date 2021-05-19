import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'

function RegisterForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const errors = useSelector( (store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        email: email,
        name: name,
        password: password,
        role: role.value,
        group_id: 1
      },
    });
  }; // end registerUser

  const roleOptions = [
    { label: 'Senior Researcher', value: 'Senior Researcher'},
    { label: 'Lead Researcher', value: 'Lead Researcher'},
    { label: 'Researcher', value: 'Researcher' },
  ];

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register New Researcher</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Email (Username):
          <input
            type="text"
            name="username"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="role">
          Role:
          <Select
              options={roleOptions}
              value={role}
              onChange={setRole}
              labelledBy="Add-Role"
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );

}

export default RegisterForm;

// class RegisterForm extends Component {
//   state = {
//     username: '',
//     password: '',
//   };
//
//   render() {
//     return (
//       <form className="formPanel" onSubmit={this.registerUser}>
//         <h2>Register User</h2>
//         {this.props.store.errors.registrationMessage && (
//           <h3 className="alert" role="alert">
//             {this.props.store.errors.registrationMessage}
//           </h3>
//         )}
//         <div>
//           <label htmlFor="username">
//             Username:
//             <input
//               type="text"
//               name="username"
//               value={this.state.username}
//               required
//               onChange={this.handleInputChangeFor('username')}
//             />
//           </label>
//         </div>
//         <div>
//           <label htmlFor="password">
//             Password:
//             <input
//               type="password"
//               name="password"
//               value={this.state.password}
//               required
//               onChange={this.handleInputChangeFor('password')}
//             />
//           </label>
//         </div>
//         <div>
//           <input className="btn" type="submit" name="submit" value="Register" />
//         </div>
//       </form>
//     );
//   }
// }

// export default connect(mapStoreToProps)(RegisterForm);

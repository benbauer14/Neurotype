import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';

function UserPage () {
  // this component doesn't do much to start, just renders some user info to the DOM
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <LogOutButton className="log-in" />
      </div>
    );
}

export default UserPage

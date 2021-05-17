import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';

import QQDemographs from '../QQDemographs/QQDemographs';
import CreateUser from '../CreateUser/CreateUser';
import Home from '../Home/Home';
import CheckInPage from '../CheckInPage/CheckInPage';
import AddPatient from '../AddPatient/AddPatient';
import SelectParticipant from '../SelectParticipant/SelectParticipant';
import Dashboard from '../Dashboard/Dashboard';
import LoginPage from '../LoginPage/LoginPage';
import PINentry from '../PINentry/PINentry';
import survey from '../../neuromarkr-demo-survey/src/components/surveyDisplays/surveyone'
// import experiment from '../../neuromarkr-demo-pictureviewing/src/pages/Login'

import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/survey"
              component={survey}
            />
            {/* <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/experiment"
              component={experiment}
            /> */}
            <Route
              exact
              path="/login"
              component={LoginPage}
            />
            <Route
              exact
              path="/home"
              component={Home}
            />
            <Route
              exact
              path="/selectparticipant"
              component={SelectParticipant}
            />
            <Route
              exact
              path="/pin"
              component={PINentry}
            />
            <Route
              
              exact
              path="/addparticipant"
              component={AddPatient}
            />
            <Route
              exact
              path="/checkin/:id"
              component={CheckInPage}
            />

            <Route
              
              exact
              path="/dashboard"
              component={Dashboard}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            />
            <Route
              exact
              path="/questionnaire"
              component={QQDemographs}
            />
            <Route
              exact
              path="/createuser"
              component={CreateUser}
            />

            <Route
              exact
              path="/registration"
              component={RegisterPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default connect()(App);

import React, { Component } from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PrioritiesPage from "../Priorities"
import AccountPage from "../Account";
import AdminPage from "../Admin";
import PasswordForgetPage from "../PasswordForget";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser:null
        }
    }

    /*
    When the component is mounted in DOM the listener function starts the
    helping method from auth object in firebase. Its parameter is another function
    with authUser object. This function is called every time something changes in
    authenticated user - signing in, signing up, signing out. For example if user
    signs out the authUser object will become null.

    The state of app component will be change to null and based on that some
    components can adjust their behaviour depending on that (like Navigation
    component)
    */

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ authUser })
                : this.setState({ authUser:null })
        });
    }


    //When component unmounts the listener is removed;

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <Router>
                <Navigation authUser={this.state.authUser}/>

                <hr/>

                <Switch>
                    <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                    <Route path={ROUTES.PRIORITIES} component={PrioritiesPage}/>
                    <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                    <Route path={ROUTES.ADMIN} component={AdminPage}/>
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
                </Switch>
            </Router>
        );
    }
}




export default withFirebase(App);
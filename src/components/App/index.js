import React from "react";
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

import * as ROUTES from "../../constants/routes";

const App = () => (
    <Router>
        <Navigation/>

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
)

export default App;
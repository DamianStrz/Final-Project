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
import PrioritiesPage, {
    AddTaskGrowth,
    AddTaskPersonal,
    AddTaskWork,
    TasksSummary
} from "../Priorities"
import AccountPage from "../Account";
import AdminPage from "../Admin";
import PasswordForgetPage from "../PasswordForget";

import * as ROUTES from "../../constants/routes";

import { withAuthentication } from "../Session";
import {Container} from "react-bootstrap";


const App = () => (
    <Router>
        <Container as="header">
            <Navigation />
        </Container>

        <hr/>
        <Container as="main" className="h-100">
            <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                <Route path={ROUTES.PRIORITIES} component={PrioritiesPage}/>
            </Switch>

            <Switch>
                <Route path={ROUTES.PRIORITIES_PERSONAL} component={AddTaskPersonal}/>
                <Route path={ROUTES.PRIORITIES_WORK} component={AddTaskWork}/>
                <Route path={ROUTES.PRIORITIES_GROWTH} component={AddTaskGrowth}/>
                <Route path={ROUTES.PRIORITIES_SUMMARY} component={TasksSummary}/>
            </Switch>
            <Switch>
                <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                <Route path={ROUTES.ADMIN} component={AdminPage}/>
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
            </Switch>
        </Container>

        <hr/>

        <Container as="footer" className="d-flex justify-content-end">
            by Damian Strzałkowski
        </Container>

    </Router>
);





export default withAuthentication(App);
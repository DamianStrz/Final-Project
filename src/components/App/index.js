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
    AddTaskGrowthFirebase,
    AddTaskPersonalFirebase,
    AddTaskWorkFirebase,
    TasksSummaryFirebase
} from "../Priorities"
import AccountPage from "../Account";
import AdminPage from "../Admin";
import PasswordForgetPage from "../PasswordForget";

import { PrivacyPolicy, CookiesPolicy, PrivacyLink, CookiesLink } from "../CookiesPrivacy";

import * as ROUTES from "../../constants/routes";

import { withAuthentication } from "../Session";
import {Container} from "react-bootstrap";


const App = () => (
    <Router>
        <Container fluid as="header">
            <Navigation />
        </Container>

        <hr/>
        <Container fluid as="main" className="
        d-flex
        flex-column
        justify-content-center
        align-items-center
        border border-white rounded">
            <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                <Route path={ROUTES.PRIORITIES} component={PrioritiesPage}/>
            </Switch>

            <Switch>
                <Route path={ROUTES.PRIORITIES_PERSONAL} component={AddTaskPersonalFirebase}/>
                <Route path={ROUTES.PRIORITIES_WORK} component={AddTaskWorkFirebase}/>
                <Route path={ROUTES.PRIORITIES_GROWTH} component={AddTaskGrowthFirebase}/>
                <Route path={ROUTES.PRIORITIES_SUMMARY} component={TasksSummaryFirebase}/>
            </Switch>
            <Switch>
                <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                <Route path={ROUTES.ADMIN} component={AdminPage}/>
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
            </Switch>
            <Switch>
                <Route path={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy}/>
                <Route path={ROUTES.COOKIES_POLICY} component={CookiesPolicy}/>
            </Switch>
        </Container>

        <hr/>

        <Container fluid as="footer">


            <p className="text-center">This application is made for educational purposes. It is not recommended to pass any sensitive information
                to inputs or any other important for users information. Read more: <PrivacyLink/> and <CookiesLink/><span><br/> &copy; Made by Damian Strzałkowski</span></p>

        </Container>

    </Router>
);





export default withAuthentication(App);
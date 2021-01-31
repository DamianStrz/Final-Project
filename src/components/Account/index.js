import React from "react";

import { Container } from "react-bootstrap";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";

const AccountPage = () => (
    <AuthUserContext.Consumer>
    {authUser => (
        <Container fluid className="d-flex flex-column w-75">
            <h1 className="text-center mb-4">Account Page</h1>
            <h2 className="mb-2"> Hello: {authUser.email}. What do want to do?</h2>
            <h4>Password reset?</h4>
            <PasswordForgetForm/>
            <h4>Password change?</h4>
            <PasswordChangeForm/>
        </Container>
        )}
    </AuthUserContext.Consumer>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
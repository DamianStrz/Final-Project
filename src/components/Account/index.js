import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";

const AccountPage = () => (
    <AuthUserContext.Consumer>
    {authUser => (
        <div>
            <h1 className="mb-4">Account Page. Hello: {authUser.email} What do you need?</h1>
            <h2>Password reset?</h2>
            <PasswordForgetForm/>
            <h2>Password change?</h2>
            <PasswordChangeForm/>
        </div>
        )}
    </AuthUserContext.Consumer>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
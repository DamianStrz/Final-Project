import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";

const AccountPage = () => (
    <div>
        <h1>Account Page. What do you need?</h1>
        <h2>Password reset?</h2>
        <PasswordForgetForm/>
        <h2>Password change?</h2>
        <PasswordChangeForm/>
    </div>
)

export default AccountPage;
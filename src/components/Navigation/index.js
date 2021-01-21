import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";


const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing page</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={ROUTES.PRIORITIES}>Your priorities</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                <SignOutButton/>
            </li>
        </ul>
    </div>
)

export default Navigation;
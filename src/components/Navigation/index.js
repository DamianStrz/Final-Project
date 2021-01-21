import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

/*
* Component Navigation has two versions based on authUser value which is the
* state of the App component. If authUser is null component Navigation will render
* different version then when authUser will be true.
*
* */

const Navigation = ({authUser}) => (
    <div>
        {authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
    </div>
)

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing page</Link>
        </li>
        <li>
            <Link to={ROUTES.PRIORITIES}>Your priorities</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <SignOutButton/>
        </li>
    </ul>
)

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing page</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
)





export default Navigation;
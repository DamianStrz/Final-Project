import React from "react";
import { NavLink } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../Session";

import { Nav } from "react-bootstrap";

/*
* Component Navigation has two versions based on authUser value which is the
* state of the App component. If authUser is null component Navigation will render
* different version then when authUser will be true.
*
* */

const Navigation = () => (
    <>
        <AuthUserContext.Consumer>
            {authUser => authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
        </AuthUserContext.Consumer>

    </>
)

const NavigationAuth = () => (
    <Nav className="justify-content-center" activeKey={ROUTES.LANDING}>
        <Nav.Item>
            <Nav.Link as={NavLink} to={ROUTES.LANDING}>Landing page</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey={ROUTES.PRIORITIES} as={NavLink} to={ROUTES.PRIORITIES}>Your priorities</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey={ROUTES.ACCOUNT} as={NavLink} to={ROUTES.ACCOUNT}>Account</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey={ROUTES.PRIORITIES} as={NavLink} to={ROUTES.ADMIN}>Admin</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <SignOutButton/>
        </Nav.Item>
    </Nav>
)

const NavigationNonAuth = () => (
    <Nav className="justify-content-center" activeKey={ROUTES.LANDING}>
        <Nav.Item>
            <Nav.Link as={NavLink} to={ROUTES.LANDING}>Landing page</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey={ROUTES.SIGN_IN} as={NavLink} to={ROUTES.SIGN_IN}>Sign In</Nav.Link>
        </Nav.Item>
    </Nav>
)





export default Navigation;
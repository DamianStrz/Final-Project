import React from "react";

import { Button } from "react-bootstrap";

import { withFirebase } from "../Firebase";

/* SignOut component is a button which onClick event uses doSignOut method from
firebase class. Access to this method is possible thanks to high order component
withFirebase.

Sign Out action is defined in firebase API.
* */

const SignOutButton = ({ firebase }) => (
    <Button type="button" onClick={firebase.doSignOut}>
        Sign me out
    </Button>
)

export default withFirebase(SignOutButton);
import React from "react";

import { withFirebase } from "../Firebase";

/* SignOut component is a button which onClick event uses doSignOut method from
firebase class. Access to this method is possible thanks to high order component
withFirebase.

Sign Out action is defined in firebase API.
* */

const SignOutButton = ({ firebase }) => (
    <button type="button" onClick={firebase.doSignOut}>
        Sign me out
    </button>
)

export default withFirebase(SignOutButton);
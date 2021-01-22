import React from "react";

import { withAuthorization } from "../Session"

const PrioritiesPage = () => (
    <div>
        <h1>See your priorities</h1>
        <p>Access only for signed in user</p>
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PrioritiesPage);

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Button } from "react-bootstrap";


import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
    <div>
        <h1 className="mb-4">Password resetting page</h1>
        <PasswordForgetForm/>
    </div>
)


const INITIAL_STATE = {
    email: "",
    error: null
}

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    /*On submit method handles action for password resetting in firebase API.
    It uses method from class Firebase made for this purpose.
    If request is successful state is being set as initial, so the input fields
    are reset and empty. While error request state gets error object.
    *
    *
    * */

    onSubmit = e => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
                /*
                 Here we need special component to be rendered when password
                 reset link successfully sent. Now user is redirected to
                 Sign In page.
                */
                this.props.history.push(ROUTES.SIGN_IN);
            })
            .catch(error => {
                this.setState({ error })
            })
        e.preventDefault();
    }

    onChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]:value });

    }

    render() {
        const { email, error } = this.state;

        const isInvalid = email === "";

        return(
            <form className="mb-2" onSubmit={this.onSubmit}>
                <input className="mr-2"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter your email address"
                />

                <Button className="ml-2" disabled={isInvalid} type="submit">
                    Reset my password
                </Button>

                {error && <p className="error">{error.message}</p>}

            </form>

        )
    }
}

const PasswordForgetForm = compose(
    withRouter,
    withFirebase,
)(PasswordForgetFormBase);

const PasswordForgetLink = () => (
    <p>
        Forget your password? <Link to={ROUTES.PASSWORD_FORGET}>Reset password.</Link>
    </p>
)


export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Button } from "react-bootstrap";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
    <div>
        <h1 className="mb-4">Sign in to see your priorities</h1>
        <SignInForm/>
        <PasswordForgetLink/>
        <SignUpLink/>
    </div>
)

const INITIAL_STATE = {
    email:"",
    password: "",
    error: null
}

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = e => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.PRIORITIES);
            })
            .catch(error => {
            this.setState({...INITIAL_STATE, error});
        })

        e.preventDefault();
    };

    onChange = e => {
        const {name, value} = e.target;

        this.setState({ [name]:value });
    };


    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === "" || email === "";

        return (
            <form className="mb-2" onSubmit={this.onSubmit}>
                <input className="mr-2"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input className="ml-2 mr-2"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Your Password"
                />
                <Button size="sm" className="ml-2" disabled={isInvalid} type="submit">
                    Sign In
                </Button>

                {error && <p className="error">{error.message}</p>}
            </form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);


export default SignInPage;

export { SignInForm };
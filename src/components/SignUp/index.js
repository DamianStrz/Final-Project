import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
    <div>
        <h1>Sign Up page</h1>
        <SignUpForm/>
    </div>
)


const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = e => {

    }

    onChange = e => {
        const {name, value} = e.target;

        this.setState({ [name]:value })

    }

    render() {

        const {username, email, passwordOne, passwordTwo, error} = this.state;

        //Validation

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === "" ||
            username === ""


        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Your name"
                />

                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Your email address"
                />

                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />

                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm password"
                />

                <button disabled={isInvalid} type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have acount? <Link to={ROUTES.SIGN_UP}>SignUp</Link>
    </p>
)

export default SignUpPage;

export { SignUpForm, SignUpLink };
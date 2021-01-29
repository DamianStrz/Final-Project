import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Container, Button } from "react-bootstrap";

import { withFirebase } from "../Firebase"
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
    <Container className="row">
        <h1 className="mb-4">Sign Up, have priorities!</h1>
        <Container className="col">
            <SignUpForm/>
        </Container>
    </Container>
)

const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = e => {
        const { username, email, passwordOne } = this.state;

        /* Thanks Firebase Context there is an access to Firebase instance from
        FirebaseContextProvider. When the firebase object is achievable SignUpPage
        renders SignUpForm component with props firebase, which is firebase.

        The SignUpForm component cant take the firebase from props and we cane use
        it in methods down below as follows.

        */

        this.props.firebase
            .doCreatUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                //Creates user in Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        personalData: [],
                        workData: [],
                        growthData: [],

                    })
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.PRIORITIES);
            })
            .catch(error => {
                this.setState({ error })
            })
        e.preventDefault();
    };

    onChange = e => {
        const {name, value} = e.target;

        this.setState({ [name]:value })

    };

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
                    className="mb-2"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Your name"
                />

                <input
                    className="mb-2"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Your email address"
                />

                <input
                    className="mb-2"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />

                <input
                    className="mb-2"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm password"
                />

                <Button disabled={isInvalid} type="submit">Sign Up</Button>

                {error && <p className="error">{error.message}</p>}
            </form>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have account? <Link to={ROUTES.SIGN_UP}>SignUp</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
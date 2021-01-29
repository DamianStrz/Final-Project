import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Button } from "react-bootstrap";

const INITIAL_STATE = {
    passwordOne: "",
    passwordTwo: "",
    error: "null"
}

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = e => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            })
        e.preventDefault();

    }

    onChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]:value });

    }

    render() {
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === "";

        return(
            <form className="mb-3" onSubmit={this.onSubmit}>
                <input
                    className="mr-2"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New password"
                />
                <input
                    className="ml-2 mr-2"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm new password"
                />

                <Button className="ml-2" disabled={isInvalid} type="submit">
                    Change my password
                </Button>

                {error && <p className="error">{error.message}</p>}
            </form>

        )
    }

}

export default withFirebase(PasswordChangeForm);
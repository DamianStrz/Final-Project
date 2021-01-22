import React, { Component } from "react";

import { withFirebase } from "../Firebase";

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
            <form onSubmit={this.onSubmit}>
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm new password"
                />

                <button disabled={isInvalid} type="submit">
                    Change my password
                </button>

                {error && <p>{error.message}</p>}
            </form>

        )
    }

}

export default withFirebase(PasswordChangeForm);
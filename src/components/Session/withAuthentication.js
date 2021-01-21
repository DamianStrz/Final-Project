import React from "react";

import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser:null
            }
        }

        /*
        When the component is mounted in DOM the listener function starts the
        helping method from auth object in firebase. Its parameter is another function
        with authUser object. This function is called every time something changes in
        authenticated user - signing in, signing up, signing out. For example if user
        signs out the authUser object will become null.

        The state of app component will be change to null and based on that some
        components can adjust their behaviour depending on that (like Navigation
        component)
        */

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser:null })
            });
        }


        //When component unmounts the listener is removed;

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props}/>
                </AuthUserContext.Provider>

            )
        }
    }

    //Returning component with using high order component for firebase context;

    return withFirebase(WithAuthentication)
}

export default withAuthentication;
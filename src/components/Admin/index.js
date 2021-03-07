import React, { Component } from "react";

import {Button, Container} from "react-bootstrap";

import { withAuthorization } from "../Session";

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],

        }
    }

    componentDidMount() {
        this.setState({loading: true});

        // this.props.firebase.users().on("value", snapshot => {
        //     const usersObject = snapshot.val();
        //
        //     const usersList = Object.keys(usersObject).map(key => ({
        //         ...usersObject[key],
        //         uid: key,
        //     }));
        //
        //     this.setState({
        //         users: usersList,
        //         loading: false
        //     });
        // });

        this.props.firebase.auth.currentUser && this.setState(({ loading: false }))
    }

    componentWillUnmount() {
        // this.props.firebase.users().off();
    }

    render() {
        const {loading} = this.state;

        return (
            <div>
                <h1>Admin Page - users info</h1>
                {loading &&
                    <h2>Page is loading or there is no access to database...</h2>
                }

                <h3>You are an authenticated user. What do you want to do?</h3>
                <Container fluid className="d-flex flex-column pl-0 pr-0">
                    <ClearData firebase={this.props.firebase}/>
                    <DeleteCurrentUser firebase={this.props.firebase}/>
                </Container>


            </div>
        );
    }
}

// const UserList = ({ users }) => (
//     <ul>
//         {users.map(user => (
//             <li key={user.uid}>
//                 <span>
//                     <strong>ID:</strong> {user.uid};
//                 </span>
//                 <span>
//                     <strong>E-mail:</strong> {user.email};
//                 </span>
//                 <span>
//                     <strong>Username:</strong> {user.username};
//                 </span>
//             </li>
//         ))}
//     </ul>
// )


class ClearData extends Component {


    handleClick = () => {
        const userID = this.props.firebase.auth.currentUser.uid;


        this.props.firebase
            .user(userID)
            .set({
                personalData: ["cleared"],
                growthData: ["cleared"],
                workData:["cleared"],
                personalDataDone: ["cleared"],
                workDataDone: ["cleared"],
                growthDataDone: ["cleared"]
            })
            .then(window.alert("Data cleared!"))


    }

    render() {
        return <span className="pt-2 pb-2">I want to clear all my data: <Button variant="danger" onClick={this.handleClick}>Clear data</Button></span>
    }
}

class DeleteCurrentUser extends Component {

    handleClick = () => {
        const user = this.props.firebase.auth.currentUser;
        const userID = this.props.firebase.auth.currentUser.uid;




        user.delete()
            .then(() => {
                this.props.firebase
                    .user(userID)
                    .set({status: "deleted"})
                })
            .then(window.alert("Your account was successfully deleted!"))
            .catch(error => console.log(error))
    }



    render() {
        return <span className="pt-2 pb-2">I want to delete current user: <Button variant="danger" onClick={this.handleClick}>Delete user</Button></span>
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
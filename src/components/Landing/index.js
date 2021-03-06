import React, { Component } from "react";

import { Row, Col } from "react-bootstrap"

import Policies from "../CookiesPrivacy";

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false,
            // inactiveLink: document.getElementById("active")
        }



    }

    handleClick = () => {
        this.setState({ hidden: !this.state.hidden })
        document.getElementById("active").classList.remove("inactive-link")

    }

    componentDidMount() {

        this.state.hidden === false && document.getElementById("active").classList.add("inactive-link")

    }


    render() {
        return (
           this.state.hidden === false
               ? <Policies handleClick={this.handleClick}/>

               : <Row>
                   <Col>
                       <h1 className="text-center">PrioritiseME</h1>
                       <h2 className="text-center">Welcome to the world of your priorities</h2>
                   </Col>
                </Row>

        )
    }

}

export default LandingPage;
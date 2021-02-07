import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {Container, Nav, Button, InputGroup, FormControl} from "react-bootstrap";

import { withAuthorization } from "../Session"
import * as ROUTES from "../../constants/routes"

const PrioritiesPage = () => (
    <Container fluid className="d-flex flex-column align-items-center w-75">
        <h1 className="text-center">See your priorities</h1>
        <p className="text-center mb-4">Access only for signed in user</p>
        <PrioritiesNavigation/>

        <hr/>

    </Container>
)


let INITIAL_STATE = {
    taskName: "",
    priority: 0,
    formality: 0,
    urgency: 0,
    personalDataInitial: [],
    workDataInitial: [],
    growthDataInitial: [],
    error: null
}

let DELETED_PERSONAL_TASKS_ARRAY = [];
let DELETED_WORK_TASKS_ARRAY = [];
let DELETED_GROWTH_TASKS_ARRAY = [];

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};

        // if (this.props.tab === "personal") {
        //     this.state = { ...INITIAL_STATE_PERSONAL };
        // } else if (this.props.tab === "work") {
        //     this.state = { ...INITIAL_STATE_WORK };
        // } else {
        //     this.state = { ...INITIAL_STATE_GROWTH };
        // }

    }

    //works

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]:value });

    };

    //works

    onSubmit = (e) => {
        const { taskName, priority, formality, urgency} = this.state;
        const userID = this.props.firebase.auth.currentUser.uid;

        // this.props.firebase.user(userID).on("value", snapshot => console.log(snapshot.val()))
        // console.log(this.props.firebase.auth.currentUser);


        const name = e.target.name;

        if (name === "personal") {

            INITIAL_STATE = { ...INITIAL_STATE,
                personalDataInitial: [...this.state.personalDataInitial, {
                    "taskName": taskName,
                    "priority": priority,
                    "formality": formality,
                    "urgency": urgency
                }]
            }

            this.setState({ ...INITIAL_STATE,
                personalDataInitial: [...this.state.personalDataInitial, {
                    "taskName": taskName,
                    "priority": priority,
                    "formality": formality,
                    "urgency": urgency
                }]
            });

            this.props.firebase
                .user(userID)
                .update( {personalData: [...this.state.personalDataInitial, {
                        "taskName": taskName,
                        "priority": priority,
                        "formality": formality,
                        "urgency": urgency
                    }]
                });


        } else if (name === "work") {

            INITIAL_STATE = { ...INITIAL_STATE,
                workDataInitial: [ ...this.state.workDataInitial, {
                    "taskName": taskName,
                    "priority": priority,
                    "formality": formality,
                    "urgency": urgency
            } ]
            }

            this.setState({ ...INITIAL_STATE,
                workDataInitial: [...this.state.workDataInitial, {
                    "taskName": taskName,
                    "priority": priority,
                    "formality": formality,
                    "urgency": urgency
                }]
            });

            this.props.firebase
                .user(userID)
                .update( { workData: [...this.state.workDataInitial, {
                        "taskName": taskName,
                        "priority": priority,
                        "formality": formality,
                        "urgency": urgency
                    }]
                });


        } else {

            INITIAL_STATE = { ...INITIAL_STATE,
                growthDataInitial: [ ...this.state.growthDataInitial, {
                "taskName": taskName,
                    "priority": priority,
                    "formality": formality,
                    "urgency": urgency
                }]
            };

            this.setState({ ...INITIAL_STATE,
                growthDataInitial: [...this.state.growthDataInitial, {
                    "taskName": taskName,
                    "priority": priority,
                    "formality": formality,
                    "urgency": urgency
                }]
            })

            this.props.firebase
                .user(userID)
                .update( { growthData: [...this.state.growthDataInitial, {
                        "taskName": taskName,
                        "priority": priority,
                        "formality": formality,
                        "urgency": urgency
                    }]
                })

        }

        // this.setState({ ...INITIAL_STATE, data: [...this.state.data, {
        //     "taskName": taskName,
        //     "priority": priority,
        //     "formality": formality,
        //     "urgency": urgency
        //     }]}
        // );


        e.preventDefault();
    };

    //works

    handleDeleteTask = (e) => {

        const name = e.target.name;
        const task = e.target.id
        const userID = this.props.firebase.auth.currentUser.uid;


        if (name === "personal") {
            DELETED_PERSONAL_TASKS_ARRAY = [ ...DELETED_PERSONAL_TASKS_ARRAY,
                ...this.state.personalDataInitial.filter(el => el.taskName !== task) ]

            INITIAL_STATE = {...INITIAL_STATE,
                personalDataInitial: [...this.state.personalDataInitial.filter(el => el.taskName !== task)]}

            this.setState( { ...this.state,
                personalDataInitial:[
                    ...DELETED_PERSONAL_TASKS_ARRAY] })

            this.props.firebase
                .user(userID)
                .update({personalData: [ ...this.state.personalDataInitial.filter(el => el.taskName !== task)]})


            // .then(() => this.setState({ ...this.state,
                //         personalDataInitial:[
                //             ...this.state.personalDataInitial.filter(el => el.taskName !== task)] }))
                    // ...this.state.data.filter(el => el.taskName !== task)]})


        } else if (name === "work") {

            DELETED_WORK_TASKS_ARRAY = [ ...DELETED_WORK_TASKS_ARRAY,
                ...this.state.workDataInitial.filter(el => el.taskName !== task) ]

            INITIAL_STATE = {...INITIAL_STATE,
                workDataInitial: [...this.state.workDataInitial.filter(el => el.taskName !== task)]}

            this.setState( { ...this.state,
                workDataInitial:[
                    ...DELETED_WORK_TASKS_ARRAY] })

            this.props.firebase
                .user(userID)
                .update({workData: [ ...this.state.workDataInitial.filter(el => el.taskName !== task)]})


            // .then(() => this.setState({ ...this.state,
            //         personalDataInitial:[
            //             ...this.state.personalDataInitial.filter(el => el.taskName !== task)] }))
                    // ...this.state.data.filter(el => el.taskName !== task)]})

        } else {

            DELETED_GROWTH_TASKS_ARRAY = [ ...DELETED_GROWTH_TASKS_ARRAY,
                ...this.state.growthDataInitial.filter(el => el.taskName !== task) ]

            INITIAL_STATE = {...INITIAL_STATE,
                growthDataInitial: [...this.state.growthDataInitial.filter(el => el.taskName !== task)]}

            this.setState( { ...this.state,
                growthDataInitial:[
                    ...DELETED_GROWTH_TASKS_ARRAY] })

            this.props.firebase
                .user(userID)
                .update({growthData: [ ...this.state.growthDataInitial.filter(el => el.taskName !== task)]})

            // .then(() => this.setState({ ...this.state,
            //         personalDataInitial:[
            //             ...this.state.personalDataInitial.filter(el => el.taskName !== task)] }))
            // ...this.state.data.filter(el => el.taskName !== task)]}))

        }

        // this.setState({...this.state, data:[
        //   ...this.state.data.filter(el => el.taskName !== task)]})

    }

    //not working

    handleDoneTask = (e) => {
        const task = e.target.id;
        const name = e.target.name;
        const userID = this.props.firebase.auth.currentUser.uid;

        if (name === "personal") {

            this.props.firebase
                .user(userID)
                .once("value", snapshot => {
                    let DONE_PERSONAL_TASKS_ARRAY;
                    snapshot.val().personalDataDone === undefined
                        ?DONE_PERSONAL_TASKS_ARRAY = []
                        :DONE_PERSONAL_TASKS_ARRAY = [...snapshot.val().personalDataDone]

                    DONE_PERSONAL_TASKS_ARRAY = [...DONE_PERSONAL_TASKS_ARRAY,
                        ...this.state.personalDataInitial.filter(el => el.taskName === task)];

                    INITIAL_STATE = {
                        ...INITIAL_STATE,
                        personalDataInitial: [...this.state.personalDataInitial.filter(el => el.taskName !== task)]
                    };

                    this.setState({
                        ...this.state,
                        personalDataInitial: [
                            ...this.state.personalDataInitial.filter(el => el.taskName !== task)]
                    })


                    this.props.firebase
                        .user(userID)
                        .update({
                            personalData: [...this.state.personalDataInitial.filter(el => el.taskName !== task)],
                            personalDataDone: [...DONE_PERSONAL_TASKS_ARRAY]
                        })
                })



        } else if (name === "work") {

            this.props.firebase
                .user(userID)
                .once("value", snapshot => {
                    let DONE_WORK_TASKS_ARRAY;
                    snapshot.val().workDataDone === undefined
                        ? DONE_WORK_TASKS_ARRAY = []
                        : DONE_WORK_TASKS_ARRAY = [...snapshot.val().workDataDone]

                    DONE_WORK_TASKS_ARRAY = [...DONE_WORK_TASKS_ARRAY,
                        ...this.state.workDataInitial.filter(el => el.taskName === task)];

                    INITIAL_STATE = {
                        ...INITIAL_STATE,
                        workDataInitial: [...this.state.workDataInitial.filter(el => el.taskName !== task)]
                    };

                    this.setState({
                        ...this.state,
                        workDataInitial: [
                            ...this.state.workDataInitial.filter(el => el.taskName !== task)]
                    });

                    this.props.firebase
                        .user(userID)
                        .update({
                            workData: [...this.state.workDataInitial.filter(el => el.taskName !== task)],
                            workDataDone: [...DONE_WORK_TASKS_ARRAY]
                        });
                })


        } else {
            this.props.firebase
                .user(userID)
                .once("value", snapshot => {
                    let DONE_GROWTH_TASKS_ARRAY;
                    snapshot.val().growthDataDone === undefined
                        ? DONE_GROWTH_TASKS_ARRAY = []
                        : DONE_GROWTH_TASKS_ARRAY = [...snapshot.val().growthDataDone]

                    DONE_GROWTH_TASKS_ARRAY = [...DONE_GROWTH_TASKS_ARRAY,
                        ...this.state.growthDataInitial.filter(el => el.taskName === task)];

                    INITIAL_STATE = {
                        ...INITIAL_STATE,
                        growthDataInitial: [...this.state.growthDataInitial.filter(el => el.taskName !== task)]
                    };

                    this.setState({
                        ...this.state, growthDataInitial: [
                            ...this.state.growthDataInitial.filter(el => el.taskName !== task)]
                    })

                    this.props.firebase
                        .user(userID)
                        .update({
                            growthData: [...this.state.growthDataInitial.filter(el => el.taskName !== task)],
                            growthDataDone: [...DONE_GROWTH_TASKS_ARRAY]
                        });
                })
        }
    }

    componentDidMount() {
        const userID = this.props.firebase.auth.currentUser.uid;
        const name = this.props.tab;

        if (name === "personal") {
            this.listener = this.props.firebase
                .user(userID)
                .once("value", snapshot => {
                    const PERSONAL_DATA_FROM_DATABASE = snapshot.val().personalData;

                    PERSONAL_DATA_FROM_DATABASE !== undefined
                        ? this.setState({...INITIAL_STATE, personalDataInitial: [...PERSONAL_DATA_FROM_DATABASE]})
                        : this.setState({...INITIAL_STATE, personalDataInitial: []});
                });

        } else if (name === "work") {
            this.listener = this.props.firebase
                .user(userID)
                .once("value", snapshot => {
                    const WORK_DATA_FROM_DATABASE = snapshot.val().workData;

                    WORK_DATA_FROM_DATABASE !== undefined
                        ? this.setState({...INITIAL_STATE, workDataInitial:[...WORK_DATA_FROM_DATABASE]})
                        : this.setState({...INITIAL_STATE, workDataInitial: []})

                });

        } else {
            this.listener = this.props.firebase
                .user(userID)
                .once("value", snapshot => {
                    const GROWTH_DATA_FROM_DATABASE = snapshot.val().growthData;

                    GROWTH_DATA_FROM_DATABASE !== undefined
                        ? this.setState({...INITIAL_STATE, growthDataInitial:[...GROWTH_DATA_FROM_DATABASE]})
                        : this.setState({...INITIAL_STATE, growthDataInitial: []});

                });
            }
    }


    /*I don't really know if it's necessary to do sth like turning of listeners. Tried solution like down below
    but it doesn't work -> signing out resulted with error. */

    // componentWillUnmount() {
    //     const userID = this.props.firebase.auth.currentUser.uid;
    //     this.props.firebase.user(userID).off();
    //
    // }


    render() {
        const {
            taskName,
            priority,
            formality,
            urgency,
            personalDataInitial,
            workDataInitial,
            growthDataInitial
        } = this.state;

        const isInvalid =
            taskName === "" ||
            priority === 0 ||
            formality === 0 ||
            urgency === 0;

        let tasksArray;

        if (this.props.tab === "personal") {
           tasksArray = [...personalDataInitial];

        } else if (this.props.tab === "work") {

            tasksArray = [...workDataInitial];
        }

        else {
            tasksArray = [...growthDataInitial]
        }

        return(

            <Container fluid className="d-flex flex-column w-100 p2 mb-4 align-items-center">

                <ul className="w-75 p-0">
                    <h5>Your {`${this.props.tab}`} tasks list:</h5>
                    {tasksArray
                        .sort((a, b) => (
                            (+b.priority * 1.25) + +b.formality + +b.urgency) -
                            ((+a.priority * 1.25) + +a.formality + +a.urgency))
                        .map((el, index) => {
                            if ( index <= 2) {
                                return <li className="high-priority-task m-1 p-1 d-flex justify-content-between align-items-center rounded"
                                    key={index}>
                                    Task: {el.taskName}
                                    {/*, Priority: {el.priority},*/}
                                    {/*Formality: {el.formality}, Urgency: {el.urgency},*/}
                                    Priority rating:
                                    {(+el.priority * 1.25) + +el.formality + +el.urgency}
                                    <div>
                                        <DeleteTaskButton name={this.props.tab} id={el.taskName}
                                                          onClick={this.handleDeleteTask}/>
                                        <DoneTaskButton name={this.props.tab} id={el.taskName}
                                                        onClick={this.handleDoneTask}/>
                                    </div>
                                </li>
                            } else if (index > 2 && tasksArray.indexOf(el) <= 4) {
                                return <li className="medium-priority-task m-1 p-1 d-flex justify-content-between align-items-center rounded"
                                           key={index}>
                                    Task: {el.taskName}
                                    {/*, Priority: {el.priority},*/}
                                    {/*Formality: {el.formality}, Urgency: {el.urgency},*/}
                                    Priority rating:
                                    {(+el.priority * 1.25) + +el.formality + +el.urgency}
                                    <div>
                                        <DeleteTaskButton name={this.props.tab} id={el.taskName}
                                                          onClick={this.handleDeleteTask}/>
                                        <DoneTaskButton name={this.props.tab} id={el.taskName}
                                                        onClick={this.handleDoneTask}/>
                                    </div>
                                </li>
                            } else {
                                return <li className="low-priority-task m-1 p-1 d-flex justify-content-between align-items-center rounded"
                                           key={index}>
                                    Task: {el.taskName}
                                    {/*, Priority: {el.priority},*/}
                                    {/*Formality: {el.formality}, Urgency: {el.urgency},*/}
                                    Priority rating:
                                    {(+el.priority * 1.25) + +el.formality + +el.urgency}
                                    <div>
                                        <DeleteTaskButton name={this.props.tab} id={el.taskName}
                                                          onClick={this.handleDeleteTask}/>
                                        <DoneTaskButton name={this.props.tab} id={el.taskName}
                                                        onClick={this.handleDoneTask}/>
                                    </div>
                                </li>
                            }
                        })
                    }

                </ul>

                <h3 className="text-center w-75">Add your {`${this.props.tab}`} task </h3>
                <form className="d-flex flex-column align-items-center w-75" onSubmit={this.onSubmit} name={this.props.tab}>
                    <InputGroup className="d-flex justify-content-center w-75">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Task name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="taskName"
                            name="taskName"
                            value={taskName}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Enter task name"
                        />
                    </InputGroup>
                    <div className="d-flex justify-content-between w-75 mt-1 mb-1">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Priority</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                className="ratings"
                                name="priority"
                                value={priority}
                                onChange={this.onChange}
                                type="number"
                                min="1"
                                max="3"
                                placeholder="Set priority from 1 - 3"
                            />
                        </InputGroup>


                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Formality</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl className="ratings"
                            name="formality"
                            value={formality}
                            onChange={this.onChange}
                            type="number"
                            min="1"
                            max="3"
                            placeholder="Set formality from 1 - 3"
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Urgency</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl className="ratings"
                            name="urgency"
                            value={urgency}
                            onChange={this.onChange}
                            type="number"
                            min="1"
                            max="3"
                            placeholder="Set urgency from 1 - 3"
                        />
                    </InputGroup>
                    </div>
                    <Button block size="lg" className="ml-1 w-75" name={this.props.tab} disabled={isInvalid} type="submit">Add task</Button>
                </form>
            </Container>
        )
    }
}

class AddTaskPersonal extends Component {

    render() {
        return <AddTask firebase={this.props.firebase} tab="personal"/>
    }
}

class AddTaskWork extends Component {

    render() {
        return <AddTask firebase={this.props.firebase} tab="work"/>
    }
}

class AddTaskGrowth extends Component {

    render() {
        return <AddTask firebase={this.props.firebase} tab="growth"/>
    }
}

class TasksSummary extends Component {
    constructor(props) {
        super(props);

        this.firebase = this.props.firebase;

        this.state = {
            personalTasksDone: [],
            workTasksDone: [],
            growthTasksDone: [],
        };

    }

    componentDidMount() {
        const userID = this.props.firebase.auth.currentUser.uid;

        this.props.firebase
            .user(userID)
            .once("value", snapshot => {
                const DONE_PERSONAL_DATA_FROM_DATABASE = snapshot.val().personalDataDone;

                DONE_PERSONAL_DATA_FROM_DATABASE !== undefined
                    ? this.setState({personalTasksDone: [...DONE_PERSONAL_DATA_FROM_DATABASE]})
                    : this.setState({personalTasksDone: []});
            })

        this.props.firebase
            .user(userID)
            .once("value", snapshot => {
                const DONE_WORK_DATA_FROM_DATABASE = snapshot.val().workDataDone;

                DONE_WORK_DATA_FROM_DATABASE !== undefined
                    ? this.setState({workTasksDone: [...DONE_WORK_DATA_FROM_DATABASE]})
                    : this.setState({workTasksDone: []});
            })

        this.props.firebase
            .user(userID)
            .once("value", snapshot => {
                const DONE_GROWTH_DATA_FROM_DATABASE = snapshot.val().growthDataDone;

                DONE_GROWTH_DATA_FROM_DATABASE !== undefined
                    ? this.setState({growthTasksDone: [...DONE_GROWTH_DATA_FROM_DATABASE]})
                    : this.setState({growthTasksDone: []})
            })
    }

    /*I don't really know if it's necessary to do sth like turning of listeners. Tried solution like down below
    but it doesn't work -> signing out resulted with error. */

    // componentWillUnmount() {
    //     const userID = this.props.firebase.auth.currentUser.uid;
    //     this.props.firebase.user(userID).off();
    //
    // }

    render() {
        return (
            <Container fluid className="w-100 d-flex flex-column align-items-center">
                <Container fluid className="w-75 summary rounded p-4 mb-3">
                    <h2>Personal Summary</h2>
                    <p>Tasks done:&nbsp; <span>{this.state.personalTasksDone.length}</span></p>
                    <p>High priority tasks done (priority rating >= 5):&nbsp; <span className=" high-priority-title">
                    {this.state.personalTasksDone.filter(el =>
                        ((+el.priority*1.25) + +el.formality + +el.urgency) > 5)
                        .length}</span></p>

                    <ul className="d-flex flex-column align-items-center p-0">
                        Done tasks:
                        {this.state.personalTasksDone
                            .sort((a,b) => (
                                (+b.priority*1.25) + +b.formality + +b.urgency ) -
                                ((+a.priority*1.25) + +a.formality + +a.urgency))
                            .map((el, index) => (
                                <li className="summary-list p-1 mt-1" key={index}>
                                    Task: {el.taskName} || Priority rating:&nbsp;
                                    {(+el.priority*1.25) + +el.formality + +el.urgency}
                                </li>
                            ))}
                    </ul>
                </Container>


                <Container fluid className="w-75 summary rounded p-4 mb-3">
                    <h2>Work Summary</h2>
                    <p>Tasks done: &nbsp;<span>{this.state.workTasksDone.length}</span></p>
                    <p>High priority tasks done (priority rating >= 5):&nbsp;<span className="high-priority-title">
                    {this.state.workTasksDone.filter(el =>
                        ((+el.priority*1.25) + +el.formality + +el.urgency) > 5)
                        .length}</span></p>

                    <ul className="d-flex flex-column align-items-center p-0">
                        Done tasks:
                        {this.state.workTasksDone
                            .sort((a,b) => (
                                (+b.priority*1.25) + +b.formality + +b.urgency ) -
                                ((+a.priority*1.25) + +a.formality + +a.urgency))
                            .map((el, index) => (
                                <li className="summary-list p-1 mt-1" key={index}>
                                    Task: {el.taskName} || Priority rating:&nbsp;
                                    {(+el.priority*1.25) + +el.formality + +el.urgency}
                                </li>
                            ))}
                    </ul>
                </Container>

                <Container fluid className="w-75 summary rounded p-4 mb-3">
                    <h2>Growth Summary</h2>
                    <p>Tasks done: &nbsp;<span>{this.state.growthTasksDone.length}</span></p>
                    <p>High priority tasks done (priority rating >= 5): &nbsp;<span className="high-priority-title">
                    {this.state.growthTasksDone.filter(el =>
                        ((+el.priority*1.25) + +el.formality + +el.urgency) > 5)
                        .length}</span></p>

                    <ul className="d-flex flex-column align-items-center p-0">
                        Done tasks:
                        {this.state.growthTasksDone
                            .sort((a,b) => (
                                (+b.priority*1.25) + +b.formality + +b.urgency ) -
                                ((+a.priority*1.25) + +a.formality + +a.urgency))
                            .map((el, index) => (
                                <li className="summary-list p-1 mt-1" key={index}>
                                    Task: {el.taskName} || Priority rating:&nbsp;
                                    {(+el.priority*1.25) + +el.formality + +el.urgency}
                                </li>
                            ))}
                    </ul>
                </Container>
            </Container>


        )
    }
}

const DeleteTaskButton = (props) => <Button
    variant="danger"
    className="ml-1"
    name={props.name}
    id={props.id}
    type="button"
    onClick={props.onClick}>Delete</Button>

const DoneTaskButton = (props) => <Button
    variant="success"
    className="ml-1"
    name={props.name}
    id={props.id}
    type="button"
    onClick={props.onClick}>Done</Button>

const PrioritiesNavigation = () => (
    // <div>
    //     <p>Choose category:</p>
    //     <ul>
    //         <li>
    //             <Link to={ROUTES.PRIORITIES_PERSONAL}>Personal</Link>
    //         </li>
    //         <li>
    //             <Link to={ROUTES.PRIORITIES_WORK}>Work</Link>
    //         </li>
    //         <li>
    //             <Link to={ROUTES.PRIORITIES_GROWTH}>Growth</Link>
    //         </li>
    //         <li>
    //             <Link to={ROUTES.PRIORITIES_SUMMARY}>Summary</Link>
    //         </li>
    //     </ul>
    // </div>

    <Nav variant="tabs" className="d-flex justify-content-center w-50">
        <Nav.Item>
            <Nav.Link as={NavLink} to={ROUTES.PRIORITIES_PERSONAL}>Personal</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={NavLink} to={ROUTES.PRIORITIES_WORK}>Work</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={NavLink} to={ROUTES.PRIORITIES_GROWTH}>Growth</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={NavLink} to={ROUTES.PRIORITIES_SUMMARY}>Summary</Nav.Link>
        </Nav.Item>

    </Nav>
)


const condition = authUser => !!authUser;

export default withAuthorization(condition)(PrioritiesPage);

const AddTaskPersonalFirebase = withAuthorization(condition)(AddTaskPersonal);
const AddTaskWorkFirebase = withAuthorization(condition)(AddTaskWork);
const AddTaskGrowthFirebase = withAuthorization(condition)(AddTaskGrowth);
const TasksSummaryFirebase = withAuthorization(condition)(TasksSummary);


export {
    DeleteTaskButton,
    DoneTaskButton,
    PrioritiesNavigation,
    AddTask,
    AddTaskPersonalFirebase,
    AddTaskGrowthFirebase,
    AddTaskWorkFirebase,
    TasksSummaryFirebase }

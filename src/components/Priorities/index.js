import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

import { withAuthorization } from "../Session"
import * as ROUTES from "../../constants/routes"

import { Nav, Button } from "react-bootstrap";

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

let DONE_PERSONAL_TASKS_ARRAY = [];
let DONE_WORK_TASKS_ARRAY = [];
let DONE_GROWTH_TASKS_ARRAY = [];

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
            DONE_PERSONAL_TASKS_ARRAY = [...DONE_PERSONAL_TASKS_ARRAY,
                ...this.state.personalDataInitial.filter(el => el.taskName === task)];

            INITIAL_STATE = {...INITIAL_STATE,
                personalDataInitial: [...this.state.personalDataInitial.filter(el => el.taskName !== task)]};

            this.setState({...this.state,
                personalDataInitial:[
                    ...this.state.personalDataInitial.filter(el => el.taskName !== task)]
            })

            this.props.firebase
                .user(userID)
                .update({
                    personalData: [...this.state.personalDataInitial.filter(el => el.taskName !== task)],
                    personalDataDone: [...this.state.personalDataInitial.filter(el => el.taskName === task)]
                })

        } else if (name === "work") {
            DONE_WORK_TASKS_ARRAY = [...DONE_WORK_TASKS_ARRAY,
                ...this.state.workDataInitial.filter(el => el.taskName === task)];

            INITIAL_STATE = {...INITIAL_STATE,
                workDataInitial: [...this.state.workDataInitial.filter(el => el.taskName !== task )]};

            this.setState({...this.state,
                workDataInitial:[
                    ...this.state.workDataInitial.filter(el => el.taskName !== task)]
            });

            this.props.firebase
                .user(userID)
                .update({
                    workData: [...this.state.workDataInitial.filter(el => el.taskName !== task)],
                    workDataDone: [...this.state.workDataInitial.filter(el => el.taskName === task)]
                });

        } else {
            DONE_GROWTH_TASKS_ARRAY = [...DONE_GROWTH_TASKS_ARRAY,
                ...this.state.growthDataInitial.filter(el => el.taskName === task)];

            INITIAL_STATE = {...INITIAL_STATE,
                growthDataInitial: [...this.state.growthDataInitial.filter(el => el.taskName !== task)]};

            this.setState({...this.state, growthDataInitial:[
                    ...this.state.growthDataInitial.filter(el => el.taskName !== task)]
            })

            this.props.firebase
                .user(userID)
                .update({
                    growthData: [...this.state.growthDataInitial.filter(el => el.taskName !== task)],
                    growthDataDone: [...this.state.growthDataInitial.filter(el => el.taskName === task)]
                });
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

            <Container fluid className="d-flex flex-column w-75 p2 mb-4 align-items-center">

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
                <form className="d-flex justify-content-between align-items-center w-75" onSubmit={this.onSubmit} name={this.props.tab}>
                    <input className="mr-1 task-input"
                        name="taskName"
                        value={taskName}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Enter task name"
                    />
                    <input className="ml-1 mr-1"
                        name="priority"
                        value={priority}
                        onChange={this.onChange}
                        type="number"
                        min="1"
                        max="3"
                        placeholder="Set priority from 1 - 3"
                    />
                    <input className="ml-1 mr-1"
                        name="formality"
                        value={formality}
                        onChange={this.onChange}
                        type="number"
                        min="1"
                        max="3"
                        placeholder="Set formality from 1 - 3"
                    />

                    <input className="ml-1 mr-1"
                        name="urgency"
                        value={urgency}
                        onChange={this.onChange}
                        type="number"
                        min="1"
                        max="3"
                        placeholder="Set urgency from 1 - 3"
                    />
                    <Button className="ml-1" name={this.props.tab} disabled={isInvalid} type="submit">Add task</Button>
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
            <div>
                <div>
                    <h1>Personal Summary</h1>
                    <h2>Tasks done: </h2><p>{this.state.personalTasksDone.length}</p>
                    <h2>High priority tasks done (priority rating >= 5): </h2><p>
                    {this.state.personalTasksDone.filter(el =>
                        ((+el.priority*1.25) + +el.formality + +el.urgency) > 5)
                        .length}</p>

                    <ul>
                        Done tasks:
                        {this.state.personalTasksDone
                            .sort((a,b) => (
                                (+b.priority*1.25) + +b.formality + +b.urgency ) -
                                ((+a.priority*1.25) + +a.formality + +a.urgency))
                            .map((el, index) => (
                                <li key={index}>
                                    Task: {el.taskName}, Priority: {el.priority},
                                    Formality: {el.formality}, Urgency: {el.urgency},
                                    Priority rating:
                                    {(+el.priority*1.25) + +el.formality + +el.urgency}
                                </li>
                            ))}
                    </ul>
                </div>

                <div>
                    <h1>Work Summary</h1>
                    <h2>Tasks done: </h2><p>{this.state.workTasksDone.length}</p>
                    <h2>High priority tasks done (priority rating >= 5): </h2><p>
                    {this.state.workTasksDone.filter(el =>
                        ((+el.priority*1.25) + +el.formality + +el.urgency) > 5)
                        .length}</p>

                    <ul>
                        Done tasks:
                        {this.state.workTasksDone
                            .sort((a,b) => (
                                (+b.priority*1.25) + +b.formality + +b.urgency ) -
                                ((+a.priority*1.25) + +a.formality + +a.urgency))
                            .map((el, index) => (
                                <li key={index}>
                                    Task: {el.taskName}, Priority: {el.priority},
                                    Formality: {el.formality}, Urgency: {el.urgency},
                                    Priority rating:
                                    {(+el.priority*1.25) + +el.formality + +el.urgency}
                                </li>
                            ))}
                    </ul>
                </div>

                <div>
                    <h1>Growth Summary</h1>
                    <h2>Tasks done: </h2><p>{this.state.growthTasksDone.length}</p>
                    <h2>High priority tasks done (priority rating >= 5): </h2><p>
                    {this.state.growthTasksDone.filter(el =>
                        ((+el.priority*1.25) + +el.formality + +el.urgency) > 5)
                        .length}</p>

                    <ul>
                        Done tasks:
                        {this.state.growthTasksDone
                            .sort((a,b) => (
                                (+b.priority*1.25) + +b.formality + +b.urgency ) -
                                ((+a.priority*1.25) + +a.formality + +a.urgency))
                            .map((el, index) => (
                                <li key={index}>
                                    Task: {el.taskName}, Priority: {el.priority},
                                    Formality: {el.formality}, Urgency: {el.urgency},
                                    Priority rating:
                                    {(+el.priority*1.25) + +el.formality + +el.urgency}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>


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

import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withAuthorization } from "../Session"
import * as ROUTES from "../../constants/routes"

const PrioritiesPage = () => (
    <div>
        <h1>See your priorities</h1>
        <p>Access only for signed in user</p>
        <PrioritiesNavigation/>

        <hr/>

    </div>
)


let INITIAL_STATE = {
    taskName: "",
    priority: 0,
    formality: 0,
    urgency: 0,
    data: [],
    personalDataInitial: [],
    workDataInitial: [],
    growthDataInitial: [],
    error: null
}

// let INITIAL_STATE_PERSONAL = {
// taskName: "",
//     priority: 0,
//     formality: 0,
//     urgency: 0,
//     data: [],
// // }
//
// const INITIAL_STATE_WORK = {
//     taskName: "",
//     priority: 0,
//     formality: 0,
//     urgency: 0,
//     data: [],
// }
//
// const INITIAL_STATE_GROWTH = {
//     taskName: "",
//     priority: 0,
//     formality: 0,
//     urgency: 0,
//     data: [],
// }

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

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]:value });

    };

    onSubmit = (e) => {
        const { taskName, priority, formality, urgency} = this.state;
        const userID = this.props.firebase.auth.currentUser.uid;

        this.props.firebase.user(userID).on("value", snapshot => console.log(snapshot.val()))
        console.log(this.props.firebase.auth.currentUser);


        const name = e.target.name;

        if (name === "personal") {
            this.props.firebase
                .user(userID)
                .update( {personalData: [...this.state.personalDataInitial]})
                .then(() => {
                    this.setState({ ...INITIAL_STATE,
                        personalDataInitial: [...this.state.personalDataInitial, {
                            "taskName": taskName,
                            "priority": priority,
                            "formality": formality,
                            "urgency": urgency
                        }]});
                })
                .catch(error => {
                    this.setState({error});
                })

        } else if (name === "work") {
            this.props.firebase
                .user(userID)
                .update( { workData: [...this.state.workDataInitial]})
                .then(() => {
                    this.setState({ ...INITIAL_STATE,
                        workDataInitial: [...this.state.workDataInitial, {
                            "taskName": taskName,
                            "priority": priority,
                            "formality": formality,
                            "urgency": urgency
                        }]});
                })
                .catch(error => {
                    this.setState({error});
                })
        } else {
            this.props.firebase
                .user(userID)
                .update( { growthData: [...this.state.growthDataInitial]})
                .then(() => {
                    this.setState({ ...INITIAL_STATE,
                        growthDataInitial: [...this.state.growthDataInitial, {
                            "taskName": taskName,
                            "priority": priority,
                            "formality": formality,
                            "urgency": urgency
                        }]});
                })
                .catch(error => {
                    this.setState({error});
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

    handleDeleteTask = (e) => {
        const task = e.target.id;
        const name = e.target.name;
        const userID = this.props.firebase.auth.currentUser.uid;
        // const personalDataSnap =
        //     this.props.firebase.user(userID).on("value",
        //             snapshot => console.log(snapshot.val()))

        //
        if (name === "personal") {
            DELETED_PERSONAL_TASKS_ARRAY = [...DELETED_PERSONAL_TASKS_ARRAY,
                ...this.state.personalDataInitial.filter(el => el.taskName !== task)];

            INITIAL_STATE = {...INITIAL_STATE,
                personalDataInitial: [...DELETED_PERSONAL_TASKS_ARRAY]}

            this.setState({...this.state, personalDataInitial:[
                    ...DELETED_PERSONAL_TASKS_ARRAY]});
                    // ...this.state.data.filter(el => el.taskName !== task)]})

        } else if (name === "work") {
            DELETED_WORK_TASKS_ARRAY = [...DELETED_WORK_TASKS_ARRAY,
                ...this.state.workDataInitial.filter(el => el.taskName !== task)];

            INITIAL_STATE = {...INITIAL_STATE,
                personalDataInitial: [...DELETED_WORK_TASKS_ARRAY]}

            this.setState({...this.state, workDataInitial:[
                    ...DELETED_WORK_TASKS_ARRAY]});
                    // ...this.state.data.filter(el => el.taskName !== task)]})

        } else {
            DELETED_GROWTH_TASKS_ARRAY = [...DELETED_GROWTH_TASKS_ARRAY,
                ...this.state.growthDataInitial.filter(el => el.taskName !== task)];

            INITIAL_STATE = {...INITIAL_STATE,
                growthDataInitial: [...DELETED_GROWTH_TASKS_ARRAY]}

            this.setState({...this.state, growthDataInitial:[
                    ...DELETED_GROWTH_TASKS_ARRAY]});
                    // ...this.state.data.filter(el => el.taskName !== task)]})
        }


        // this.setState({...this.state, data:[
        //   ...this.state.data.filter(el => el.taskName !== task)]})

    }

    handleDoneTask = (e) => {
        const task = e.target.id;
        const name = e.target.name;

        if (name === "personal") {
            DONE_PERSONAL_TASKS_ARRAY = [...DONE_PERSONAL_TASKS_ARRAY,
                ...this.state.personalDataInitial.filter(el => el.taskName === task)];

            INITIAL_STATE = {...INITIAL_STATE,
                personalDataInitial: [...DONE_PERSONAL_TASKS_ARRAY]}

            this.setState({...this.state, personalDataInitial:[
                    ...this.state.personalDataInitial.filter(el => el.taskName !== task)]})

        } else if (name === "work") {
            DONE_WORK_TASKS_ARRAY = [...DONE_WORK_TASKS_ARRAY,
                ...this.state.workDataInitial.filter(el => el.taskName === task)];

            INITIAL_STATE = {...INITIAL_STATE,
                workDataInitial: [...DONE_WORK_TASKS_ARRAY]}

            this.setState({...this.state, workDataInitial:[
                    ...this.state.workDataInitial.filter(el => el.taskName !== task)]})

        } else {
            DONE_GROWTH_TASKS_ARRAY = [...DONE_GROWTH_TASKS_ARRAY,
                ...this.state.growthDataInitial.filter(el => el.taskName === task)];

            INITIAL_STATE = {...INITIAL_STATE,
                growthDataInitial: [...DONE_GROWTH_TASKS_ARRAY]}
            this.setState({...this.state, growthDataInitial:[
                    ...this.state.growthDataInitial.filter(el => el.taskName !== task)]})
        }

    }

    componentDidMount() {
        INITIAL_STATE = {
            ...INITIAL_STATE,
            personalDataInitial: [...this.state.personalDataInitial],
            workDataInitial: [...this.state.workDataInitial],
            growthDataInitial: [...this.state.growthDataInitial]
        }
        this.setState({...INITIAL_STATE})
    }

    // componentWillUnmount() {
    //     INITIAL_STATE = {...INITIAL_STATE,
    //         personalDataInitial: [...this.state.personalDataInitial],
    //         workDataInitial: [...this.state.workDataInitial],
    //         growthDataInitial: [...this.state.growthDataInitial]
    //     }
    //     this.setState({...INITIAL_STATE })
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
            urgency === 0

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

            <div>
                <ul> Your {`${this.props.tab}`} tasks list:
                    {tasksArray
                        .sort((a,b) => (
                        (+b.priority*1.25) + +b.formality + +b.urgency ) -
                        ((+a.priority*1.25) + +a.formality + +a.urgency))
                        .map((el, index) => (
                        <li key={index}>
                        Task: {el.taskName}, Priority: {el.priority},
                        Formality: {el.formality}, Urgency: {el.urgency},
                        Priority rating:
                        {(+el.priority*1.25) + +el.formality + +el.urgency}
                        <DeleteTaskButton name={this.props.tab} id={el.taskName} onClick={this.handleDeleteTask} />
                        <DoneTaskButton  name={this.props.tab} id={el.taskName} onClick={this.handleDoneTask}/>
                        </li>
                        ))
                    }
                </ul>

                <h2>Add your {`${this.props.tab}`} task </h2>
                <form onSubmit={this.onSubmit} name={this.props.tab}>
                    <input
                        name="taskName"
                        value={taskName}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Enter task name"
                    />
                    <input
                        name="priority"
                        value={priority}
                        onChange={this.onChange}
                        type="number"
                        min="1"
                        max="3"
                        placeholder="Set priority from 1 - 3"
                    />
                    <input
                        name="formality"
                        value={formality}
                        onChange={this.onChange}
                        type="number"
                        min="1"
                        max="3"
                        placeholder="Set formality from 1 - 3"
                    />

                    <input
                        name="urgency"
                        value={urgency}
                        onChange={this.onChange}
                        type="number"
                        min="1"
                        max="3"
                        placeholder="Set urgency from 1 - 3"
                    />
                    <button name={this.props.tab} disabled={isInvalid} type="submit">Add task</button>
                </form>
            </div>
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
            personalTasksDone: [...DONE_PERSONAL_TASKS_ARRAY],
            workTasksDone: [...DONE_WORK_TASKS_ARRAY],
            growthTasksDone: [...DONE_GROWTH_TASKS_ARRAY],
            // personalTasksDeleted: [...DELETED_PERSONAL_TASKS_ARRAY],
            // workTasksDeleted: [...DELETED_WORK_TASKS_ARRAY],
            // growthTasksDeleted: [...DELETED_GROWTH_TASKS_ARRAY]
        };
    }

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

const DeleteTaskButton = (props) => <button name={props.name} id={props.id} type="button" onClick={props.onClick}>Delete</button>

const DoneTaskButton = (props) => <button name={props.name} id={props.id}  type="button" onClick={props.onClick}>Done</button>

const PrioritiesNavigation = () => (
    <div>
        <p>Choose category:</p>
        <ul>
            <li>
                <Link to={ROUTES.PRIORITIES_PERSONAL}>Personal</Link>
            </li>
            <li>
                <Link to={ROUTES.PRIORITIES_WORK}>Work</Link>
            </li>
            <li>
                <Link to={ROUTES.PRIORITIES_GROWTH}>Growth</Link>
            </li>
            <li>
                <Link to={ROUTES.PRIORITIES_SUMMARY}>Summary</Link>
            </li>
        </ul>
    </div>
)


const condition = authUser => !!authUser;

export default withAuthorization(condition)(PrioritiesPage);

const AddTaskPersonalFirebase = withAuthorization(condition)(AddTaskPersonal);
const AddTaskWorkFirebase = withAuthorization(condition)(AddTaskWork);
const AddTaskGrowthFirebase = withAuthorization(condition)(AddTaskGrowth);
const TasksSummaryFirebase = withAuthorization(condition)(TasksSummary);
;

export {
    DeleteTaskButton,
    DoneTaskButton,
    PrioritiesNavigation,
    AddTask,
    AddTaskPersonalFirebase,
    AddTaskGrowthFirebase,
    AddTaskWorkFirebase,
    TasksSummaryFirebase }

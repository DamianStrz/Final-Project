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
        // const name = e.target.name;
        //
        //
        // if (name === "personal") {
        //     this.setState({ ...INITIAL_STATE_PERSONAL, data: [...this.state.data, {
        //             "taskName": taskName,
        //             "priority": priority,
        //             "formality": formality,
        //             "urgency": urgency
        //         }]}
        //     );
        // } else if (name === "work") {
        //     this.setState({ ...INITIAL_STATE_WORK, data: [...this.state.data, {
        //             "taskName": taskName,
        //             "priority": priority,
        //             "formality": formality,
        //             "urgency": urgency
        //         }]}
        //     );
        // } else {
        //     this.setState({ ...INITIAL_STATE_GROWTH, data: [...this.state.data, {
        //             "taskName": taskName,
        //             "priority": priority,
        //             "formality": formality,
        //             "urgency": urgency
        //         }]}
        //     );
        // }

        this.setState({ ...INITIAL_STATE, data: [...this.state.data, {
            "taskName": taskName,
            "priority": priority,
            "formality": formality,
            "urgency": urgency
            }]}
        );


        e.preventDefault();
    };

    handleDeleteTask = (e) => {
        const task = e.target.id;
        const name = e.target.name;


        if (name === "personal") {
            DELETED_PERSONAL_TASKS_ARRAY = [...DELETED_PERSONAL_TASKS_ARRAY,
                ...this.state.data.filter(el => el.taskName !== task)];


            this.setState({...this.state, data:[
                    ...DELETED_PERSONAL_TASKS_ARRAY]});
                    // ...this.state.data.filter(el => el.taskName !== task)]})
        } else if (name === "work") {
            DELETED_WORK_TASKS_ARRAY = [...DELETED_WORK_TASKS_ARRAY,
                ...this.state.data.filter(el => el.taskName !== task)];

            this.setState({...this.state, data:[
                    ...DELETED_WORK_TASKS_ARRAY]});
                    // ...this.state.data.filter(el => el.taskName !== task)]})
        } else {
            DELETED_GROWTH_TASKS_ARRAY = [...DELETED_GROWTH_TASKS_ARRAY,
                ...this.state.data.filter(el => el.taskName !== task)];

            this.setState({...this.state, data:[
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
            DONE_PERSONAL_TASKS_ARRAY = [...DONE_PERSONAL_TASKS_ARRAY, ...this.state.data.filter(el => el.taskName === task)];
            this.setState({...this.state, data:[
                    ...this.state.data.filter(el => el.taskName !== task)]})
        } else if (name === "work") {
            DONE_WORK_TASKS_ARRAY = [...DONE_WORK_TASKS_ARRAY, ...this.state.data.filter(el => el.taskName === task)];
            this.setState({...this.state, data:[
                    ...this.state.data.filter(el => el.taskName !== task)]})
        } else {
            DONE_GROWTH_TASKS_ARRAY = [...DONE_GROWTH_TASKS_ARRAY, ...this.state.data.filter(el => el.taskName === task)];
            this.setState({...this.state, data:[
                    ...this.state.data.filter(el => el.taskName !== task)]})
        }

    }


    render() {
        const { taskName, priority, formality, urgency } = this.state;
        const isInvalid =
            taskName === "" ||
            priority === 0 ||
            formality === 0 ||
            urgency === 0


        return(
            <div>
                <h2>Add your task </h2>
                <ul> Your tasks list:
                    {this.state.data
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
                    ))}
                </ul>


                <form onSubmit={this.onSubmit}>
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
            personalTasksDeleted: [...DELETED_PERSONAL_TASKS_ARRAY],
            workTasksDeleted: [...DELETED_WORK_TASKS_ARRAY],
            growthTasksDeleted: [...DELETED_GROWTH_TASKS_ARRAY]
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
        <p>Choose priorities tab:</p>
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

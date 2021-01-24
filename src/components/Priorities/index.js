import React, { Component } from "react";
import {Link} from "react-router-dom";

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

const INITIAL_STATE = {
    taskName: "",
    priority: 0,
    formality: 0,
    urgency: 0,
    data: [],
}

export let DONE_TASK_ARRAY = [];

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

    }

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]:value });

    };

    onSubmit = (e) => {
        const { taskName, priority, formality, urgency} = this.state;
        this.setState({ ...INITIAL_STATE, data: [...this.state.data, {
            "taskName": taskName,
            "priority": priority,
            "formality": formality,
            "urgency": urgency
            }] }
            );

        e.preventDefault();
    };

    handleDeleteTask = (e) => {
        const task = e.target.id;
        // console.log(this.state.data.filter(el => el.taskName !== task));
        this.setState({...this.state, data:[
          ...this.state.data.filter(el => el.taskName !== task)]})

    }

    handleDoneTask = (e) => {
        const task = e.target.id;
        DONE_TASK_ARRAY = [...this.state.data.filter(el => el.taskName === task)];
        console.log(DONE_TASK_ARRAY);
        this.setState({...this.state, data:[
                ...this.state.data.filter(el => el.taskName !== task)]})
    }

    render() {
        const { taskName, priority, formality, urgency } = this.state;
        // console.log(this.state);
        const isInvalid =
            taskName === "" ||
            priority === 0 ||
            formality === 0 ||
            urgency === 0

        return(
            <div>
                <h2>Add your task</h2>
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
                            <DeleteTaskButton id={el.taskName} onClick={this.handleDeleteTask} />
                            <DoneTaskButton id={el.taskName} onClick={this.handleDoneTask}/>
                        </li>
                    ))}
                </ul>

                <ul>
                    Done tasks list:
                    {DONE_TASK_ARRAY
                        .sort((a,b) => (
                            (+b.priority*1.25) + +b.formality + +b.urgency ) -
                            ((+a.priority*1.25) + +a.formality + +a.urgency))
                        .map((el, index) => (
                            <li key={index}>
                                Task: {el.taskName}, Priority: {el.priority},
                                Formality: {el.formality}, Urgency: {el.urgency},
                                Priority rating:
                                {(+el.priority*1.25) + +el.formality + +el.urgency}}
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
                    <button disabled={isInvalid} type="submit">Add task</button>
                </form>
            </div>
        )
    }
}

class AddTaskPersonal extends Component {

    render() {
        return <AddTask/>
    }
}

class AddTaskWork extends Component {

    render() {
        return <AddTask/>
    }
}

class AddTaskGrowth extends Component {

    render() {
        return <AddTask/>
    }
}

class TasksSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {...DONE_TASK_ARRAY};
    }

    render() {
        return (
            <div>
                <h1>Personal Summary</h1>
                <h2>Tasks done: </h2><p>{this.state.length}</p>
            </div>
        )
    }
}

const DeleteTaskButton = (props) => <button id={props.id} type="button" onClick={props.onClick}>Delete</button>

const DoneTaskButton = (props) => <button id={props.id}  type="button" onClick={props.onClick}>Done</button>

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

export {
    DeleteTaskButton,
    DoneTaskButton,
    PrioritiesNavigation,
    AddTask,
    AddTaskPersonal,
    AddTaskGrowth,
    AddTaskWork,
    TasksSummary };

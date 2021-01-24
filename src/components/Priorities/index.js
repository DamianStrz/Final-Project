import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withAuthorization } from "../Session"

const PrioritiesPage = () => (
    <div>
        <h1>See your priorities</h1>
        <p>Access only for signed in user</p>
        <PrioritiesNavigation/>
        <AddTask/>
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
        console.log(this.state.data.filter(el => el.taskName === task));
        DONE_TASK_ARRAY = this.state.data.filter(el => el.taskName === task);
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

const DeleteTaskButton = (props) => <button id={props.id} type="button" onClick={props.onClick}>Delete</button>

const DoneTaskButton = (props) => <button id={props.id}  type="button" onClick={props.onClick}>Done</button>

const PrioritiesNavigation = () => (
    <ul>
        <li>
            <Link>Personal</Link>
        </li>
        <li>
            <Link>Work</Link>
        </li>
        <li>
            <Link>Growth</Link>
        </li>
        <li>
            <Link>Summary</Link>
        </li>
    </ul>
)


const condition = authUser => !!authUser;

export default withAuthorization(condition)(PrioritiesPage);

export { DeleteTaskButton, DoneTaskButton };

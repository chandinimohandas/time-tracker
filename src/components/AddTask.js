import React, { useState, useReducer, useRef } from 'react';
import { InputText, TagsInput, ActionButton } from './Components';
import Stopwatch from './Stopwatch';

export default function AddTask({ tagList, taskTime, title, isList, deleteTask, taskList, setTaskList }) {
    const [taskTitle, setTaskTitle] = useState(title);
    const [tags, setTags] = useState(tagList);
    const [error, setError] = useState(false);
    const [{ running, lapse }, setState] = useReducer(reducer, { running: false, lapse: taskTime });
    const intervalRef = useRef(null)

    const addTask = (event) => {
        if (taskTitle.trim()) {
            setTaskList([...taskList, { key: Date.now(), title: taskTitle, tags: tags, time: lapse }]);
            console.log([...taskList, { key: Date.now(), title: taskTitle, tags: tags, time: lapse }]);
            setTaskTitle('');
            setTags([]);
            setState({ lapse: 0, running: false });
            clearInterval(intervalRef.current)
        } else {
            setError(true)
        }
    }

    function reducer(currentState, newState) {
        return { ...currentState, ...newState }
    }

    return (
        <div className="card-container">
            <InputText value={taskTitle} setValue={setTaskTitle} error={error} setError={setError} errorText={'Task title is required'} />
            <TagsInput selectedTags={setTags} tags={tags} />
            <Stopwatch running={running} lapse={lapse} setState={setState} intervalRef={intervalRef} />
            <ActionButton text={isList ? 'Delete Task' : 'Add Task'} onButtonClick={deleteTask ? deleteTask : addTask} />
        </div>
    );
};

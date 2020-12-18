import React, { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';

function App() {
  const [taskList, setTaskList] = useState([]);

  const deleteTask = (key) => {
    setTaskList(taskList.filter(task => task.key !== key))
  }

  return (
    <div className="App">
      <AddTask tagList={[]} taskTime={0} title={''} isList={false} taskList={taskList} setTaskList={setTaskList} />
      <p>Task list: </p>
      {taskList && taskList.map(task => {
        return <AddTask key={task.key} tagList={task.tags} taskTime={task.time} title={task.title} isList={true} deleteTask={() => deleteTask(task.key)} />
      })}
    </div>
  );
}

export default App;

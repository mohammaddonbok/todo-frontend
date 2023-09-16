import React, { useState } from 'react'
import  axios  from 'axios';

function ToDoListForm(props) {
    const [taskData, setTaskData] = useState({
        title:'',
        description:'',
        state: 'To Do'
    });

    function submit(e){
        e.preventDefault();
        axios.post(`http://localhost:5000/api/task`,{
            title: taskData.title,
            description:taskData.description,
            state:taskData.state
        })
        .then(props.setRequestData(new Date()))
        .then(() =>{
            setTaskData({
                title:'',
                description:'',
                state: 'To Do'
            })
        })
    }
    function handle(e){
        const newTask = {...taskData}
        newTask[e.target.id]= e.target.value
        setTaskData(newTask)
    }
  return (
    <form className='ToDoListForm' onSubmit={(e)=> submit(e)} >
        
        <input onChange={(e)=>handle(e)} id='title' value={taskData.title} type='text' placeholder="Task title" className='todo-input'/> 
        <input onChange={(e)=>handle(e)} id='description' value={taskData.description} type='text' placeholder="Task Description" className='todo-input' /> 
        <button id='add-task' type='submit' className='todo-btn'>Add Task</button>
    </form>
  )
}

export default ToDoListForm
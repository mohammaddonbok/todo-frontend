import React, { useEffect, useState } from 'react'
import ToDoListForm from './ToDoListForm'
import Todo from './Todo'
import Paginations from './Paginations'
export const ToDoWrapper = () => {

   const [todos, setTodos]= useState([])
   const [requestData, setRequestData] = useState(new Date())
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage, setPostsPerPage] = useState(5);
    useEffect(()=>{
      async function getData() {
        const response = await fetch(`http://localhost:5000/api/task`,{
          method:'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setTodos([...data])
        console.log(todos)
      }
      getData();
      },[requestData])

      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      const currentToDos = todos.slice(firstPostIndex, lastPostIndex)
  return (
    <div className='ToDoWrapper'>
        <ToDoListForm setRequestData={setRequestData}/> 
        {
          currentToDos.map((todo, index)=>(
             <Todo  task={todo} key={index} setRequestData={setRequestData}/>
          ))
        }
        <Paginations totalPosts={todos.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
    </div>
    )
}

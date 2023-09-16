import React ,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
function Todo(props) {
    const [open, setOpen] = useState(false);
    const[openDetails, setOpenDetails] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title:'',
        description:'',
        state: 'To Do'
    });

    function handleClickOpen(){
        setUpdatedTask({
            title: props.task.title,
            description: props.task.description,
            state:props.task.state
        })
        setOpen(true);
      };

      function handleClose() {
        setOpen(false);
      };

      function handleDetailsOpen(){
        setOpenDetails(true);
      }

      function handleDetailsClose() {
        setOpenDetails(false);
      };
      function handleUpdate(e){
        e.preventDefault();
        axios.put(`http://localhost:5000/api/task/${props.task._id}`,{
            title: updatedTask.title,
            description:updatedTask.description,
            state:updatedTask.state
        })
        .then(()=>{
            props.setRequestData(new Date());
        })
        .then(handleClose())
      }

    function deleteTask(e, id) {
        e.preventDefault();
        axios.delete(`http://localhost:5000/api/task/${id}`)
        .then(()=>{
            props.setRequestData(new Date());
        })
        .catch(err => console.log(err))
    }


  return (
    <div className='Todo'>
    <p>{props.task.title}</p>
    <div name="list">
        <FontAwesomeIcon icon={faEye} onClick={()=>handleDetailsOpen()}/>
        <FontAwesomeIcon icon={faPenToSquare} className='fa-pen' name="edit" onClick={()=>handleClickOpen()}/>
        <FontAwesomeIcon icon={faTrash} onClick={(e)=> deleteTask(e,props.task._id)}/>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle >Update Task</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            id="updateTitle"
            label="Task Title"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTask.title}
            onChange={(e)=>{
                setUpdatedTask({...updatedTask,title:e.target.value})
            }}
          />
          <TextField
            margin="dense"
            id="updateDescription"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTask.description}
            onChange={(e)=>{
                setUpdatedTask({...updatedTask,description:e.target.value})
            }}
          />
          <div className='state-btn'>
          <Button variant="contained" color='info' 
          disabled ={updatedTask.state === "toDo" ? true : false}
          onClick={()=> setUpdatedTask({...updatedTask,state:"toDo"})}
          >To Do</Button>
          <Button variant="contained"
            name="inProgress"
           disabled ={updatedTask.state === "inProgress" ? true : false}
           onClick={()=> setUpdatedTask({...updatedTask,state:"inProgress"})}
          >In Progress</Button>
          <Button variant="contained" 
          disabled ={updatedTask.state === "done" ? true : false}
          onClick={()=> setUpdatedTask({...updatedTask,state:"done"})}
          >Done</Button>
          </div>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose}>Cancel</Button>
          <Button name="update" onClick={(e)=>handleUpdate(e)}>Update</Button>
        </DialogActions>
      </Dialog>
      <div>
    <Dialog
        open={openDetails}
        keepMounted
        onClose={handleDetailsClose}
      >
        <DialogTitle>Task Title: {props.task.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Task Description: <br/>
            {props.task.description}
          </DialogContentText>
          <div className='status'>
             Status: {props.task.state}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
</div> 
 )
}

export default Todo

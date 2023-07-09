
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useState } from 'react';
import { TokenContext } from '../context';

export default function Update(props) {

    const{token} = useContext(TokenContext)

    const [open , setOpen] = useState(false)
    const [taskForm,setTaskForm] = useState({
        title:'',
        description:""
    })


    

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      function handleChange (e){
       const{value, name} = e.target
       setTaskForm((prevalue)=>{
        return{
            ...prevalue,
            [name]:value
        }
       })
      }

     async function handleSubmit(e){
        console.log(token)
        
        e.preventDefault()
       await fetch(`http://localhost:8000/task/${props.id}`,{
        method:"PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+token
              }
        ,body:JSON.stringify(taskForm)
       }) .then((res)=>{
        console.log(res)
       }).catch((err)=>{
        console.log(err)
       })
       setTaskForm({
        title:"",
        description:""
       })

       setOpen(false);
      }

      return (
        <div>
          <Button variant='contained'  color='warning' size="medium" onClick={handleClickOpen}>
            Update
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="description"
                label="title"
                type="text"
                fullWidth
                variant="standard"
                name='title'
                value={taskForm.title}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="description"
                type="text"
                fullWidth
                variant="standard"
                name='description'
                value={taskForm.description}
                onChange={handleChange}
              />
          
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button value={props.id} onClick={handleSubmit} >confirm</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }


"use client"
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { TokenContext } from "@/app/context";
import { useRouter } from "next/navigation";



  export default function Create() {

    let {push} = useRouter()

    const {token} = useContext(TokenContext)

    const [form, setForm] = useState({
        title:"",
        description:""
    })

    const actions = [
        { id: "title", name: 'title', value:form.title, autoComplete:"Title",label:"Title" },
        { id: "desc", name: 'description', value:form.description, autoComplete:"description",label:"description" },
      ];

      function handleChange (e){
        const { value , name }= e.target
       setForm((prevalue)=>(   {...prevalue,
        [name]:value
    })
    )}

   async function handleSubmit (e) {
        e.preventDefault();
       return await fetch("http://localhost:8000/task",{
        method:"POST",
            headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '+token
                  },
            body:JSON.stringify(form)
            
        }).then((res)=>{
            if(res.status === 201){
                push("./")
            }
        })

    }

    return(
        <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }} 
      >


             <Typography component="h1" variant="h5">
            Add Task
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, }} >
  {actions.map((action) => (
    <TextField
margin="normal"
required
fullWidth
id={action.id}
label={action.label}
name={action.name}
autoComplete={action.autoComplete}
value={action.value}
onChange={handleChange}
autoFocus
/>
))}
<Button
              type="submit"
              variant="contained"
              sx={{width:"50%", mt: 3, mb: 2, }}
            >
    Add Task
</Button>
</Box>
</Box>
)
  }

"use client";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { TokenContext } from './context';



export default function SignIn() {
  const { setToken } = useContext(TokenContext);

  let {push} = useRouter()

  const [form,setform] = useState({
    email:"",
    password:""
  })

  function handleChange(e){
    const{value,name} = e.target
    setform((prevalue)=>{
      return{
      ...prevalue,
      [name]:value
       }
    })
  }

  const handleSubmit = async (event) => { 
    event.preventDefault();
    let data = await fetch("http://localhost:8000/auth/signin",{
      headers: {
        "Content-Type": "application/json",
      },
    method:"POST",
    body:JSON.stringify(form)
   })

   let content = await data.json()
   setToken(content.access_token)
    await fetch("http://localhost:8000/auth/signin",{
      headers: {
        "Content-Type": "application/json",
      },
    method:"POST",
    body:JSON.stringify(form)
   }).then(function (response) {
      if(response.status === 201){
       toast.success('Done', {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         });

         setTimeout(()=> {
           push("/task")
         }, 500);
         
         setTimeout()

      } 
      else if(response.status === 403){
       toast.error('Wrong password', {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         });
      }

   }).catch(function (error) {
     console.log({error:error})
   });

//    return setToken( await fetch("http://localhost:8000/auth/signin",{
//     headers: {
//       "Content-Type": "application/json",
//     },
//   method:"POST",
//   body:JSON.stringify(form)
//  }))
  };

  return (
    
      <Container component="main" maxWidth="xs">
           <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
           />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
      
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {" Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

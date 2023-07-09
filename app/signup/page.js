
"use client";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import {  useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







export default function SignUp() {
  const{push}=useRouter()

  const [form,setform] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  function handleChange (e){
   const {name, value}=e.target
   setform((prevValue)=>{
     return{
    ...prevValue,
    [name]:value
     }
   })
  } 

  const handleSubmit = async (event) => {
    event.preventDefault();
      await fetch("http://localhost:8000/auth/signup",{
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
            push("/")
          }, 500);
          
          setTimeout()
        
       } 
       else if(response.status === 403){
        toast.error('Email is already used', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });;
       }

    }).catch(function (error) {
      console.log({error:error})
    });
    setform({   
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
    
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
          <Grid item lg={6}>
          <TextField
              margin="normal"
              fullWidth
              id="first_name"
              label="First Name"
              name="firstName"
              value={form.firstName}
              autoComplete="first_name"
              onChange={handleChange}
            />
            </Grid>
            <Grid item lg={6}>
             <TextField
              margin="normal"
              fullWidth
              id="last_name"
              label="Last Name"
              name="lastName"
              value={form.lastName}
              autoComplete="last_name"
              onChange={handleChange}
            />
            </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={form.email}
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={form.password}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {" Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

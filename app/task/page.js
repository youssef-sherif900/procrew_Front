
"use client";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { TokenContext } from '../context';
import { Card, CardContent, Container, Grid, SpeedDial, SpeedDialIcon } from '@mui/material';
import {  useRouter } from 'next/navigation'
import Link from 'next/link';
import CardTasks from './card';






const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function SearchAppBar() {

const {token} = useContext(TokenContext)

const [tasks ,setTasks] = useState([])

let {push} = useRouter()

useEffect(()=>{
  async function getTasks (){
  const data = await fetch("http://localhost:8000/task",{
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+token
    }
  })
  let content = await data.json()
  setTasks(content)
}
 getTasks()
},[handleDelete,handleEnter])


async function handleDelete (e){
  const id = e.target.value
  await fetch(`http://localhost:8000/task/${id}`,{
    method:"DELETE",
    headers:
    {
        "Content-Type": "application/json",
        'Authorization': 'Bearer '+token
      },
  })
}

const [search , setSearch] = useState("")
const [ listOfSearch , setListOfSearch]= useState([])

function handleChange(e){
  e.preventDefault()
const{value}= e.target
setSearch(value)
}

async function handleEnter (e){
  if(e.key === "Enter"){
    const data = await fetch(`http://localhost:8000/task?title=${search}`,{
      method:"GET",
      headers:
      {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+token
        },
    })

    let content = await data.json()
    setListOfSearch(content)
    setSearch("")
  }
   
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            AppBar  
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              onKeyDown={handleEnter}
              
            />
          </Search>
        </Toolbar>
      </AppBar>
       <Container>
       <h1 className={'mt-12'}>
        Tasks
      </h1>
      <Box sx={{width:"75%"}}>
      <Grid container spacing={3} >


      {Array.isArray(tasks)? tasks.map((task)=>{ return (
        <Grid item xs={4}>
       <CardTasks
        title = {task.title}
        description = {task.description}
         id={task.id}
        handleDelete={handleDelete}
         />
    </Grid>


      )}): tasks.length === 0
       ?
      <Alert severity="info"> you are free of tasks right now !</Alert>
      :
      null
      }
      </Grid>




      { <>
      <h3 style={{marginTop:"10%"}}>
        Search Results
      </h3>
      {listOfSearch.map((item)=>{
        return(
          <Card sx={{ minWidth: 100 , ml: 10 }}>
          <CardContent>
          <Typography variant="h5" component="div">
         { item.title}
      </Typography>
      <Typography variant="body2">
         {item.description}
      </Typography>
          </CardContent>
          </Card>
        )
      })}
    </>}

       
      </Box>
      </Container>

    <Box sx={{ height: 240, transform: 'translateZ(0px)', flexGrow: 1, }}>
      <Link href="/task/create">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      />
        </Link>
      </Box>  



    </Box>
  );
}

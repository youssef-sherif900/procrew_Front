
import { Button, Card, CardActions, CardContent, Container, Grid, SpeedDial, SpeedDialIcon, TextField, Typography } from '@mui/material';
import Update from './updateForm';


export default function CardTasks (props){
    return(
    <Card sx={{ minWidth: 100 }}>
    <CardContent>
    <Typography variant="h5" component="div">
        {props.title}
      </Typography>
      <Typography variant="body2">
         {props.description}
      </Typography>
    </CardContent>
    <CardActions>
    <Grid container spacing={0} >
      <Grid item xs={6} width={"100%"} >
      <Update id={props.id} />
      </Grid>
      <Grid item xs={6} >
      <Button size="medium" variant='contained' value={props.id} color='error' onClick={props.handleDelete}>
         Delete
      </Button>
      </Grid>       
    </Grid>
    </CardActions>
  </Card>
    )
}
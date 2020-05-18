import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import {Button,Grid,Typography,Divider,Card,CardContent,CardActions,withStyles,Paper} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const empId = "9100427531";

const styles = theme => ({
  main: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit*2,
    minWidth: 260,
  },
  pos: {
    marginTop: 12,
  },
  card: {
    minWidth: 280,
    margin: theme.spacing.unit * 1,
    padding: theme.spacing.unit ,
    color: theme.palette.text.primary,
  },
  someDivision:{
    textAlign: 'center'
  },
  btn: {
    margin: theme.spacing.unit*2
}
});


const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}




class LeaveHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaves: [],
      submitted:false,
    }
  }

  componentDidMount() {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
  Axios.get(`http://localhost:8080/employee/leaveHistory?empId=${empId}`,{headers:headers})
    .then((response) => {
      this.setState({leaves:response.data.array})
    })
    .catch((error)=>{
      if (error.response) {
        console.log(error.response.data.message);
        console.log(error.response.status);
    }
    });
 }


  render() {  
    const { classes } = this.props;
    if(this.state.submitted){
        return <Redirect to='/home'/>
    }
    return (
      <div className={classes.main}>
      <Paper>
        <Button onClick = {() => {this.setState({submitted:true})}} className={classes.btn}>
            <ArrowBackIosIcon />Go Back
        </Button>
      <Divider/>
      <Grid container spacing={32} justify='center'>
        {
           this.state.leaves.map((leave, index) => (
            <Grid item xs={12} sm={6} md={5} lg={4} key ={index}>
            <Card className={classes.card} elevation={6}>
              <CardContent>
                <Typography variant="h6" component="h2">
                    Employee Id : {leave.empId}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                  Applied On
                </Typography>
                <Typography color='primary'>
                {leave.appliedOn}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                  Leave Type
                </Typography>
                <Typography component="p">
                  {leave.type == 'sick' ? "Sick Leave" : "Casual Leave"}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                  Number of Days
                </Typography>
                <Typography component="p">
                  {leave.days}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Leave On
                </Typography>
                <Typography color="primary">
                  {leave.date}
                </Typography>

                <Typography className={classes.pos} color="secondary">
                   Status : {leave.status}
                </Typography>
              </CardContent>
            </Card>
            </Grid>
            
          ))
        }
        </Grid>
      
        </Paper>
      </div>
    )
  }
}



export default withStyles(styles)(((LeaveHistory)));
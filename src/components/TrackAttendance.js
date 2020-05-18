import React from "react";
import Axios from "axios";
import Divider from '@material-ui/core/Divider';
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';



const empId = localStorage.getItem('empId');
const username = localStorage.getItem('name');

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
})
class TrackAttendance extends React.Component {
    constructor(props){
        super(props);
        this.state={
            submitted:false,
            totalPresent:'',
            leavesLeft:'',
            todaysStatus:'',

        }
    }
    componentDidMount(){
        const empId = localStorage.getItem('empId');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
          
        Axios.get(`http://localhost:8080/employee/trackAttendance?&empId=${empId}`,{headers:headers})
        .then(ok => {
            var lastSubmitted = ok.data.array[0].lastSubmitted;
            var date = new Date();
            var today = date.getDate()
            if(today === lastSubmitted){
                var todaysStatus = "Present";
            }
            else{
                var todaysStatus = "Absent"
            }
            this.setState({totalPresent : ok.data.array[0].totalPresent, leavesLeft : ok.data.array[0].leavesLeft,todaysStatus})
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        const { classes } = this.props;
        if (this.state.submitted) {
            return <Redirect to="/home" />
        }
        
        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper} elevation={8}>
                    
                    <Typography color='primary' component="h1" gutterBottom={true} variant="h5">
                        Attendance Status
                    </Typography>
                    <Divider light={true}/>
                    <Typography variant="h6" gutterBottom={true}>
                        Employee Name :  {username.toUpperCase()}
                    </Typography>
                    <Typography variant="h6" gutterBottom={true}>
                        Employee ID : {empId}
                    </Typography>
                    <Typography variant="h6" gutterBottom={true}>
                        Total Days Present : {this.state.totalPresent}
                    </Typography>
                    <Typography variant="h6" gutterBottom={true}>
                        Leaves Left : {this.state.leavesLeft}
                    </Typography>
                    <Typography variant="h6" gutterBottom={true}>
                        Todays Status : {this.state.todaysStatus.toUpperCase()}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick = {() =>{ this.setState({submitted:true})}}
                    >
                        Go Back
                    </Button>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)((TrackAttendance));
import React from 'react';
import { withStyles, Typography, Paper, Button, Divider, TextField, Select, Input, MenuItem, FormControl, InputLabel, FormHelperText} from '@material-ui/core';
import BasicDatePicker from "../components/BasicDatePicker"
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ResultDialog from "../components/ResultDialog";
import {Redirect} from "react-router-dom"
import swal from 'sweetalert';
import { branch } from 'recompose';
import Axios from "axios";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

var empId = localStorage.getItem('empId');
var branchName = localStorage.getItem('branch');


const styles = theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: '94%',
        },
        maxWidth: 520,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 2*theme.spacing.unit,
        border: '1px solid #eaeaea',
        minHeight:'90px',
        borderRadius: theme.spacing.unit,
    },

    form: {
        marginRight: 2*theme.spacing.unit,
        marginLeft: 2*theme.spacing.unit,
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit, 
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom:theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    box: {
        paddingTop: theme.spacing.unit,
        paddingBottom :theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    btn: {
        margin: theme.spacing.unit*2
    }

});


class LeaveForm extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            open:false,
            message:"true",
            submitted:false,
            leaveType:'',
            date: '',
            appliedOn :'',
        }
    }
    convert = (str) => {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
      }
    handleDialogClose = ()=> {
        this.setState({ open: false,message:'true',submitted:true});
    }
    handleChange = event => {  
        console.log(event.target.value);
        this.setState({leaveType:event.target.value});
        
    };
    handleDateSelect = (e) =>{
        console.log(this.convert(e));
        this.setState({date:this.convert(e)});
    }
    handleLeaveSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.leaveType){
            swal({
                title: "Oops",
                text: "Leave Type should not be empty",
                icon: "warning"
            })
            return;
        }
        var empId = localStorage.getItem('empId');
        var branchName = localStorage.getItem('branch');
        var leaveObj = {
            empId,
            branchName,
            leaveType: this.state.leaveType,
            days: e.target.elements.days.value.trim(),
            date: this.state.date,
            
            reason: e.target.elements.reason.value.trim(),
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        Axios.post(`http://localhost:8080/employee/submitLeave`,{leaveObj},{headers:headers})
        .then((ok) => {

            if(ok.data.message === "success"){
                swal({
                    title: "Submitted",
                    icon: "success",
                    button: "Okay",
                }).then(() =>{
                    this.setState({submitted:true})
                })
            }
            else{
                swal({
                    title: "Leave Already Exsits",
                    icon: "success",
                    button: "Okay",
                }).then(() =>{
                    this.setState({submitted:true})
                })
            }
        }).catch((err) => {
            if (err.response) {
                swal("Oops!", err.response.data.message, "error");
                console.log(err.response.data.message);
                console.log(err.response.status);
            }
        })
    }
    render(){
        const { classes } = this.props;

        if(this.state.submitted){
            return <Redirect to='/home'/>
        }
        return (
            <Paper className={classes.root}>
               <Button onClick = {() => {this.setState({submitted:true})}} className={classes.btn}>
                    <ArrowBackIosIcon />Go Back
                </Button>
                <Divider/>
                <form className={classes.form} onSubmit={this.handleLeaveSubmit}>
                    <Typography color='secondary' component="h1" variant="h5">
                                    APPLY LEAVE
                    </Typography>
                    

                    <FormControl required className={classes.formControl}>
                        <InputLabel>
                            Leave Type
                        </InputLabel>
                        <Select
                            value={this.state.leaveType}
                            onChange={this.handleChange}
                            displayEmpty
                            name="type"
                            className={classes.selectEmpty}
                        >   
                            <MenuItem value='sick'>Sick Leave</MenuItem>
                            <MenuItem value='casual'>Casual Leave</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                    <div className = {classes.box} >
                        <TextField
                            placeholder="Number of Days"
                            variant= "outlined"
                            type="number"
                            label="Number of Days"
                            helperText ="Example: 1"
                            fullWidth
                            required
                            id="days"
                            
                        />
                    </div>
                    <div className={classes.box}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <BasicDatePicker handleDateSelect ={this.handleDateSelect}/>
                        </MuiPickersUtilsProvider>
                    </div>
        
                    <div className={classes.row}>
                        <TextField
                            id="reason"
                            fullWidth
                            label="Reason"
                            margin="normal"
                            multiline
                            variant="outlined"
                            placeholder="Reason"
                            rows='2'
                        />
                    </div>
                    <Button type="submit" className={classes.box}   variant="contained" color="primary" fullWidth>
                        Apply Leave
                    </Button>

                </form>
            </Paper>
        );
    
    }
}

export default withStyles(styles)(LeaveForm);
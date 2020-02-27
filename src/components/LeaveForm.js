import React from 'react';
import { withStyles, Typography, Paper, Button, Divider, TextField} from '@material-ui/core';
import BasicDatePicker from "../components/BasicDatePicker"
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ResultDialog from "../components/ResultDialog";
import {Redirect} from "react-router-dom"



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
        }
    }
    handleDialogClose = ()=> {
        this.setState({ open: false,message:'true',submitted:true});
    }
    handleLeaveSubmit = (e) =>{
        e.preventDefault();
        this.setState({open:true})
        setTimeout(()=>{
            this.setState({message:"Sucess"})
        },1000)
    }
    render(){
        const { classes } = this.props;
        if(this.state.submitted){
            return <Redirect to='/home'/>
        }
        return (
            <Paper className={classes.root}>
                <ResultDialog handleDialogClose={this.handleDialogClose} open={this.state.open}  message={this.state.message}/>
                <form className={classes.form} onSubmit={this.handleLeaveSubmit}>
                    <Typography color='secondary' component="h1" variant="h5">
                                    APPLY LEAVE
                    </Typography>
                    <Divider/>
                    <div className={classes.box}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <BasicDatePicker />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className={classes.row}>
                        <TextField 
                            placeholder="Subject"
                            variant="outlined"
                            fullWidth
                            required
                        />
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
                            rows='5'
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
import React from 'react';
import { withStyles, Typography, Paper, Button, Divider, TextField} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResultDialog from "../components/ResultDialog";
import { Redirect } from "react-router-dom";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';





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
    paper:{
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    info:{
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
        color:"#808080"
    },

    form: {
        marginRight: 2*theme.spacing.unit,
        marginLeft: 2*theme.spacing.unit,
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2, 
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


class AttendencePage extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            open:false,
            message:"true",
            submitted:false,
            condition_1:'',
            condition_2:'',
            condition_3:'',
            condition_4:'',

        }
    }
    componentDidMount(){
        setTimeout(() =>{
            this.setState({condition_1:true,condition_2:true,condition_3:true,condition_4:true});
        },2000);
    }

    handleDialogClose = ()=> {
        this.setState({ open: false,message:'true',submitted:true });
    }
    handleAttendenceSubmit = (e) =>{
        e.preventDefault();
        this.setState({open:true})
        setTimeout(()=>{
            this.setState({message:"Success"})

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
                <form className={classes.form} onSubmit ={this.handleAttendenceSubmit}>
                    <Typography color='secondary' component="h1" variant="h5">
                                    ATTENDENCE PAGE
                    </Typography>
                    <Divider/>
                    <div className ={classes.paper} >
                                <Typography variant="h6" color="primary">
                                    Please Wait
                                </Typography>
                    </div>

                    <Grid container spacing={1}>
                        <Grid item xs={9} sm={9}>
                            <div className ={classes.paper} >
                                <Typography>
                                    Checking if The location present inside the Geo-Fence 
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} sm={3}>
                        <div className ={classes.paper} >
                            <Typography>
                                {
                                    this.state.condition_1 === '' 
                                    ?
                                        (<CircularProgress/>)
                                    :
                                        this.state.condition_1 
                                        ?
                                            <CheckCircleRoundedIcon color="primary" fontSize="large"/>
                                        :
                                            <CancelRoundedIcon color="secondary" fontSize="large"/>

                                }
                                   
                            </Typography>
                        </div>
                        </Grid>
                    </Grid>
                <Divider light={true}/>
                <Grid container spacing={1}>
                        <Grid item xs={9} sm={9}>
                            <div className ={classes.paper} >
                                <Typography>
                                    Checking if Current Day is the Working day 
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} sm={3}>
                        <div className ={classes.paper} >
                            <Typography>
                            {
                                    this.state.condition_1 === '' 
                                    ?
                                        (<CircularProgress/>)
                                    :
                                        this.state.condition_2 
                                        ?
                                            <CheckCircleRoundedIcon color="primary" fontSize="large"/>
                                        :
                                            <CancelRoundedIcon color="secondary" fontSize="large"/>   

                            }
                            </Typography>
                        </div>
                        </Grid>
                </Grid>
                <Divider light={true}/>
                <Grid container spacing={1}>
                    <Grid item xs={9} sm={9}>
                        <div className ={classes.paper} >
                            <Typography>
                                Checking if The Time Constaints are Met
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={3} sm={3}>
                    <div className ={classes.paper} >
                        <Typography>
                        {
                            this.state.condition_1 === '' 
                            ?
                                (<CircularProgress/>)
                            :
                                this.state.condition_3
                                ?
                                    <CheckCircleRoundedIcon color="primary" fontSize="large"/>
                                :
                                    <CancelRoundedIcon color="secondary" fontSize="large"/>

                        }
                        </Typography>
                    </div>
                    </Grid>
                    </Grid>
                <Divider light={true}/>
                <Grid container spacing={1}>
                        <Grid item xs={9} sm={9}>
                            <div className ={classes.paper} >
                                <Typography>
                                    Checking if the attendence is not submitted
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} sm={3}>
                        <div className ={classes.paper} >
                            <Typography>
                            {
                                this.state.condition_1 === '' 
                                ?
                                    (<CircularProgress/>)
                                :
                                    this.state.condition_4
                                    ?
                                        <CheckCircleRoundedIcon color="primary" fontSize="large"/>
                                    :
                                        <CancelRoundedIcon color="secondary" fontSize="large"/>

                            }
                            </Typography>
                        </div>
                        </Grid>
                    </Grid>
                <Divider light={true}/>
                <Button type ="submit" variant='contained'  color="primary" disabled={!(this.state.condition_1 & this.state.condition_2 & this.state.condition_3 & this.state.condition_4)} className={classes.box}>
                    SUBMIT ATTENDENCE
                </Button>
                <Grid container spacing={1}>
                        <Grid item xs={2} sm={2}>
                            <div className ={classes.paper} >
                                <Typography>
                                    <HelpOutlineIcon fontSize ="large"/> 
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={10} sm={10}>
                        <div className ={classes.info} >
                            <Typography>
                                   If you feel that any of the above results are wrong. Please contact the administator.
                            </Typography>
                        </div>
                        </Grid>
                    </Grid>
                

                </form>
            </Paper>
        );
    
    }
}

export default withStyles(styles)(AttendencePage);
import React from 'react';
import { withStyles, Typography, Paper, Button, Divider} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {  Link } from 'react-router-dom';


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
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
        textAlign:'center',
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

    form: {
        marginRight: 2*theme.spacing.unit,
        marginLeft: 2*theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit, 
    },

    btn: {
        paddingTop: theme.spacing.unit*3,
        paddingBottom: theme.spacing.unit*3,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit*2,
    }

});

class HomePage extends React.Component
{
    constructor(props){
        super(props);
        this.state= {
            lat : "",
            lng : ""

        }
    }
    componentDidMount(){
        this.watchLocation();
    }

    watchLocation() {
        if ('geolocation' in navigator) {
          const geoOptions = {
            enableHighAccuracy: true,
            maximumAge : 30000,
            timeout : 27000
          };
    
          navigator.geolocation.getCurrentPosition(this.getLocation.bind(this), null, geoOptions);
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      }
      getLocation(position) {
        this.setState({
        
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        });
      }
    render(){
        const { classes } = this.props;
        
        
                
        return (
            <Paper className={classes.root}>
                <div className={classes.form}> 
                    <Typography color='secondary' component="h1" variant="h5">
                                Employee Home
                    </Typography>
                    <Divider light={true}/>
                    <Paper className={classes.paper} elevation={8} >
                        <Typography variant="h5" gutterBottom={true}>
                                SUBMIT ATTENDENCE
                        </Typography>
                        <Button component={Link} to={`/attendence?lat=${this.state.lat}&lng=${this.state.lng}`} variant='outlined'>
                            Click Here<NavigateNextIcon/>
                        </Button>
                    </Paper>
                    <Paper className={classes.paper} elevation={8} >
                        <Typography variant="h5" gutterBottom={true}>
                                APPLY LEAVE
                        </Typography>
                        
                    
                        <Button component ={Link} to={'/apply-leave'} variant='outlined'>
                            Click Here<NavigateNextIcon/>
                        </Button>
                    </Paper>
                    <Paper className={classes.paper} elevation={8} >
                        <Typography variant="h5" gutterBottom={true}>
                                LEAVE HISTORY
                        </Typography>
                        
                    
                        <Button component ={Link} to={'/leave-history'} variant='outlined'>
                            Click Here<NavigateNextIcon/>
                        </Button>
                    </Paper>
                    <Paper className={classes.paper} elevation={8} >
                        <Typography variant="h5" gutterBottom={true}>
                                TRACK ATTENDENCE
                        </Typography>
                        <Button component ={Link} to={'/track-attendance'} variant='outlined'>
                            Click Here<NavigateNextIcon/>
                        </Button>
                    </Paper>
                    
                </div>
            </Paper>
        );
    
    }
}

export default withStyles(styles)(HomePage);
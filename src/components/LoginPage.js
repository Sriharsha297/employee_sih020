import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import Divider from '@material-ui/core/Divider';
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import swal from "sweetalert";

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
        alignItems: 'center',
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
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.state = {
            isAuthorised: false,
            error:'',
           // open:true
        }
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        const empId = e.target.elements.username.value.trim();
        const password = e.target.elements.password.value.trim();
       
            const loginObj = {
                empId,
                password
            }
            Axios.post(`http://localhost:8080/employee/login`,loginObj)
                .then((response) => {
                    console.log(response.data)
                    localStorage.setItem('name',response.data.employee.name);
                    localStorage.setItem('empId',response.data.employee.empId);
                    localStorage.setItem('branch',response.data.employee.branch);
                    localStorage.setItem('token',response.data.token);
                    this.setState({isAuthorised:true})
                })
                .catch((error)=>{
                    console.log(error);
                    if (error.response.status == 400) {
                    swal("Invalid Credentials!","","error")
                    }
                });
                }
    render() {
        const { classes } = this.props;
        if (this.state.isAuthorised) {
            return <Redirect to="/home" />
        }
        if(!!localStorage.getItem('token')){
            return <Redirect to='/home'/>
        }
        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper} elevation={8}>
                    <form className={classes.form} onSubmit={this.handleLoginSubmit}>
                        <Typography color='primary' component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Divider light={true}/>

                        {
                            // show error if login fails
                            !!this.state.error ? <Typography variant="body1" color="error" align="center">
                                {this.state.error}
                            </Typography> : null
                        }
                        <TextField
                            label="Username"
                            className={classes.textField}
                            id="username"
                            placeholder="Enter Your PhoneNumber here"
                            type="text"
                            inputProps={{ minLength: 10 }}
                            margin="normal"
                            variant="outlined"
                            required={true}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            className={classes.textField}
                            type="password"
                            id="password"
                            fullWidth
                            inputProps={{ minLength: 2 }}
                            placeholder="Enter Your Password here"
                            margin="normal"
                            variant="outlined"
                            required={true}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </div>
        )
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)((LoginPage));

 
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { CircularProgress, Typography } from '@material-ui/core';

class ResultDialog extends React.Component {
  state = {
    fullWidth: true,
  };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    //const { fullScreen } = this.props;
    const {handleDialogClose,open,message} = this.props;
    console.log("why",message,"open",open);
    return (
        <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={'md'}
            open={open}
            onClose={this.handleDialogClose}
            aria-labelledby="responsive-dialog-title"
        >
          {
              message === 'true' ?
              <div align="center" >
                  <DialogTitle id="responsive-dialog-title">
                    <Typography variant ="h5">Submitting </Typography> <CircularProgress/>
                    </DialogTitle>
                </div>
              
                  :
                <div>
                    <DialogContent>
                        <DialogContentText>
                        {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary" autoFocus>
                        Close
                        </Button>
                    </DialogActions>
              </div>
          }

        </Dialog>

    );
  }
}

ResultDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResultDialog);
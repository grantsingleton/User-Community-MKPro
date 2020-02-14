import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

// for the modal popover
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { createComment } from '../../../Redux/Actions/commentActions'

const barColor = grey[900];
const titleColor = grey[200];
const cancelButtonColor = red[500];

const useStyles = makeStyles(theme => ({
  root: {
    flexWrap: 'wrap',
    paddingTop: 20,
    '& > *': {
      margin: theme.spacing(1),
      height: theme.spacing(6),
      textAlign: 'left',
    },
  },
  title: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  paper: {
    backgroundColor: barColor,
    margin: theme.spacing(1),
  },
  button: {
    color: titleColor,
    margin: '0px',
    padding: '0px',
    "&:hover": {
      textDecoration: 'underline',
    },
  },
  cancelButton: {
    color: cancelButtonColor,
  },
}));

function NewCommentButton( { forum_doc_id, genre_doc_id, topic_doc_id, createComment, auth } ) {

  // for opening and closing the modal new comment form 
  const [open, setOpen] = useState(false)

  // state items which make a comment
  const [comment, setComment] = useState('')

  const handleChange = (event) => {
      setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    // set state to pass into action creator
    const state = {
      comment: comment,
      forum_doc_id: forum_doc_id,
      genre_doc_id: genre_doc_id,
      topic_doc_id: topic_doc_id,
    }
    event.preventDefault()
    // call the action creator
    createComment(state)
    //clear the form fields
    setComment('')
    // close the modal view
    setOpen(false);
  }

  // methods for opening and closing modal view
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //clear the form fields
    setComment('')
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Fragment>
      {auth.isLoaded ? 
      <Fragment>
        <Button 
          size='small'
          className={classes.button}
          onClick={handleClickOpen}
          >
          Reply
        </Button>
        <div>
        <Dialog 
          open={open} 
          onClose={handleClose} 
          aria-labelledby="Comment dialog"
          fullWidth='true'
          maxWidth='sm'
          >
          <DialogTitle id="form-dialog-title">Reply</DialogTitle>
          <DialogContent>
            <TextField
              id="comment"
              label="Post"
              placeholder=""
              multiline
              fullWidth
              variant="outlined"
              rows="8"
              value={comment}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button 
              id='cancel'
              onClick={handleClose} 
              color="primary">
              Cancel
            </Button>
            <Button 
              id='submit'
              onClick={handleSubmit} 
              color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
    : null }
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (comment) => {dispatch(createComment(comment))}
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentButton)
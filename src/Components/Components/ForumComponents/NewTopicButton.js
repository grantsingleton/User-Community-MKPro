import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
import { createTopic } from '../../../Redux/Actions/topicActions'


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
  text: {
    maxWidth: '600px',
  },
  main: {
    margin: "8px",
    padding: "24px",   
  }
}));

function NewTopicButton( {forum_doc_id, genre_doc_id, createTopic, auth, profile} ) {

  // for opening and closing the modal new topic form 
  const [open, setOpen] = useState(false)

  // state items which make a topic
  const [topic, setTopic] = useState('')
  const [comment, setComment] = useState('')

  const handleChange = (event) => {
    if (event.target.id === 'topic') {
      setTopic(event.target.value)
    } else {
      setComment(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    // set state to pass into action creator
    const state = {
      topic: topic,
      comment: comment,
      author: profile.username,
      forum_doc_id: forum_doc_id,
      genre_doc_id: genre_doc_id
    }
    event.preventDefault()
    // call the action creator
    createTopic(state)
    //clear the form fields
    setTopic('')
    setComment('')
    // close the modal view
    setOpen(false);
  }


  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //clear the form fields
    setTopic('')
    setComment('')
    setOpen(false);
  };



  return (
    <Fragment>
      {auth.isLoaded ? 
        <Fragment>
        <Button 
          size='small'
          className={classes.button}
          onClick={handleClickOpen}
          >
          New Topic
        </Button>
        <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Topic</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write some guidance here for creating a new topic. 
            </DialogContentText>
            <form className={classes.main} noValidate autoComplete="off">
              <TextField 
                id="topic" 
                label="Topic" 
                variant="outlined" 
                fullWidth
                value={topic}
                onChange={handleChange}
                className={classes.text}
                />
              <TextField
                id="comment"
                label="Post"
                placeholder=""
                multiline
                fullWidth
                variant="outlined"
                rows="8"
                className={classes.text}
                value={comment}
                onChange={handleChange}
              />
            </form>
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
              Submit
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
    createTopic: (topic) => {dispatch(createTopic(topic))}
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTopicButton)
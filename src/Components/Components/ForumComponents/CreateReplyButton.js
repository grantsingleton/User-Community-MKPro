import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { createReply } from '../../../Redux/Actions/commentActions'
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
  },
  cancelButton: {
    color: cancelButtonColor,
  },
  iconSpace: {
    paddingRight: '20px',
  }
}));

function CreateReplyButton( { forum_doc_id, genre_doc_id, topic_doc_id, repliedToId, repliedToAuthorId, createReply, auth } ) {

  // for opening and closing the modal new comment form 
  const [open, setOpen] = useState(false)

  // state items which make a comment
  const [comment, setComment] = useState('')
  const [isQuoted, setIsQuoted] = useState(false)

  const handleChange = (event) => {
      setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    // set state to pass into action creator
    const state = {
      comment: comment,
      isQuoted: isQuoted,
      repliedToId: repliedToId,
      repliedToAuthorId: repliedToAuthorId,
      forum_doc_id: forum_doc_id,
      genre_doc_id: genre_doc_id,
      topic_doc_id: topic_doc_id,
    }
    event.preventDefault()
    // call the action creator
    createReply(state)
    //clear the form fields
    setComment('')
    setIsQuoted(false)
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
    setIsQuoted(false)
    setOpen(false);
  };

  const handleSwitch = () => {

    setIsQuoted(!isQuoted)
  };

  const classes = useStyles();

  return (
    <Fragment>
      {auth.isLoaded && auth.uid !== repliedToAuthorId ? 
      <Fragment>
        <div className={classes.iconSpace} >                              
          <IconButton 
            size='small'
            aria-label="Reply"
            onClick={handleClickOpen}
          >
            <ReplyIcon fontSize='small'/>
          </IconButton>
        </div>
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
            <FormControlLabel
              control={
                <Switch 
                  checked={isQuoted} 
                  onChange={handleSwitch} 
                  value='isQuoted' 
                  color="primary"
                />
              }
              label="Quote"
            />
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
    createReply: (comment) => {dispatch(createReply(comment))}
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReplyButton)
import React, { useState, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { editComment } from '../../../Redux/Actions/commentActions'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';

function NewCommentButton( { forum_doc_id, genre_doc_id, topic_doc_id, comment_doc_id, text, authorId, editComment, auth } ) {

  // for opening and closing the modal new comment form 
  const [open, setOpen] = useState(false)

  // set the textfield value to the current comment. 
  const [comment, setComment] = useState(text)

  const handleChange = (event) => {
      setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    // set state to pass into action creator
    const state = {
      comment: comment,
      forum_doc_id,
      genre_doc_id,
      topic_doc_id,
      comment_doc_id,
    }
    event.preventDefault()
    // call the action creator
    editComment(state)
    // close the modal view
    setOpen(false);
  }

  // methods for opening and closing modal view
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //clear the form fields
    setComment(text)
    setOpen(false);
  };

  if (!auth.isLoaded || !authorId) {
    return null
  }


  return (
    <Fragment>
      {auth.uid === authorId ? 
      <Fragment>
        <IconButton 
          size='small'
          aria-label="Edit" 
          onClick={handleClickOpen}
          >
          <EditOutlinedIcon fontSize='small' />
        </IconButton>
        <div>
        <Dialog 
          open={open} 
          onClose={handleClose} 
          aria-labelledby="Comment dialog"
          fullWidth='true'
          maxWidth='sm'
          >
          <DialogTitle id="form-dialog-title">Edit</DialogTitle>
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
    editComment: (comment) => {dispatch(editComment(comment))}
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
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteComment } from '../../../Redux/Actions/commentActions'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function DeleteComment({authorId, comment, upVotes, edits, createdAt, forum_doc_id, genre_doc_id, topic_doc_id, comment_doc_id, deleteComment}) {

  const [open, setOpen] = useState(false)
  const [textField, setTextField] = useState('')

  function handleChange(event) {
    setTextField(event.target.value)
  }

  function handleClose() {
    setTextField('')
    setOpen(false)
  }

  function handleDelete(event) {
    event.preventDefault()

    const state = {
      authorId: authorId,
      comment: comment,
      upVotes: upVotes,
      edits: edits,
      createdAt: createdAt,
      forum_doc_id: forum_doc_id,
      genre_doc_id: genre_doc_id,
      topic_doc_id: topic_doc_id,
      comment_doc_id: comment_doc_id
    }

    deleteComment(state)
    setTextField('');    
    setOpen(false)
  }

  function handleClick() {
    setOpen(true)
  }

  const button = {

  }
  const main = {
    margin: "8px",
    padding: "24px",
  }
  const text = {
    maxWidth: '600px',      
  }

  return (
      <div style={button}>
      <IconButton size='small'
        onClick={handleClick}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Delete Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this comment? 
              This action cannot be undone. Type in <b>delete</b> to delete.  
            </DialogContentText>
            <form className={main} noValidate autoComplete="off">
              <TextField 
                id="title" 
                label="delete" 
                variant="outlined" 
                fullWidth
                className={text}
                value={textField}
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
              onClick={handleDelete} 
              color="secondary"
              disabled={'delete' !== textField}  
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (comment) => {dispatch(deleteComment(comment))}
  }
}

export default connect(null, mapDispatchToProps)(DeleteComment)

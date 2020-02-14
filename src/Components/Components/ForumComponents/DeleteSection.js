import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteSection } from '../../../Redux/Actions/forumActions'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class DeleteSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      textField: '',
      forum_doc_id: '',
      open: false,
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      title: this.props.title,
      forum_doc_id: this.props.forum_doc_id,
    })
  }

  handleChange(event) {
    this.setState({
      textField: event.target.value,
    })
  } 

  handleClose() {
    this.setState({
      open: false,
      textField: '',
    })
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.deleteSection(this.state)
    this.setState({open: false})
    this.forceUpdate()
  }

  handleClick() {
    this.setState({open: true})
  }

  render() {
    const button = {
      padding: "0px",
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
        <IconButton 
          onClick={this.handleClick}
          style={button}
        >
          <DeleteIcon />
        </IconButton>
          <div>
          <Dialog open={this.state.open} onClose={this.state.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete Forum Section</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this section? 
                Type in the title of this section <b>{this.state.title}</b> to delete.  
              </DialogContentText>
              <form className={main} noValidate autoComplete="off">
                <TextField 
                  id="title" 
                  label="Title" 
                  variant="outlined" 
                  fullWidth
                  className={text}
                  value={this.state.textField}
                  onChange={this.handleChange}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button 
                id='cancel'
                onClick={this.handleClose} 
                color="primary">
                Cancel
              </Button>
              <Button 
                id='submit'
                onClick={this.handleDelete} 
                color="secondary"
                disabled={this.state.title !== this.state.textField}  
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSection: (section) => {dispatch(deleteSection(section))}
  }
}

export default connect(null, mapDispatchToProps)(DeleteSection)

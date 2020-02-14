import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTopic, makePrivate, moveTopic } from '../../../Redux/Actions/topicActions'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import DirectionsOutlinedIcon from '@material-ui/icons/DirectionsOutlined';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { getFirestore } from 'redux-firestore'



class TopicAdminActionButtons extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      topic: {},
      textField: '',
      textFieldMove: '',
      forum_doc_id: '',
      genre_doc_id: '',
      topic_doc_id: '',
      moveToForumDocId: '',
      moveToGenreDocId: '',
      moveToSelected: false,
      genres: [],
      open: false,
      openPrivate: false,
      openMove: false,
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.makePrivate = this.makePrivate.bind(this)
    this.handleClosePrivate = this.handleClosePrivate.bind(this)
    this.handleChangePrivate = this.handleChangePrivate.bind(this)
    this.handleClickPrivate = this.handleClickPrivate.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleCloseMove = this.handleCloseMove.bind(this)
    this.handleClickMove = this.handleClickMove.bind(this)
    this.handleListItemClick = this.handleListItemClick.bind(this)
  }

  componentDidMount() {

    const firestore = getFirestore()

    var genreList = []
    firestore.collection('forum')
              .get()
              .then(function(forumsCollection) {
                forumsCollection.forEach(function(forumDoc) {
                  firestore.collection('forum')
                          .doc(forumDoc.id)
                          .collection('genre')
                          .get()
                          .then(function(genreCollection) {
                            genreCollection.forEach(function(genreDoc) {
                              genreList.push({
                                title: genreDoc.data().title,
                                doc_id: genreDoc.id,
                                forum_doc_id: forumDoc.id,
                              })                             
                            })
                          })
                })
              })

    this.setState({
      title: this.props.title,
      topic: this.props.topic,
      forum_doc_id: this.props.forum_doc_id,
      genre_doc_id: this.props.genre_doc_id,
      topic_doc_id: this.props.topic_doc_id,
      genres: genreList,
    })
  }

  handleChange(event) {
    this.setState({
      textField: event.target.value,
    })
  } 

  handleChangePrivate(event) {
    this.setState({
      textFieldPrivate: event.target.value,
    })
  } 

  handleClose() {
    this.setState({
      open: false,
      textField: '',
    })
  }

  handleClosePrivate() {
    this.setState({
      openPrivate: false,
      textFieldPrivate: '',
    })
  }

  handleCloseMove() {
    this.setState({
      openMove: false,
    })
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.deleteTopic(this.state)
    this.setState({open: false})
  }

  handleClick() {
    this.setState({open: true})
  }

  handleClickMove() {
    this.setState({openMove: true})
  }

  handleClickPrivate() {
    this.setState({openPrivate: true})
  }

  makePrivate(event) {
    event.preventDefault()
    this.props.makePrivate(this.state)
    this.setState({openPrivate: false})
  }

  handleMove(event) {
    event.preventDefault()
    this.props.moveTopic(this.state)
    this.setState({openMove: false})
  }

  handleListItemClick(event, moveToGenreDocId, moveToForumDocId) {

    this.setState({
      moveToForumDocId: moveToForumDocId,
      moveToGenreDocId: moveToGenreDocId,
      moveToSelected: true,
    })
console.log('STAATE', this.state)
  }

  render() {
    const button = {
      padding: "8px",
    }
    const main = {
      margin: "8px",
      padding: "24px",
    }
    const text = {
      maxWidth: '600px',      
    }

    const { forums } = this.props
    if (!forums) return <div/>

    return (
      <div style={button}>
        <IconButton 
          onClick={this.handleClick}
          style={button}
          size='small'
        >
          <DeleteIcon fontSize='small'/>
        </IconButton>
        <IconButton 
          onClick={this.handleClickPrivate}
          style={button}
          size='small'
        >
          <VisibilityOffOutlinedIcon fontSize='small' />
        </IconButton>
        <IconButton 
          onClick={this.handleClickMove}
          style={button}
          size='small'
        >
          <DirectionsOutlinedIcon fontSize='small' />
        </IconButton>
          <div>
          <Dialog open={this.state.open} onClose={this.state.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete Topic</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <b>{this.state.title}</b>  
              </DialogContentText>
              <DialogContentText>
                Are you sure you want to delete this topic? 
                All comments inside this topic will be deleted. 
                This action cannot be undone. Type in <b>delete</b> to delete.  
              </DialogContentText>
              <form className={main} noValidate autoComplete="off">
                <TextField 
                  id="title" 
                  label="delete" 
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
                disabled={'delete' !== this.state.textField}  
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog open={this.state.openPrivate} onClose={this.state.handleClosePrivate} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Make Topic Private</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <b>{this.state.title}</b>  
              </DialogContentText>
              <DialogContentText>
                Are you sure you want to make this topic private? 
                You can reverse this action on the admin page.  
                Type in <b>private</b> to make private.  
              </DialogContentText>
              <form className={main} noValidate autoComplete="off">
                <TextField 
                  id="title" 
                  label="private" 
                  variant="outlined" 
                  fullWidth
                  className={text}
                  value={this.state.textFieldPrivate}
                  onChange={this.handleChangePrivate}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button 
                id='cancel'
                onClick={this.handleClosePrivate} 
                color="primary">
                Cancel
              </Button>
              <Button 
                id='submit'
                onClick={this.makePrivate} 
                color="secondary"
                disabled={'private' !== this.state.textFieldPrivate}  
              >
                Private
              </Button>
            </DialogActions>
          </Dialog>
        </div>
          <div>
            <Dialog open={this.state.openMove} onClose={this.state.handleCloseMove} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Move Topic</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <b>{this.state.title}</b>  
                </DialogContentText>
                <DialogContentText>
                  Select the forum from the list that you would like to move this topic to.  
                </DialogContentText>

                <List component='nav'>
                  <Divider />
                    {this.state.genres.map((genre) => {
                      return (
                        <ListItem
                          button
                          key={genre.doc_id}
                          selected={this.state.moveToGenreDocId === genre.doc_id}
                          onClick={event => this.handleListItemClick(event, genre.doc_id, genre.forum_doc_id)}
                        >
                          <ListItemText primary={genre.title} />
                        </ListItem>
                      )
                    })}
                  <Divider />
              </List>

              </DialogContent>
              <DialogActions>
                <Button 
                  id='cancel'
                  onClick={this.handleCloseMove} 
                  color="primary">
                  Cancel
                </Button>
                <Button 
                  id='submit'
                  onClick={this.handleMove} 
                  color="secondary"
                  disabled={!this.state.moveToSelected}  
                >
                  Move
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
    deleteTopic: (topic) => {dispatch(deleteTopic(topic))},
    makePrivate: (topic) => {dispatch(makePrivate(topic))},
    moveTopic: (topic) => {dispatch(moveTopic(topic))}
  }
}

export default compose(
  firestoreConnect(() => ['forum']),  //connects to the collection 'forums'
  connect((state) => ({
    forums: state.firestore.ordered.forum
  }), mapDispatchToProps))(TopicAdminActionButtons)


import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { createGenre } from '../../../Redux/Actions/forumActions'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



class NewForum extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      subtitle: '',
      forums: [],
      forum_doc_id: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleListItemClick = this.handleListItemClick.bind(this)
  }

  componentDidMount () {
    this.setState({
      forums: this.props.forums
    })
  }

  handleChange(event) {
    if (event.target.id === 'title') {
      this.setState({title: event.target.value})
    } else if (event.target.id === 'subtitle') {
      this.setState({subtitle: event.target.value})
    } 
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log("State", this.state)
    if (this.state.forum_doc_id !== 0) {
      this.props.createGenre(this.state)
      
      this.setState({
        title: '',
        subtitle: '',
      })
    } 
  }

  handleListItemClick(event, id) {
    // set the selected forum section
    console.log("id", id)

    this.setState({
      forum_doc_id: id,
    })
  }

  render() {

    const main = {
      padding: "24px",
    }
    const button = {
      padding: "8px",
    }
    const text = {
      maxWidth: '600px',
    }

    if (!this.state.forums) {
      console.log(this.state.forums)
      return <div />
    }

    console.log("Forums", this.state.forums)
    return (
      <Paper style={main} elevation={3}>
        <Typography variant="h5" >
          New Forum
        </Typography>
        <List component='nav'>
          <Divider />
            {this.state.forums.map(section => {
              return (
                <ListItem
                  key={section.id}
                  button
                  doc_id={section.id}
                  selected={this.state.forum_doc_id === section.id}
                  onClick={event => this.handleListItemClick(event, section.id)}
                >
                  <ListItemText primary={section.title} />
                </ListItem>
              )
            })}
          <Divider />
        </List>
        <TextField 
          id="title" 
          label="Title" 
          autoComplete='off'
          fullWidth
          style={text}
          value={this.state.title}
          onChange={this.handleChange}
        />
        <TextField
          id="subtitle"
          label="Subtitle"
          placeholder=""
          autoComplete='off'
          fullWidth
          style={text}
          value={this.state.subtitle}
          onChange={this.handleChange}
        />
        <div style={button}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={this.handleSubmit}
          style={button}>
          Submit
        </Button>
      </div>
      </Paper>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGenre: (genre) => {dispatch(createGenre(genre))}
  }
}

export default connect(null, mapDispatchToProps)(NewForum)

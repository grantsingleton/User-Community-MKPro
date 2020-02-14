import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { createSection } from '../../../Redux/Actions/forumActions'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class NewSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    if (event.target.id === 'title') {
      this.setState({title: event.target.value})
    } 
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log("State", this.state)
    this.props.createSection(this.state)
    this.setState({
      title: '',
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

    return (
      <Paper style={main} elevation={3}>
        <Typography variant="h5" >
          New Section
        </Typography>
        <TextField 
          id="title" 
          label="Title" 
          autoComplete='off'
          fullWidth
          style={text}
          value={this.state.title}
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
    createSection: (section) => {dispatch(createSection(section))}
  }
}


export default connect(null, mapDispatchToProps)(NewSection)
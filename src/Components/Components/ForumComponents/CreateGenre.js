import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { createGenre } from '../../../Redux/Actions/forumActions'

class CreateGenre extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      subtitle: '',
      forum_doc_id: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      forum_doc_id: this.props.forum_doc_id,
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
    this.props.createGenre(this.state)
    this.setState({
      title: '',
      subtitle: '',
    }) 
  }

  render() {
    const main = {
      margin: "8px",
      padding: "24px",
    }
    const button = {
      padding: "8px",
    }
    const text = {
      maxWidth: '600px',
    }

    return (
      <form style={main} noValidate autoComplete="off">
        <TextField 
          id="title" 
          label="Title" 
          variant="outlined" 
          fullWidth
          style={text}
          value={this.state.title}
          onChange={this.handleChange}
        />
        <TextField
          id="subtitle"
          label="Subtitle"
          placeholder=""
          multiline
          fullWidth
          variant="outlined"
          rows="2"
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
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGenre: (genre) => {dispatch(createGenre(genre))}
  }
}

export default connect(null, mapDispatchToProps)(CreateGenre)
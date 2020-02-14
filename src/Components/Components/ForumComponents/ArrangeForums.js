import React, {useState} from 'react' 
import DndForumList from './DndForumList'
import DndSectionList from './DndSectionList'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

function ArrangeForums({forums}) {

  const [docId, setDocId] = useState(0) 
  const [sectionIndex, setSectionIndex] = useState(0)

  const paper = {
    padding: "24px",
    marginTop: '10px',
  }

  const root = {
    flexGrow: 1,
  }

  const handleListItemClick = (event, id, index) => {
    // set the selected forum section
    console.log("id", id)

    setDocId(id)
    setSectionIndex(index)
  }

  if (!forums) {
    return <div/>
  }

  return (
    <Paper elevation={3} style={paper}>
      <Typography variant="h5">
         Arrange Forums
      </Typography>
      <Divider />
      <Grid container style={root} spacing={1} >
        <Grid item sm>
          <Grid container={true} style={{marginTop: '10px'}} justify='space-between' spacing={1}>
            <Grid item xs>
              <Typography variant="subtitle1">
                Select
              </Typography>
              <List component='nav'>
                <Divider />
                  {forums.map((section, index) => {
                    return (
                      <ListItem
                        key={section.id}
                        button
                        doc_id={section.id}
                        selected={section.id === docId}
                        onClick={event => handleListItemClick(event, section.id, index)}
                      >
                        <ListItemText primary={section.title} />
                      </ListItem>
                    )
                  })}
                <Divider />
            </List>
              </Grid>
              <Grid item xs>
                  <Typography variant="subtitle1">
                    Arrange
                  </Typography>
                  <DndProvider backend={Backend}>
                    {docId !== 0 ? 
                    <DndForumList 
                      key={sectionIndex} 
                      forum_doc_id={docId}
                    />
                    : <div/>
                    }
                  </DndProvider>
              </Grid>
              <Grid item xs>
                <Typography variant="h5" >
                  Arrange Sections
                </Typography>
                <DndProvider backend={Backend}>
                  <DndSectionList key={forums.id}/>
                </DndProvider>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </Paper>
  )
} 
export default compose(
  firestoreConnect(() => ['forum']),  //connects to the collection 'forums'
  connect((state) => ({
    forums: state.firestore.ordered.forum
  }))
)(ArrangeForums)
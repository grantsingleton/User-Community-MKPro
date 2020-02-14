import React from 'react' 
import DndSectionList from './DndSectionList'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function ArrangeSections({forums}) {

  const paper = {
    padding: "24px",
  }


  return (
    <Paper style={paper} elevation={3}>
      <Typography variant="h5" >
        Arrange Sections
      </Typography>
      <DndProvider backend={Backend}>
        <DndSectionList key={forums.id}/>
      </DndProvider>
    </Paper>
  )
} 
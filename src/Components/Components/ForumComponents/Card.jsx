import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
// My additions
import { updateSectionIndex } from '../../../Redux/Actions/forumActions'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteSection from './DeleteSection'

const style = {
  padding: '0.75rem 1.25rem',
  marginBottom: '.5rem',
  cursor: 'move',
}
const Card = ({ id, text, index, moveCard, updateSectionIndex }) => {

  const section = {
    doc_id: id,
    index: index,
  }
  // call action creator to update index of forum
  updateSectionIndex(section)

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <Paper elevation={3} ref={ref} style={{ ...style, opacity }}>
      <Grid container={true} justify='space-between' >
        <Grid item>
          {text}
        </Grid>
        <Grid item>
          <DeleteSection 
            title={text}
            forum_doc_id={id}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateSectionIndex: (section) => {dispatch(updateSectionIndex(section))}
  }
}

export default connect(null, mapDispatchToProps)(Card)
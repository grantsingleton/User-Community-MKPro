import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { DeleteComment } from '../../Components'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '& > *': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      textAlign: 'left',
    },
  },
  author: {
    fontWeight: 'bold',
  }
}));

export default function ForumComment(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={2} square={true}>
        <Typography variant='subtitle1' className={classes.author}>
          {props.author}
        </Typography>
        <Typography variant='body2' style={{whiteSpace: 'pre-line'}}>
          {props.comment}
        </Typography>
        <div className={classes.delete}> 
          <DeleteComment 
            author={props.author}
            comment={props.comment}
            forum_doc_id={props.forum_doc_id}
            genre_doc_id={props.genre_doc_id}
            topic_doc_id={props.topic_doc_id}
            comment_doc_id={props.comment_doc_id}
          />
        </div>
      </Paper>
    </div>
  )
}
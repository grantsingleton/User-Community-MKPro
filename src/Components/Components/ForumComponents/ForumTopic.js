import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  root: {
    flexWrap: 'wrap',
    '& > *': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingTop: theme.spacing(2),
      height: theme.spacing(4),
      textAlign: 'left'
    },
  },
  title: {
    paddingTop: 0,
    paddingLeft: 20,
    fontWeight: 'bold'
  },
}));

export default function ForumTopic(props) {
  const classes = useStyles();

  return(
    <div className={classes.root}>
        <Paper elevation={2} square={true}>
          <Link 
            to={'/forum/' + props.forum_doc_id + '/' + props.genre_doc_id + '/' + props.topic_doc_id} 
            className={classes.link}
          >
            <Typography variant="body1" className={classes.title}>
              {props.title}
            </Typography>
          </Link>
        </Paper>
    </div>
  )
}
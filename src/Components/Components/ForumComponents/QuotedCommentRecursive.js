import React, {Fragment} from 'react'
import Paper from '@material-ui/core/Paper';
import Author from './Author'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2)
  },
}));


function QuotedCommentRecursive({comments, commentId, authorId}) {

  const classes = useStyles();

  if (!comments) {
    return null
  }
  else {
    var quotedComment = {}
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].id === commentId) {
        quotedComment = comments[i]
        console.log("ID", quotedComment.id)
      }
    }

    return (
      <div className={classes.root} >
        <Paper elevation={1} className={classes.paper}>
          {quotedComment.isQuoted ? 
            <Fragment>
              <QuotedCommentRecursive 
                comments={comments}
                commentId={quotedComment.repliedToId}
                authorId={quotedComment.repliedToAuthorId}
              />
            </Fragment>
          :
            null
          }
          <Author 
            authorId={authorId} 
            bold={false}
          /> wrote
          <p>{quotedComment.comment}</p>
        </Paper>   
      </div>
    )
  }
}
export default QuotedCommentRecursive
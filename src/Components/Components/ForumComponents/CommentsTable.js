import React, { useState, Fragment } from 'react';
import { makeStyles, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from './TablePaginationActions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Typography from '@material-ui/core/Typography';
import DeleteComment from './DeleteComment'
import NewCommentButton from './NewCommentButton'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Author from './Author'
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import Divider from '@material-ui/core/Divider';
import {addView} from '../../../Redux/Actions/topicActions'
import {addUpVote} from '../../../Redux/Actions/commentActions'
import EditComment from './EditComment'
import CreateReplyButton from './CreateReplyButton'
import QuotedComment from './QuotedComment'
import CircularProgress from '@material-ui/core/CircularProgress';
import FlagCommentButton from './FlagCommentButton'


const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  container: {
    marginTop: '10px',
  },
  username: {
    justifyContent: 'space-between'
  },
  loader: {
    display: 'inlineBlock'
  }, 
  rootSpinner: {
    textAlign: 'center',
    marginTop: '50px',
  },
  iconSpace: {
    paddingRight: '20px',
  }
});

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function CommentsTable( {forum_doc_id, genre_doc_id, topic_doc_id, comments, auth, addView, addUpVote } ) {

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const upVoteComment = (comment_doc_id) => {
    const vote = {
      forum_doc_id,
      genre_doc_id,
      topic_doc_id,
      comment_doc_id: comment_doc_id,
      userId: auth.uid
    }
    addUpVote(vote)
  }
  
  
  if (!comments || !auth.isLoaded) {
    return <div className={classes.rootSpinner}><CircularProgress className={classes.loader} /> </div>
  } 

  //register a unique view
  const view = {
    forum_doc_id,
    genre_doc_id,
    topic_doc_id,
    userId: auth.uid
  }
  addView(view)

  comments.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)

  return (
    <ThemeProvider theme={theme} >
      <Fragment>
        <Fragment>
          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableHead className={classes.table} aria-label='Topics table' >
                <TableRow>
                  <StyledTableCell>
                    <NewCommentButton
                      forum_doc_id={forum_doc_id}
                      genre_doc_id={genre_doc_id}  
                      topic_doc_id={topic_doc_id}
                    />
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : comments
                ).map(comment => (
                  <StyledTableRow key={comment.id} >
                    <StyledTableCell component="th" scope="row" style={{paddingBottom: '0px'}} >
                      <ul style={ {listStyleType: 'none', padding: '0px', margin: '0px'} }>
                          <li>
                            <Grid container={true} style={{ marginBottom: '5px'}} justify='space-between' spacing={1}> 
                              <Grid item>
                                <Author authorId={comment.authorId} bold={true}/>
                              </Grid>
                              <Grid item>
                                {comment.repliedToId ? 
                                  <Fragment>
                                    {moment(comment.createdAt.toDate().toString()).calendar()} in reply to <Author authorId={comment.repliedToAuthorId} bold={false} />
                                  </Fragment>
                                  :
                                  moment(comment.createdAt.toDate().toString()).calendar()
                                }
                              </Grid>
                            </Grid> 
                          </li>
                          <li>
                            {comment.isQuoted ? 
                              <Fragment>
                                <QuotedComment 
                                  topic_doc_id={topic_doc_id}
                                  commentId={comment.repliedToId}
                                  authorId={comment.repliedToAuthorId}
                                />
                              </Fragment>
                            : 
                              null
                            }
                            <Typography variant="body1" style={{whiteSpace: 'pre-line', paddingTop: '15px', paddingBottom: '20px'}}>
                              <Fragment>{comment.comment}</Fragment>
                            </Typography>
                          </li>
                          <Divider />
                          <li>
                            <Toolbar >
                                <CreateReplyButton
                                  forum_doc_id={forum_doc_id}
                                  genre_doc_id={genre_doc_id}
                                  topic_doc_id={topic_doc_id}
                                  repliedToId={comment.id}
                                  repliedToAuthorId={comment.authorId}
                                />
                              <div className={classes.iconSpace} >
                                <IconButton 
                                  size='small'
                                  onClick={() => upVoteComment(comment.id)} 
                                  id={comment.id}
                                  key={comment.id}
                                  aria-label="Upvote">
                                  <ThumbUpAltOutlinedIcon fontSize='small' />
                                </IconButton >
                                {comment.upVotes.length}
                              </div>
                              {auth.uid === comment.authorId ? 
                                <div className={classes.iconSpace} >
                                  <EditComment 
                                    forum_doc_id={forum_doc_id}
                                    genre_doc_id={genre_doc_id}
                                    topic_doc_id={topic_doc_id}
                                    comment_doc_id={comment.id}
                                    text={comment.comment}
                                    authorId={comment.authorId}
                                  />
                                </div>
                                : null 
                              }
                              <div className={classes.iconSpace} >
                                <FlagCommentButton 
                                  forum_doc_id={forum_doc_id}
                                  genre_doc_id={genre_doc_id}
                                  topic_doc_id={topic_doc_id}
                                  comment_doc_id={comment.id}
                                />
                              </div>
                              <DeleteComment 
                                authorId={comment.authorId}
                                comment={comment.comment}
                                upVotes={comment.upVotes}
                                edits={comment.edits}
                                createdAt={comment.createdAt}
                                forum_doc_id={forum_doc_id}
                                genre_doc_id={genre_doc_id}
                                topic_doc_id={topic_doc_id}
                                comment_doc_id={comment.id}
                              />
                              {comment.edits === 0 ? null :   
                                (comment.edits === 1 ? 
                                  <Fragment>{comment.edits} edit</Fragment> 
                                  : 
                                  <Fragment>{comment.edits} edits</Fragment>
                                )
                              }
                            </Toolbar>
                          </li>
                        </ul>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={comments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Fragment>
      </Fragment>
    </ThemeProvider>
  );
            
}

const mapDispatchToProps = (dispatch) => {
  return {
    addView: (view) => dispatch(addView(view)),
    addUpVote: (vote) => dispatch(addUpVote(vote))
  }
}

export default compose(
  firestoreConnect((props) => [
    { collection: 'forum', 
      doc: props.forum_doc_id, 
      subcollections: [{collection: 'genre',
                        doc: props.genre_doc_id,
                        subcollections: [{collection: 'topic',
                                          doc: props.topic_doc_id,
                                          subcollections: [{collection: 'comment'}]
                                        }]
                      }],
      storeAs: `${props.topic_doc_id}-comments`
    }
  ]),
  connect((state, props) => ({
    comments: state.firestore.ordered[`${props.topic_doc_id}-comments`],
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }), mapDispatchToProps))(CommentsTable)
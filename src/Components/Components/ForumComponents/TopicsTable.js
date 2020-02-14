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
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import TopicAdminActionButtons from './TopicAdminActionButtons'
import { NewTopicButton } from '..';
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  link: { // gws 2/12/20
    "&:hover": {
      textDecoration: 'underline',
    },
    textDecoration: 'none',
    color: 'black'
  },
  container: {
    marginTop: '10px',
  },
  loader: {
    display: 'inlineBlock'
  }, 
  rootSpinner: {
    textAlign: 'center',
    marginTop: '50px',
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

function TopicsTable( {forum_doc_id, genre_doc_id, topics } ) {

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
  
  if (!topics) {
    return <div className={classes.rootSpinner}><CircularProgress className={classes.loader} /> </div>
  }

  var publicTopics = []
  for (var i = 0; i < topics.length; i++) {
    if (!topics[i].isPrivate) {
      publicTopics.push(topics[i])
    }
  }

  publicTopics.sort((a, b) => (a.lastComment < b.lastComment) ? 1 : -1)

  return (
    <ThemeProvider theme={theme} >
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead className={classes.table} aria-label='Topics table' >
            <TableRow>
              <StyledTableCell>
                <NewTopicButton
                  forum_doc_id={forum_doc_id}
                  genre_doc_id={genre_doc_id}  
                />
              </StyledTableCell>
              <StyledTableCell align="center">Last Post</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? publicTopics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : publicTopics
            ).map(topic => (
              <StyledTableRow key={topic.id}>
                <StyledTableCell component="th" scope="row">
                  <Link 
                    to={'/forum/' + forum_doc_id + '/' + genre_doc_id + '/' + topic.id} 
                    className={classes.link}
                  >
                    <Typography variant="body1" className={classes.title}>
                      {topic.title}
                    </Typography>
                </Link>
                </StyledTableCell>
                <StyledTableCell size='small' align="center">
                  <ul style={ {listStyleType: 'none', padding: '0px', margin: '0px'} }>
                    <li>
                      {moment(topic.lastComment.toDate().toString()).calendar()} 
                    </li>
                    <li>
                      by {topic.lastAuthor} 
                    </li>
                  </ul>
                </StyledTableCell> 
                <StyledTableCell size='small' align="left">
                <ul style={ {listStyleType: 'none', padding: '0px', margin: '0px'} }>
                    <li>
                      {topic.totalComments === 1 ? 
                        <Fragment>{topic.totalComments} post</Fragment> 
                        : 
                        <Fragment>{topic.totalComments} posts</Fragment>
                      }
                    </li>
                    <li>
                      {topic.views.length === 1 ? 
                        <Fragment>{topic.views.length} view</Fragment> 
                      :
                        <Fragment>{topic.views.length} views</Fragment> 
                      }
                    </li>
                  </ul>
                </StyledTableCell>
                <StyledTableCell size='small' align="right">
                  <TopicAdminActionButtons 
                    title={topic.title}
                    topic={topic}
                    forum_doc_id={forum_doc_id}
                    genre_doc_id={genre_doc_id}
                    topic_doc_id={topic.id}
                  />  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={topics.length}
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
    </ThemeProvider>
  );
            
}
export default compose(
  firestoreConnect((props) => [
    { collection: 'forum', 
      doc: props.forum_doc_id, 
      subcollections: [{collection: 'genre',
                        doc: props.genre_doc_id,
                        subcollections: [{collection: 'topic'}]
                      }],
      storeAs: `${props.genre_doc_id}-topics`
    }
  ]),
  connect((state, props) => ({
    topics: state.firestore.ordered[`${props.genre_doc_id}-topics`]
  }))
 )(TopicsTable)
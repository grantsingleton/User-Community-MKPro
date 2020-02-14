import React from 'react';
import { withStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Link} from "react-router-dom";
import moment from 'moment'

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  link: { // gws 2/12/20
    "&:hover": {
      textDecoration: 'underline',
    },
    textDecoration: 'none',
    color: 'black'
  },
  container: {
    marginBottom: '50px',
    marginTop: '10px',
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

function ForumTable(props) {
  const classes = useStyles();
  const {genres} = props

  if (!genres) {
    console.log("nullGenres", genres)
    return <div />
  }
   // sort genres by index
   const orderedGenres = genres
   orderedGenres.sort((a, b) => (a.index > b.index) ? 1 : -1)
  console.log("Genres", genres)
//***FIXME Add subtitle and make static data dynamic*/
  return (
    <ThemeProvider theme={theme} >
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >{props.title}</StyledTableCell>
              <StyledTableCell size='small' align="right">Last Post</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres && orderedGenres.map(genre => (
              <StyledTableRow key={genre.id}>
                <StyledTableCell component="th" scope="row"> 
                  <ul style={ {listStyleType: 'none', padding: '0px', margin: '0px'} }>
                    <li style={{fontWeight: 'bold'}}>
                      <Link 
                        to={'/forum/' + props.forum_doc_id + '/' + genre.id} 
                        className={classes.link} 
                      >
                        {genre.title}
                      </Link>
                    </li>
                    <li>
                      <Typography variant="caption">
                        {genre.subtitle}
                      </Typography>
                    </li>
                  </ul>
                </StyledTableCell>
                <StyledTableCell size='small' align="right">
                  {genre.lastPost ? 
                    moment(genre.lastPost.toDate().toString()).fromNow()
                  :
                    null
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
export default compose(
  firestoreConnect((props) => [
    { collection: 'forum', 
      doc: props.forum_doc_id, 
      subcollections: [{collection: 'genre'}],
      storeAs: `${props.forum_doc_id}-genre`
    }
  ]),
  connect((state, props) => ({
    genres: state.firestore.ordered[`${props.forum_doc_id}-genre`]
  }))
)(ForumTable)
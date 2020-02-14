import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import {addFlag} from '../../../Redux/Actions/commentActions'


const useStyles = makeStyles(theme => ({
  paper: {
    
  },
}));

function FlagCommentButton({forum_doc_id, genre_doc_id, topic_doc_id, comment_doc_id, addFlag}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFlag, setSelectedFlag] = React.useState('');


  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const submitFlag = event => {
    // submit the flag

    const flag = {
      forum_doc_id,
      genre_doc_id,
      topic_doc_id,
      comment_doc_id,
      type: selectedFlag
    }

    addFlag(flag)
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const handleListItemClick = (event, flagType) => {

    setSelectedFlag(flagType)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <IconButton 
        aria-describedby={id} 
        type="button" 
        size='small'
        onClick={handleClick}
      >
        <FlagOutlinedIcon fontSize='small' />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>

        <Paper>
          <List component='nav'>
            <ListItem
              key={0}
              button
              selected={selectedFlag === 'language'}
              onClick={event => handleListItemClick(event, 'language')}
            >
              <ListItemText primary='Offensive language' />
            </ListItem>
            <ListItem
              key={1}
              button
              selected={selectedFlag === 'disrespect'}
              onClick={event => handleListItemClick(event, 'disrespect')}
            >
              <ListItemText primary='Rude or disrespectful' />
            </ListItem>
            <ListItem
              key={2}
              button
              selected={selectedFlag === 'negativity'}
              onClick={event => handleListItemClick(event, 'negativity')}
            >
              <ListItemText primary='Extreme negativity' />
            </ListItem>
            <ListItem
              key={3}
              button
              selected={selectedFlag === 'spam'}
              onClick={event => handleListItemClick(event, 'spam')}
            >
              <ListItemText primary='Spam or Advertising' />
            </ListItem>
            <ListItem
              key={4}s
              button
              selected={selectedFlag === 'other'}
              onClick={event => handleListItemClick(event, 'other')}
            >
              <ListItemText primary='Other' />
            </ListItem>
            <Button 
              color="secondary"
              onClick={handleClick}
            >
              Cancel
            </Button>
            <Button 
              color="primary"
              onClick={submitFlag}
              disabled={selectedFlag === ''}
            >
              Submit
            </Button>
          </List>
        </Paper>
      </Popper>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFlag: (flag) => dispatch(addFlag(flag))
  }
}

export default connect(null, mapDispatchToProps)(FlagCommentButton)
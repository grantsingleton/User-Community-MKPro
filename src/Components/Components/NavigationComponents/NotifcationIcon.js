import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Badge from '@material-ui/core/Badge';
import Author from '../ForumComponents/Author'
import Container from '@material-ui/core/Container';
import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import Redirect from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'
import {markRead} from '../../../Redux/Actions/commentActions'
import blue from '@material-ui/core/colors/blue';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const unreadColor = blue[100];

const useStyles = makeStyles(theme => ({
  titleButton: {
    textDecoration: 'none',
    color: 'black'
  },
  unreadStyle: {
    backgroundColor: unreadColor,
  }
}));


function NotificationIcon({notifications, markRead}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };


  const handleListItemClick = (event, notification) => {
    // mark this notification as read
    if (notification.unread) {
      markRead(notification.id)
    } 
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  var open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined; 

  if (!notifications) return <IconButton aria-describedby={id} type="button"><NotificationsIcon  /></IconButton>

  var newNotifications = 0
  
  for (var i = 0; i < notifications.length; i++) {
    if (notifications[i].unread) {
      newNotifications++
    }
  }

  return (
    <div>
      <IconButton 
        aria-describedby={id} 
        type="button" 
        onClick={handleClick}
      >
        <Badge badgeContent={newNotifications} color="secondary">
          <NotificationsIcon  />
        </Badge>
      </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <ClickAwayListener onClickAway={handleClick} >
            <Container maxWidth='sm'>
              <Paper style={{maxHeight: 400, overflow: 'auto'}}>
                <List component='nav'>
                  {notifications.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1).map(notification => (
                    <Fragment>
                    <Link 
                      to={`/forum/${notification.forumDocId}/${notification.genreDocId}/${notification.topicDocId}`} 
                      className={classes.titleButton}
                    >
                    <ListItem
                      key={notification.id}
                      button
                      onClick={event => handleListItemClick(event, notification)}
                      className={notification.unread ? classes.unreadStyle : {}}
                    >
                      <ul style={ {listStyleType: 'none', padding: '0px', margin: '0px'} }>
                        <li>
                          <Typography variant='body2'>
                          <Author 
                            authorId={notification.author}
                            bold={false} 
                          /> replied: {notification.text.length < 100 ? notification.text : notification.text.substring(0,100) + '...'}
                          </Typography>
                        </li>
                        <li style={{paddingTop: '10px'}}>
                          <Typography variant="caption">
                            {moment(notification.createdAt.toDate().toString()).calendar()}
                          </Typography>
                        </li>
                      </ul> 
                    </ListItem>
                    </Link>
                    <Divider />
                    </Fragment>
                  ))}
                </List>
              </Paper>
            </Container>
          </ClickAwayListener>
        </Popper>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    markRead: (notificationId) => {dispatch(markRead(notificationId))}
  }
}

export default compose(
  firestoreConnect((props) => [
    { collection: 'users', 
      doc: props.userId, 
      subcollections: [{collection: 'notification', orderBy: ['createdAt', 'desc'], limit: 30}],
      storeAs: `${props.userId}-notifications`
    }
  ]),
  connect((state, props) => ({
    notifications: state.firestore.ordered[`${props.userId}-notifications`]
  }), mapDispatchToProps)
  )(NotificationIcon)
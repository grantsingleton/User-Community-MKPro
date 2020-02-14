import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { Link, withRouter } from 'react-router-dom'
import {signOut} from '../../../Redux/Actions/authActions'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 200,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  loginLink: {
    textDecoration: 'none',
    color: 'white',
  }
}));

const HeaderSmall = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    drawer: false,
  });

  const {signOut, auth} = props
  const signedIn = auth.uid

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, drawer: open });
  };

  const goToLogin = () => {
    props.history.push('/login')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color='default'>
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          {auth.isLoaded ? (signedIn ? 
            <Button color="inherit" onClick={signOut}>Logout</Button> 
            : 
            <Button color="inherit" onClick={goToLogin}>Login</Button>
          ) : null
          }
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state.drawer} onClose={toggleDrawer(false)}>
        <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
          <List>
            <Link to='/' className={classes.link}>
              <ListItem button key='Home'>
                <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
            </Link>
            <Link to='/forum' className={classes.link}>
              <ListItem button key='Forum'>
                <ListItemIcon><ForumOutlinedIcon /></ListItemIcon>
                <ListItemText primary='Forum' />
              </ListItem>
            </Link>
            <Link to='/media' className={classes.link}>
              <ListItem button key='Media'>
                <ListItemIcon><PermMediaOutlinedIcon /></ListItemIcon>
                <ListItemText primary='Media' />
              </ListItem>
            </Link>
            <Link to='/experts' className={classes.link}>
              <ListItem button key='Consultants'>
                <ListItemIcon><AccountBoxOutlinedIcon /></ListItemIcon>
                <ListItemText primary='Consultants' />
              </ListItem>
            </Link>
            <Link to='/admin' className={classes.link}>
              <ListItem button key='Admin'>
                <ListItemIcon><VerifiedUserIcon /></ListItemIcon>
                <ListItemText primary='Admin' />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {dispatch(signOut())}
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSmall))
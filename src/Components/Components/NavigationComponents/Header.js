import React, {Fragment} from 'react';
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { Link, withRouter } from 'react-router-dom'
import {signOut} from '../../../Redux/Actions/authActions'
import {connect} from 'react-redux'
import NotificationIcon from './NotifcationIcon'


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
  titleButton: {
    textDecoration: 'none',
    color: 'black',
    "&:hover": {
      textDecoration: 'underline',
    },
  },
  login: {
    paddingRight: 10,
  },
}));

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


const Header = (props) => {
  const { signOut, auth, profile } = props
  const signedIn = auth.uid

  const classes = useStyles();

  const goToLogin = () => {
    props.history.push('/login')
  }

  var d = new Date();
  d.setDate(d.getDate() - 2);

  const sevenDaysAgo = new Date()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="default" >
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to='/' className={classes.titleButton}>
                User Community
              </Link>
            </Typography>
            {auth.isLoaded ? (signedIn ? 
              <Fragment>
                <Typography variant="caption" >         
                  <Link to={`/profile/${auth.uid}`} className={classes.titleButton}>
                    {profile.username}
                  </Link>
                </Typography>
                <NotificationIcon 
                  userId={auth.uid}
                  timeFrame={sevenDaysAgo}
                />
                <Button 
                  color="inherit"
                  size='small'
                  onClick={signOut}
                >
                  Logout
                </Button>
              </Fragment>
            :
              <Fragment>
                <Button color="inherit" onClick={goToLogin}>Login</Button>
                <Typography variant="caption" >
                  <Link to='/choose-registration' className={classes.titleButton}>
                    Sign Up
                  </Link>
                </Typography>
              </Fragment>
            ) : null
            }
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {dispatch(signOut())}
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
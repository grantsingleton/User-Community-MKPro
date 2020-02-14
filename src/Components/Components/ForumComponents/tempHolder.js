import React, {useState} from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

function SMEApplication({profile, auth}) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const applicationComplete = profile.applicationComplete
    const loggedIn = auth.uid
  
    if (!profile.isLoaded || !auth.isLoaded) return <div/>

    if (applicationComplete) return <Redirect to='/' />
    if (!loggedIn) return <Redirect to='/' />

    return (
      <Container maxWidth='lg' style={{marginTop: '50px'}}>
        <Tabs 
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label="Branch of Service" {...a11yProps(0)} />
          <Tab label="Expertise" {...a11yProps(1)} />
          <Tab label="Skills" {...a11yProps(2)} />
          <Tab label="Submit Application" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Paper elevation={1}>
            <h1>Select Branch of service</h1>
            <p>Select branch from dropdown list and upload DD214. Use 'Customizeable select' and 'File uploader'</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paper elevation={1}>
            <h1>Enter MOS, Rate, etc...</h1>
            <p>Have them enter in the job they held in their respective branch. As well as rank.</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Paper elevation={1}>
            <h1>Enter skills here</h1>
            <p>Use Material Kits 'tags' here for entering in skills</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Paper elevation={1}>
            <h1>Overview and Submit</h1>
            <p>Give an overview of the info they have entered and offer a 'submit' button.</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>
          </Paper>
        </TabPanel>
      </Container>
    )
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth
  }
}

export default withRouter(connect(mapStateToProps)(SMEApplication))


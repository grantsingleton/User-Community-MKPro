import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  login: {
    textDecoration: 'none',
    color: 'black',
    "&:hover": {
      textDecoration: 'underline',
    },
  },
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

export default function PageNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Tabs
          value='false'
          onChange={handleChange}
          textColor="primary"
          centered
        >
          <Link to='/forum' className={classes.login}>
            <Tab label="Forum" />
          </Link>
          <Link to='/media' className={classes.login}>
            <Tab label="Media" />
          </Link>
          <Link to='/experts' className={classes.login}>
            <Tab label="Consultants" />
          </Link>
          <Link to='/admin' className={classes.login}>
            <Tab label="Admin" />
          </Link>
        </Tabs>
      </Paper>
    </ThemeProvider>
  );
}
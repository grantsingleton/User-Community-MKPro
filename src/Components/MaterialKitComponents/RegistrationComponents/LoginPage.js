/*eslint-disable*/
import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import {connect} from 'react-redux'
import {signIn} from '../../../Redux/Actions/authActions'
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import LockOpenIcon from '@material-ui/icons/LockOpen';
// core components
import GridContainer from "../GridContainer.js";
import GridItem from "../GridItem.js";
import Button from "../Button.js";
import Card from "../Card.js";
import CardBody from "../CardBody.js";
import CardHeader from "../CardHeader.js";
import CustomInput from "../CustomInput.js";

import red from '@material-ui/core/colors/red';

import loginPageStyle from "../../../Assets/loginPageStyle.js";

const useStyles = makeStyles(loginPageStyle);

function LoginPage({signIn, authError}) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();

  const redColor = red[500];

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (event) => {
    if (event.target.id === 'email') {
      setEmail(event.target.value)
    } else if (event.target.id === 'password') {
      setPassword(event.target.value)
    }
  }

  const submit = (event) => {
    // authenticate the user
    event.preventDefault()

    const credentials = {
      email: email,
      password: password,
    }

    signIn(credentials)
  }

  return (
    <div>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <form className={classes.form}>
                <CardHeader
                  color='red'
                  signup
                  className={classes.cardHeader}
                >
                  <h4 className={classes.cardTitle}>
                    Login
                  </h4>
                </CardHeader>
                <CardBody signup>
                  <CustomInput
                    id="email"
                    textChange={handleChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      placeholder: "Email...",
                      type: "email",
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    id="password"
                    textChange={handleChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      placeholder: "Password",
                      type: "password",
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon className={classes.inputIconsColor}>
                            <LockOpenIcon />
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <div className={classes.textCenter}>
                {authError ? <p><font color="red">{authError}</font></p> : null}
                  <Button 
                    simple color="rose" 
                    size="lg"
                    onClick={submit}
                  >
                    Get Started
                  </Button>
                </div>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    authError: state.auth.authError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => {dispatch(signIn(credentials))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
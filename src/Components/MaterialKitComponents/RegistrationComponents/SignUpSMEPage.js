/*eslint-disable*/
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import LockIcon from '@material-ui/icons/Lock';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
// core components
import GridContainer from "../GridContainer.js";
import GridItem from "../GridItem.js";
import Button from "../Button.js";
import Card from "../Card.js";
import CardBody from "../CardBody.js";
import InfoArea from "../InfoArea.js";
import CustomInput from "../CustomInput.js";
// for signing up
import { connect } from 'react-redux'
import { signUpSME } from '../../../Redux/Actions/authActions'

import signupPageStyle from "../../../Assets/signupPageStyle.js";

const useStyles = makeStyles(signupPageStyle);

function SignUpSMEPage({signUpSME, authError, ...rest }) {

  // state for getting signup info
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)

  const [checked, setChecked] = useState([1]);

  const handleChange = (event) => {
    if (event.target.id === 'email') {
      setEmail(event.target.value)
    } else if (event.target.id === 'password') {
      setPassword(event.target.value)
    } else if (event.target.id === 'firstName') {
      setFirstName(event.target.value)
    } else if (event.target.id === 'lastName') {
      setLastName(event.target.value)
    }
  }

  const submit = (event) => { 
    event.preventDefault()
    const newUser = {
      email,
      password,
      firstName,
      lastName
    }
    signUpSME(newUser)
  }

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Apply</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={5} md={5}>
                    <InfoArea
                      className={classes.infoArea}
                      title="Earn Income"
                      description="Get paid for the knowledge and experience you currently have. Companies developing products for the military need to speak with an end user. That's you!"
                      icon={AttachMoneyIcon}
                      iconColor="success"
                    />
                    <InfoArea
                      className={classes.infoArea}
                      title="Contribute"
                      description="Have great ideas? Get paid by contributing useful content."
                      icon={EmojiObjectsIcon}
                      iconColor="info"
                    />
                    <InfoArea
                      className={classes.infoArea}
                      title="Be in a Community"
                      description="Meet other veterans and be involved in a community seeking the good of those who fight for ours."
                      icon={Group}
                      iconColor="primary"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={5} md={5}>
                    <form className={classes.form}>
                      <Grid container spacing={2}>
                      <Grid item xs>
                      <CustomInput
                        id='firstName'
                        textChange={handleChange}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "First Name..."
                        }}
                      />
                      </Grid>
                      <Grid item xs>
                      <CustomInput
                        id='lastName'
                        textChange={handleChange}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          placeholder: "Last Name..."
                        }}
                      />
                      </Grid>
                      </Grid>
                      <CustomInput
                        id='email'
                        textChange={handleChange}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Email..."
                        }}
                      />
                      <CustomInput
                        id='password'
                        textChange={handleChange}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <LockIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          type: 'password',
                          placeholder: "Password...",
                          autoComplete: "off"
                        }}
                      />
                      <FormControlLabel
                        classes={{
                          label: classes.label
                        }}
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggle(1)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                            checked={checked.indexOf(1) !== -1 ? true : false}
                          />
                        }
                        label={
                          <span>
                            I agree to the{" "}
                            <a href="#pablo">terms and conditions</a>.
                          </span>
                        }
                      />
                      <div className={classes.textCenter}>
                        <Button 
                          round 
                          color="pinterest"
                          onClick={submit}
                        >
                          Get started
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpSME: (newUser) => {dispatch(signUpSME(newUser))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpSMEPage)

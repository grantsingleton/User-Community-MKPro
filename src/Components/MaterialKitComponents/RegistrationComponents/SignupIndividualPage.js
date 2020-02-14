/*eslint-disable*/
import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import LockIcon from '@material-ui/icons/Lock';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
// core components
import GridContainer from "../GridContainer.js";
import GridItem from "../GridItem.js";
import Button from "../Button.js";
import Card from "../Card.js";
import CardBody from "../CardBody.js";
import InfoArea from "../InfoArea.js";
import CustomInput from "../CustomInput.js";
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
// for signing up 
import {connect} from 'react-redux'
import {signUp} from '../../../Redux/Actions/authActions'
import {getFirestore} from 'redux-firestore'

import signupPageStyle from "../../../Assets/signupPageStyle.js";

const useStyles = makeStyles(signupPageStyle);

function SignUpIndividualPage({ signUp, authError, ...rest }) {

  // state for getting signup info
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)

  const [checked, setChecked] = React.useState([1]);

  const handleChange = (event) => {
    if (event.target.id === 'email') {
      setEmail(event.target.value)
    } else if (event.target.id === 'password') {
      setPassword(event.target.value)
    } else if (event.target.id === 'username') {
      setUsername(event.target.value)
    }
  }

  const submit = (event) => { 
    event.preventDefault()
    // authenticate the user

    // Check if the username is taken
    const firestore = getFirestore()
    var usernameExists = false
    firestore.collection("users").where("username", "==", username)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().username === username)
            usernameExists = true
        });
        if (usernameExists) {
          setStatus('This username is taken')
        }
        else {
          const newUser = {
            email: email,
            password: password,
            username: username,
          }
          signUp(newUser)
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
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
              <h2 className={classes.cardTitle}>Register</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={5} md={5}>
                    <InfoArea
                      className={classes.infoArea}
                      title="Ask Questions"
                      description="Need to know something? Post a question in the forum and get an answer from a community of enthusiasts and experts."
                      icon={EmojiPeopleIcon}
                      iconColor="rose"
                    />
                    <InfoArea
                      className={classes.infoArea}
                      title="Contribute"
                      description="Contribute your knowledge and experience to help build a safer tomorrow."
                      icon={EmojiObjectsIcon}
                      iconColor="primary"
                    />
                    <InfoArea
                      className={classes.infoArea}
                      title="Community"
                      description="Talk with others interested in the same things you are."
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={5} md={5}>
                    <form className={classes.form}>
                      <CustomInput
                        id='username'
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
                          placeholder: "Username...",
                          autoComplete: "off"
                        }}
                      />
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
                        {status ? <p><font color="red">{status}</font></p> : null}
                        {authError ? <p><font color="red">{authError}</font></p> : null}
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
    signUp: (newUser) => {dispatch(signUp(newUser))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpIndividualPage)

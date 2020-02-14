/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button as MUIButton} from '@material-ui/core';
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
import BusinessIcon from '@material-ui/icons/Business';
// core components
import GridContainer from "../GridContainer.js";
import GridItem from "../GridItem.js";
import Button from "../Button.js";
import Card from "../Card.js";
import CardBody from "../CardBody.js";
import InfoArea from "../InfoArea.js";
import CustomInput from "../CustomInput.js";

import signupPageStyle from "../../../Assets/signupPageStyle.js";

const useStyles = makeStyles(signupPageStyle);

function SignUpBusinessPage({ ...rest }) {
  const [checked, setChecked] = React.useState([1]);
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
              <h2 className={classes.cardTitle}>Register your Business</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={5} md={5}>
                    <InfoArea
                      className={classes.infoArea}
                      title="Develop Better Products"
                      description="This platform is designed to give businesses the help they need to develop the best products for the U.S. Military."
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      className={classes.infoArea}
                      title="Talk to Experts"
                      description="Find a subject matter expert who will give you insight into what it would be like to use your product in the field. Don't guess anymore, find out what they actually need."
                      icon={Code}
                      iconColor="primary"
                    />
                    <InfoArea
                      className={classes.infoArea}
                      title="Customer Interviews"
                      description="Interview end users who will be using your product! Gain valuable insight to help you as a large Business or a Start Up. You need to know what the end user needs. This is the place to find out!"
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={5} md={5}>
                    <form className={classes.form}>
                      <CustomInput
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
                              <BusinessIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Company name..."
                        }}
                      />
                      <CustomInput
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
                          placeholder: "Password..."
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
                        <Button round color="pinterest">
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

export default SignUpBusinessPage

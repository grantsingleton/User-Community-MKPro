import React, {useState} from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { updateBOS, updateJobRank} from '../../../Redux/Actions/userActions'
import { Redirect } from 'react-router-dom'
import TagsInput from "react-tagsinput";


//Style
import selectStyles from "../../../Assets/customSelectStyle.js";
// Material Kit
// core components
import GridContainer from '../../MaterialKitComponents/GridContainer'
import GridItem from '../../MaterialKitComponents/GridItem'
import { connect } from 'react-redux'
import CustomInput from '../../MaterialKitComponents/CustomInput';

const matKitStyles = makeStyles(selectStyles)

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '50px'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Branch of Service', 'Expertise', 'Skills', 'Upload', 'Submit'];
}

function getStepContent(matKitClasses, 
                        stepIndex, 
                        branch, 
                        handleBranchChange, 
                        separationDate, 
                        handleSepDateChange, 
                        job, 
                        handleJobChange,
                        rank,
                        handleRankChange,
                        skillTags,
                        handleSkillTags
                        ) {

  const jobAcronymFactory = {
    'Navy': 'Rate',
    'Army': 'MOS',
    'Marines': 'MOS',
    'Air Force': 'AFSC',
  }


  const ranks = ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'W-3', 'W-4', 'W-5', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10']

  switch (stepIndex) {
    case 0:
      return (
        <Paper elevation={1}>
          <GridContainer alignItems='center' direction='column' spacing={5}>
            <GridItem xs={6} sm={6} md={5} lg={5} md={5} lg={5}>
              <FormControl fullWidth className={matKitClasses.selectFormControl}>
                <InputLabel
                  htmlFor="simple-select"
                >
                  Branch of Service
                </InputLabel>
                <Select
                  MenuProps={{
                    className: matKitClasses.selectMenu
                  }}
                  classes={{
                    select: matKitClasses.select
                  }}
                  value={branch}
                  onChange={handleBranchChange}
                  inputProps={{
                    name: "selectBranch",
                    id: "select-branch"
                  }}
                >
                <MenuItem 
                  value='Army'
                  classes={{
                    root: matKitClasses.selectMenuItem,
                    selected: matKitClasses.selectMenuItemSelected
                  }}
                >
                  Army
                </MenuItem>
                <MenuItem 
                  value='Navy'
                  classes={{
                    root: matKitClasses.selectMenuItem,
                    selected: matKitClasses.selectMenuItemSelected
                  }}
                >
                  Navy
                </MenuItem>
                <MenuItem 
                  value='Marines'
                  classes={{
                    root: matKitClasses.selectMenuItem,
                    selected: matKitClasses.selectMenuItemSelected
                  }}
                >
                  Marines
                </MenuItem>
                <MenuItem 
                  value='Air Force'
                  classes={{
                    root: matKitClasses.selectMenuItem,
                    selected: matKitClasses.selectMenuItemSelected
                  }}
                >
                  Air Force
                </MenuItem>
              </Select>
              </FormControl>
              </GridItem>
              <GridItem xs={12} sm={6} md={5} lg={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Separation Date"
                    value={separationDate}
                    onChange={handleSepDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </GridItem>
          </GridContainer>
        </Paper>
      )
    case 1:
      return (
        <Paper elevation={1}>
        <GridContainer alignItems='center' direction='column' spacing={5}>
          <GridItem xs={6} sm={6} md={5} lg={5} md={5} lg={5}>
            <CustomInput
              labelText={`Enter ${branch} ${jobAcronymFactory[branch]}`}
              id="float"
              value={job}
              textChange={handleJobChange}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={5} lg={5}>
            <FormControl fullWidth className={matKitClasses.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
              >
                Rank
              </InputLabel>
              <Select
                MenuProps={{
                  className: matKitClasses.selectMenu
                }}
                classes={{
                  select: matKitClasses.select
                }}
                value={rank}
                onChange={handleRankChange}
                inputProps={{
                  name: "selectRank",
                  id: "select-rank"
                }}
              >
              {ranks.map(rank => (
                <MenuItem 
                  value={rank}
                  key={rank}
                  classes={{
                    root: matKitClasses.selectMenuItem,
                    selected: matKitClasses.selectMenuItemSelected
                  }}
                >
                {rank}
              </MenuItem>
              ))}
            </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
      </Paper>
      )
    case 2:
      return (
        <Paper elevation={1}>
          <h1>Enter skills here</h1>
          <TagsInput
            value={skillTags}
            onChange={handleSkillTags}
            tagProps={{ className: "react-tagsinput-tag rose" }}
          />
        </Paper>
      )
      case 3: 
        return (
          <Paper elevation={1}>
            <h1>Upload</h1>
            <p>Use a Material Kit File uploader so that they can upload dd214</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>
          </Paper>
        )
        case 4: 
        return (
          <Paper elevation={1}>
            <h1>Overview and Submit</h1>
            <p>Give an overview of the info they have entered and offer a 'submit' button.</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>
          </Paper>
        )
    default:
      return 'Unknown stepIndex';
  }
}

function SMEApplication({profileProps, updateBOS, updateJobRank, auth, profile}) {

  const classes = useStyles();
  const matKitClasses = matKitStyles()
  // This state determines what step in the 'stepper' we are on
  const [activeStep, setActiveStep] = useState( (profileProps.branchOfService && profileProps.dateOfSeparation) ? ( (profileProps.job && profileProps.rank) ? 2 : 1 ) : 0 );

  /*
    Here is the state for the Application entries
  */
  // Branch of service
  const [branch, setBranch] = useState(profileProps.branchOfService ? profileProps.branchOfService : '')
  // Separation Date
  const [separationDate, setSeparationDate] = useState(profileProps.dateOfSeparation ? profileProps.dateOfSeparation.toDate() : null);
  // The MOS, Rate, or AFSC
  const [job, setJob] = useState(profileProps.job ? profileProps.job : '')
  // The rank (E-1 to O-10)
  const [rank, setRank] = useState(profileProps.rank ? profileProps.rank : '')
  // The list of skills the applicant has listed
  const [skillTags, setSkillTags] = useState(["pizza", "pasta", "parmesan"])

  /*
    Here are the handlers for the application input
    They are passed into the getStepContent function
  */
  const handleBranchChange = event => {
    setBranch(event.target.value);
  };

  const handleSepDateChange = date => {
    setSeparationDate(date);
  };

  const handleJobChange = event => {
    setJob(event.target.value);
  };

  const handleRankChange = event => {
    setRank(event.target.value);
  };

  const handleSkillTags = regularTags => {
    setSkillTags(regularTags);
  };

  const steps = getSteps();

  const handleNext = () => {
    // If nothing was updated, then do not write the same thing to the database again 
    if (activeStep === 0 && ((branch !== profile.branchOfService) || (separationDate.getTime() !== profile.dateOfSeparation.toDate().getTime()))) {
      const user = {
        branch: branch,
        separationDate: separationDate
      }
      updateBOS(user)
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    else if (activeStep === 1 && ((job !== profile.job) || (rank !== profile.rank))) {
      const user = {
        job: job,
        rank: rank
      }
      updateJobRank(user)
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (!profile.isLoaded || !auth.isLoaded) {
    return <div/> 
  } 
  else if (!auth.uid) {
    return <Redirect to='/' />
  } 

  return (
    <Container maxWidth='lg'>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(matKitClasses, 
                              activeStep, 
                              branch, 
                              handleBranchChange, 
                              separationDate, 
                              handleSepDateChange, 
                              job, 
                              handleJobChange,
                              rank,
                              handleRankChange,
                              skillTags,
                              handleSkillTags
                              )}
                <div style={{marginTop: '30px'}} >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleNext}
                    disabled={(activeStep === 0 && (branch === '' || !separationDate))}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              </div>
          </div>
        )}
      </div>
    </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBOS: (user) => dispatch(updateBOS(user)),
    updateJobRank: (user) => dispatch(updateJobRank(user))
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SMEApplication)
import React, { Component, Fragment } from "react";
import { Admin, 
         Challenges, 
         Profile, 
         Consultants, 
         Forum, 
         Login, 
         Media, 
         Pricing, 
         SignupAsIndividual, 
         Landing, 
         ForgotPW, 
         ForumTopics, 
         ForumDiscussion, 
         ChooseRegistrationType,
         SignUpAsBusiness,
         SignUpAsSME,
         Application,
        } from './Pages'
import { Navigation } from './Components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../MkAssets/scss/material-kit-pro-react.scss?v=1.8.0'

export default class extends Component {

  render() {
    return (
      <Fragment>
          <Router>
            <Navigation />
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/admin' component={Admin} />
                <Route path='/challenges' component={Challenges} />
                <Route path='/experts' component={Consultants} />
                <Route path='/forgot-pw' component={ForgotPW} />
                <Route path='/forum' exact component={Forum} />
                <Route path='/login' component={Login} />
                <Route path='/media' component={Media} />
                <Route path='/pricing' component={Pricing} />
                <Route path='/consultant-application' component={Application} />
                <Route path='/profile/:user_id' exact component={Profile} />
                <Route path='/choose-registration' exact component={ChooseRegistrationType} />
                <Route path='/choose-registration/Individual' component={SignupAsIndividual} />
                <Route path='/choose-registration/Business' component={SignUpAsBusiness} />
                <Route path='/choose-registration/Consultant' component={SignUpAsSME} />
                <Route path='/forum/:forum_id/:genre_id' exact component={ForumTopics} />
                <Route path='/forum/:forum_id/:genre_id/:topic_id' exact component={ForumDiscussion} />
              </Switch>
          </Router>
      </Fragment>
    );
  }
}


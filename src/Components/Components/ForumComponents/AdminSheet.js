import React from 'react'
import Grid from '@material-ui/core/Grid';
import NewForum from './NewForum';
import NewSection from './NewSection';
import ArrangeForums from './ArrangeForums'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


function AdminSheet({forums}) {

    const root = {
      flexGrow: 1,
    }

    if (!forums) {
      console.log("forums", forums)

      return <div />
    }
    console.log("ASForums", forums)

    if(forums.length > 0) {
      return (
        <Grid container style={root} spacing={1}>
          <Grid item sm>
            <Grid container={true} style={{marginTop: '10px'}} justify='space-between' spacing={1}> 
              <Grid item xs={12}>
                <ArrangeForums />
              </Grid>
              <Grid item xs={6}>
                <NewForum forums={forums}/>
              </Grid>
                <Grid item xs={6}>
                  <NewSection />
                </Grid>
            </Grid> 
          </Grid>
        </Grid>
      )
    }
    else {
      return (
        <Grid container style={root} spacing={1}>
        <Grid item sm>
          <Grid container={true} style={{marginTop: '10px'}} justify='space-between' spacing={1}> 
              <Grid item xs={6}>
                <NewSection />
              </Grid>
          </Grid> 
        </Grid>
      </Grid>
      )
    }
  }

export default compose(
  firestoreConnect(() => ['forum']),  //connects to the collection 'forums'
  connect((state) => ({
    forums: state.firestore.ordered.forum
  }))
)(AdminSheet)
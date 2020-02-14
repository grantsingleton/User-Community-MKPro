import React from 'react'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InfoAreaUpdated from '../MaterialKitComponents/InfoAreaUpdated'
import WorkIcon from '@material-ui/icons/Work';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';

function ChooseRegistrationType() {

  return (
    <Container maxWidth='sm'>
      <Paper elevation={2} style={{marginTop: '50px'}}>
        <InfoAreaUpdated
          title="Individual"
          description="Contribute to a community seeking to help create the best products for our men and women in arms."
          icon={PersonIcon}
          iconColor="rose"
        />
        <InfoAreaUpdated
          title="Business"
          description="Find subject matter experts who can help you develop the best product possible. Post questions in the forums or talk to an expert one on one."
          icon={BusinessIcon}
          iconColor="primary"
        />
        <InfoAreaUpdated
          title="Consultant"
          description="Have military experience? Apply to become part of the ecosystem of experts. Your profile will be put in front of top companies who want to pay for your knowledge so they can build better products."
          icon={WorkIcon}
          iconColor="info"
        />
      </Paper>
     
    </Container>
  )
}
export default ChooseRegistrationType
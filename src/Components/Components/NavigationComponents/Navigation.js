import React, { Fragment } from 'react';
import Header from './Header'
import PageNavigation from './PageNavigation'
import HeaderSmall from './HeaderSmall'
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Navigation() {
  const largeScreen = useMediaQuery('(min-width:500px)');
  
  if (largeScreen) {
    return (
      <Fragment>
        <Header />
        <PageNavigation />
      </Fragment>
    );
  }
  else {
    return (
      <Fragment>
        <HeaderSmall />
      </Fragment>
    );
  }
}
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { useScroll } from 'react-router-scroll';

import DashboardContainer from './containers/DashboardContainer';
import WorkshopLandingContainer from './containers/WorkshopLandingContainer';

export default (
  <Route path="/">
    <IndexRoute component={ DashboardContainer } />

    <Route
      path="/workshops/:workshop_id/landing"
      component={ WorkshopLandingContainer }
    />
  </Route>
)

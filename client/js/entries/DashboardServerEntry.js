import React, { Component, PropTypes } from 'react'
import { applyRouterMiddleware, browserHistory, createMemoryHistory, Router, match, RouterContext} from 'react-router';
import { useScroll } from 'react-router-scroll';
import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import routes from '../routes'
import createStore from "../store/createStore";

class DashboardServerEntry extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    // const changeRouteHandler = (prevProps, nextProps) => {
    //   return prevProps && (!nextProps.routes[nextProps.routes.length - 1].noScroll
    //       || !prevProps.routes[prevProps.routes.length - 1].noScroll) && nextProps.location.pathname !== prevProps.location.pathname;
    // };

    let initialState, history, router;

    if (typeof window === "undefined") {
      const initialState = this.props.initial_state;
      history = createMemoryHistory();
      match({ routes, location: this.props.location, history }, (err, redirect, props) => {
        if (props) {
          router = <RouterContext { ...props } />;
        }
      });
    } else {
      initialState = window.__INITIAL_STATE__;
      history = browserHistory;
      router = <Router history={history}>
        {routes}
      </Router>;
    }

    let store = createStore(initialState);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Provider store={store}>
          {router}
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default DashboardServerEntry

import React, { Component, PropTypes } from 'react'
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    const changeRouteHandler = (prevProps, nextProps) => {
      return prevProps && (!nextProps.routes[nextProps.routes.length - 1].noScroll
         || !prevProps.routes[prevProps.routes.length - 1].noScroll) && nextProps.location.pathname !== prevProps.location.pathname;

    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Provider store={store}>
          <Router history={browserHistory} 
                  render={applyRouterMiddleware(useScroll(changeRouteHandler))}
                  children={routes}
          />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default AppContainer

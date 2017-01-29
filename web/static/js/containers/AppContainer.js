import React, { Component, PropTypes } from 'react'

import {
  applyRouterMiddleware,
  browserHistory,
  Router
} from 'react-router';

import { useScroll } from 'react-router-scroll';
import { Provider } from 'react-redux'

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
      <Provider store={store}>
        <Router history={browserHistory} 
                render={applyRouterMiddleware(useScroll(changeRouteHandler))}
                children={routes}
        />
      </Provider>
    )
  }
}

export default AppContainer

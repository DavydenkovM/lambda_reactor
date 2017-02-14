import 'phoenix'

import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from 'containers/AppContainer'
import RedBox from 'redbox-react'

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('index')

let render = () => {
  ReactDOM.render(
    <AppContainer />,
    MOUNT_NODE
  )
}


// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================

render()

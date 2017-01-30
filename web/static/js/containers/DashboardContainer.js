import React, { PropTypes  } from 'react';
import { connect  } from 'react-redux';
import { bindActionCreators  } from 'redux';

// import * as DashboardActions from 'actions/DashboardActions';

// import Header from 'components/shared/Header/Header';
// import Footer from 'components/shared/Footer/Footer';

import css from './DashboardContainer.sass';
// import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

function select(state) {
  return {
  };
}

class DashboardContainer extends React.Component {
  render() {
    return (
      <div className='qwe'>
      <AppBar title="\m/" />

      </div>
    );
  }
}

export default connect(select)(DashboardContainer);

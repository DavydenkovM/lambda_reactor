import React, { PropTypes  } from 'react';
import { connect  } from 'react-redux';
import { bindActionCreators  } from 'redux';

// import * as DashboardActions from 'actions/DashboardActions';

// import Header from 'components/shared/Header/Header';
// import Footer from 'components/shared/Footer/Footer';

import css from './DashboardContainer.sass';

function select(state) {
  return {
  };
}

class DashboardContainer extends React.Component {
  render() {
    return (
      <div className='qwe'>
        Hello from React
      </div>
    );
  }
}

export default connect(select)(DashboardContainer);

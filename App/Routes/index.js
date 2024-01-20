import {NavigationContainer} from '@react-navigation/native';

import React, {useEffect} from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {connect} from 'react-redux';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: true,
    };
  }

  render() {
    return (
      <NavigationContainer>
        {this.props.accessToken == null ? <AuthStack /> : <AppStack />}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.authReducer.uid,
    accessToken: state.authReducer.accessToken,
  };
};

export default connect(mapStateToProps, null)(Router);

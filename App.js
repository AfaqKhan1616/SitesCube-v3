import React, {useEffect} from 'react';
import Router from './App/Routes/index';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './App/Redux/store';

const App = props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;

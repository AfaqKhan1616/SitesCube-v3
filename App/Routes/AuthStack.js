import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import Login from '../Screens/Login/Login';
import Splash from '../Screens/Splash/Splash';
import Home from '../Screens/Home/Home';
import {createStackNavigator} from '@react-navigation/stack';
import CarDetail from '../Screens/CarDetail/CarDetail';
const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CarDetail" component={CarDetail} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;

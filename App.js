import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import NewClass from './components/NewClass';
import NewRace from './components/NewRace';
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './components/reducers/rootReducer'




const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component {

  
  
  render (){

    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomePage
  },
  Login: {
    screen: LoginPage
  }, 
  SignUp: {
    screen: SignUpPage
  },
  Profile: {
  screen: ProfilePage
  }, 
  NewClass: {
    screen: NewClass
  }, 
  NewRace: {
    screen: NewRace
  }
}, {
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default (App)

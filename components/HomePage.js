import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Button, Text, View, ImageBackground, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


class HomePage extends React.Component {

  getToken = async () => {
    let token = ''
    try {
      token = await AsyncStorage.getItem('token');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    if(token){
      this.props.SaveToken(token)
      this.props.navigation.navigate('Profile')
    }
  }

  componentDidMount(){
    this.getToken()
  }

    render (){
      // console.log(this.props)
      let pic = {
        uri: 'https://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif'
      };
      return (
        <View style={styles.container}>
          <ImageBackground source={pic} style={styles.logoBG}>
            <Text style={styles.logoWelcome} >Welcome to</Text>
            <Text style={styles.logoSQ} >SideQuest</Text>
          </ImageBackground>
          <Button
          title="Login"
          onPress={() =>
            this.props.navigation.navigate('Login')
          }
        />
        <Button
          title="SignUp"
          onPress={() =>
            this.props.navigation.navigate('SignUp')
          }
        />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoBG: {
      height: 350,
      // marginTop: 150,
      // borderStyle: 'ridge',
      // boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)',
      borderRadius: 10
    },
    logoWelcome: {
      textAlign: 'center',
      color: 'white',
      marginTop: 75
      },
    logoSQ: {
      textAlign: 'center',
     color: 'white',
     fontSize: 75,
     marginTop: 50
    }
  });
  
  const mapStateToProps = (store) => {
    return {
      token: store.token
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      SaveToken: (token) => {
        dispatch({type: 'SAVE_TOKEN', token: token})
      }
    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage);  
  
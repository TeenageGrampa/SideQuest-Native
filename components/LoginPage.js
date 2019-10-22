import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage, Button } from 'react-native';
import { connect } from 'react-redux'
import { createStackNavigator, createAppContainer } from 'react-navigation';


class LoginPage extends React.Component {

  state = {
    username: '',
    password: ''
  }

  saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  handleSubmit = async () => {
    fetch('https://sidequest-api.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        this.saveToken(data.token)
        this.props.SaveToken(data.token)
        fetch('https://sidequest-api.herokuapp.com/profile',{
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
        })
        .then(res => res.json())
        .then(
          this.props.navigation.navigate('Profile')
        )}   
    })
  }
    
    render (){
      let pic = {
        uri: 'http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif'
      };
      return (
        <View className="container">
        {/* <form onSubmit={this.handleSubmit} className="box " style={{width: 900, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', marginTop: 200, marginLeft: 200}}> */}
          <Text >Log in please!</Text>
          <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(text) => this.setState({ username: text})}
          value={this.state.username}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text})}
          value={this.state.password}
        />
        <Button title="Login"
          onPress={() =>
            this.handleSubmit()
          }/>
      </View>
      );
    }
  }
  
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  // });

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);  
import React, { Component } from 'react';
import { StyleSheet, Button, Text, TextInput, View, ImageBackground } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


class SignUpPage extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = () => {
    
    fetch('https://sidequest-api.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(r => r.json()).then(data => {
      if (data.token) {
        localStorage.token = data.token


        this.props.navigation.navigate('Profile')
      } else {
        alert('Username Taken')
      }
    })
    }


    render (){
      let pic = {
        uri: 'http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif'
      };
      return (
        <View className="container">
        {/* <form onSubmit={this.handleSubmit} className="box " style={{width: 900, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', marginTop: 200, marginLeft: 200}}> */}
          <Text >Sign up please!</Text>
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
        <Button title="SignUp"
          onPress={() =>
            this.handleSubmit()
          }/>
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
  });
  
  export default (SignUpPage)
  
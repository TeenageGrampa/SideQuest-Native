import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { createStackNavigator, createAppContainer } from 'react-navigation';


class ProfilePage extends React.Component {

  state = {
    username: '',
    password: ''
  }

  logout = async () => {
    try {
        await AsyncStorage.removeItem('token');
        this.props.navigation.navigate('Home')
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
  }

  componentDidMount(){
    fetch('https://sidequest-api.herokuapp.com/profile',{
        headers: {
          'Authorization': `Bearer ${this.props.token}`
        }
        })
        .then(res => res.json())
        .then(user => this.props.LogIn(user))
    }

    render (){
        console.log(this.props)
      let pic = {
        uri: 'http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif'
      };
      return (
        <View className="container">
        {/* <form onSubmit={this.handleSubmit} className="box " style={{width: 900, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', marginTop: 200, marginLeft: 200}}> */}
        {
          this.props.currentUser ?
          <Text className="title" style={{textAlign: 'center'}}>Welcome {this.props.currentUser.username}!</Text> :
          <Text>getting your info...</Text>
          
        }<Button
        title="NewCharacter"
        onPress={() =>
          this.props.navigation.navigate('NewClass')
        }
        />
        <Button
            title="Logout"
            onPress={() =>
            this.logout()
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
  });

  const mapStateToProps = (store) => {
    return {
      token: store.token,
      currentUser: store.currentUser,
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);    
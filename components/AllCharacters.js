import React from  'react'
import { connect } from 'react-redux'
import PartyMember from'./PartyMember'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Button, Text, View, Image, ImageBackground, Picker, SafeAreaView, TextInput, AsyncStorage } from 'react-native';




class AllCaracters extends React.Component{

    state = {
        characters: []
    }
    
    componentDidMount(){
        fetch(`https://sidequest-api.herokuapp.com/users/${this.props.currentUser.id}`)
        .then(r => r.json()).then(user  => {
            for(let i= 0; i < user.characters.length; i++){
                fetch(`https://sidequest-api.herokuapp.com/characters/${user.characters[i].id}`)
                .then( r => r.json()).then( character => {
                    this.setState({
                        characters: [...this.state.characters, character]
                    })
                })
            }
        })
        
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

    



    render(){
        console.log(this.state)
        const characters = this.state.characters.map(character  =>
        <View key={character.id} ><PartyMember character={character} player={this.props.currentUser}/></View>)
        return(
            <View>
                <Button onPress={() => this.logout()} title="Logout"/>
                <Text>All Characters:</Text>
                <View>{characters}</View>
            </View>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        currentUser: store.currentUser,
        newCharClass: store.newCharClass,
        newCharRace: store.newCharRace,
        stats: store.stats,
        mods: store.mods,
        skills: store.skills
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddClass: (charClass) => {
          dispatch({ type: 'ADD_CLASS', attribute: charClass })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCaracters);
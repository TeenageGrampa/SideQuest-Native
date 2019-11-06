import React from  'react'
import { StyleSheet, Button, Text, View, Image, ImageBackground, Picker, SafeAreaView, TextInput, AsyncStorage } from 'react-native';




class PartyMember extends React.Component{

    // getImg = (charClass) => {
    //     if(charClass === 'Rogue'){
    //         return require('./hooded-assassin.png')
    //     } else if(charClass === 'Barbarian'){
    //         return require('./barbarian.png')
    //     } else if(charClass === 'Paladin'){
    //         return require('./elf-helmet.png')
    //     } else if(charClass === 'Warlock'){
    //         return require('./warlock-hood.png')
    //     } else if(charClass === 'Ranger'){
    //         return require('./cowled.png')
    //     } else if(charClass === 'Bard'){
    //         return require('./musical-notes.png')
    //     } else if(charClass === 'Cleric'){
    //         return require('./pope-crown.png')
    //     } else if(charClass === 'Druid'){
    //         return require('./wolf-head.png')
    //     } else if(charClass === 'Fighter'){
    //         return require('./swordman.png')
    //     } else if(charClass === 'Monk'){
    //         return require('./monk-face.png')
    //     } else if(charClass === 'Sorcerer'){
    //         return require('./robe.png')
    //     } else if(charClass === 'Wizard'){
    //         return require('./wizard-staff.png')
    //     }
    // }
    
    render(){
        // const clasImg = this.getImg(this.props.character.class[0].name)
        // console.log(this.props)
        return(
            <View>
                <View>
                    <View >
                        {/* <img alt="" src={clasImg} /> */}
                        {/* <Link to={{pathname:"/CharacterSheet", state: { character: this.props.character }}} > */}
                        <Button title="Character Sheet" />
                        {/* </Link>  */}
                    </View>
                </View>
                <View>
                    <View>
                        <View>
                        <Text>Name: {this.props.character.name}</Text>
                        <Text>Class: {this.props.character.class[0].name}</Text>
                        </View>
                        <View>
                        <Text>Race: {this.props.character.race[0].name}</Text>
                        <Text>User: {this.props.player.username}</Text>
                        
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default PartyMember
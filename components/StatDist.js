import React from 'react'
import { StyleSheet, Button, Text, View, Image, ImageBackground, Picker, SafeAreaView, TextInput } from 'react-native';


class StatDist extends React.Component {

    state = {
        statVals: [],
        strength: false,
        dexterity:false,
        constitution: false,
        intelligence: false,
        wisdom: false,
        charisma: false

    }

    handleClick = (value) => {
        this.props.getStat(value)
        this.setState({
            [value]: true
        })
    }

    resetStats = () => {
        this.setState({
            strength: false,
            dexterity:false,
            constitution: false,
            intelligence: false,
            wisdom: false,
            charisma: false
        })
    }
    

    render(){
        return(
            <View>
                {this.state.strength === false ? <Button  title="Strength"
                 onPress={() =>
                    this.handleClick("strength")
                    }/> : null }
                {this.state.dexterity === false ? <Button title="Dexterity" 
                 onPress={() =>
                    this.handleClick("dexterity")
                    }/> : null }
                {this.state.constitution=== false ? <Button title="Constitution" 
                 onPress={() =>
                    this.handleClick("constitution")
                    }/> : null }
                {this.state.intelligence === false ? <Button title="Itelligence" 
                 onPress={() =>
                    this.handleClick("intelligence")
                    }/> : null }
                {this.state.wisdom === false ? <Button title="Wisdom" 
                 onPress={() =>
                    this.handleClick("wisdom")
                    }/> : null }
                {this.state.charisma === false ? <Button title="Charisma" 
                 onPress={() =>
                    this.handleClick("charisma")
                    }/> : null }
                {/* <button onClick={this.resetStats}>reset</button> */}
            </View>
        )
    }
}

export default StatDist
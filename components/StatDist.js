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

    handleClick = (e) => {
        this.props.getStat(e.target.value)
        this.setState({
            [e.target.value]: true
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
                {this.state.strength === false ? <Button title="Strength"
                 onPress={() =>
                    this.handleClick()
                    }/> : null }
                {this.state.dexterity === false ? <Button title="Dexterity"
                 onPress={() =>
                    this.handleClick()
                    }/> : null }
                {this.state.constitution=== false ? <Button title="Constitution"
                 onPress={() =>
                    this.handleClick()
                    }/> : null }
                {this.state.intelligence === false ? <Button title="Itelligence"
                 onPress={() =>
                    this.handleClick()
                    }/> : null }
                {this.state.wisdom === false ? <Button title="Wisdom"
                 onPress={() =>
                    this.handleClick()
                    }/> : null }
                {this.state.charisma === false ? <Button title="Charisma"
                 onPress={() =>
                    this.handleClick()
                    }/> : null }
                {/* <button onClick={this.resetStats}>reset</button> */}
            </View>
        )
    }
}

export default StatDist
import React from  'react'
import { connect } from 'react-redux'
import { StyleSheet, Button, Text, View, Image, ImageBackground, Picker, SafeAreaView, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RaceInfo from './RaceInfo'


class NewCharacter extends React.Component{
    state = {
        allRaces: [],
        currentRace: 'Dwarf'
    }

    componentDidMount(){
        // fetch('https://sidequest-api.herokuapp.com/profile',{
        // headers: {
        //   'Authorization': `Bearer ${localStorage.token}`
        // }
        // })
        // .then(res => res.json())
        // .then(user => this.props.LogIn(user)
        // )
        fetch('https://api-beta.open5e.com/races/')
        .then(r => r.json())
        .then(data => this.setState({
            allRaces: data.results
        }))
    }

    handleChange = (e) =>{
        const newRace = e.target.value
        this.setState({
            currentRace: newRace
        })
    }

    saveRace = (charRace) => {
        this.props.AddRace(charRace)
    }

    handleNext = () => {
        fetch('https://sidequest-api.herokuapp.com/character_races', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.props.character_id,
                    name: this.props.newCharRace.name,
                    desc: this.props.newCharRace.desc,
                    age: this.props.newCharRace.age,
                    alignment: this.props.newCharRace.alignment,
                    size: this.props.newCharRace.size,
                    speed: this.props.newCharRace.speed.walk,
                    speed_desc: this.props.newCharRace.speed_desc,
                    languages: this.props.newCharRace.languages,
                    vision: this.props.newCharRace.vision,
                    traits: this.props.newCharRace.traits
                })
            }).then(r => r.json()).then(this.props.navigation.navigate('StatRoll'))
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }



    render(){
        const raceComps = this.state.allRaces.map(charRace => <RaceInfo key={charRace.id} saveRace={this.saveRace} charRace={charRace} /> )
        return(
            <SafeAreaView>
                <ScrollView>
            <View > 
            <Text>Choose Your Race:</Text>
            {/* <section className="hero" style={{marginBottom: 40, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>
                    <div className="hero-body">
                        <div className="container content">
                <h1 className="title" style={{color: 'white'}}>Choose Your Race:</h1>
                <h2 className="subtitle" style={{color: 'white'}}>Currently Selected: {this.props.newCharRace ? <div>{this.props.newCharRace.name} <button className="button is-primary is-inverted is-outlined" onClick={this.handleNext}>Confirm</button></div> : null}</h2>
                            <select className="select" onChange={this.handleChange}>
                                <option value="Dwarf">Dwarf</option>
                                <option value="Elf">Elf</option>
                                <option value="Halfling">Halfling</option>
                                <option value="Human">Human</option>
                                <option value="Dragonborn">Dragonborn</option>
                                <option value="Gnome">Gnome</option>
                                <option value="Half-Elf">Half-Elf</option>
                                <option value="Half-Orc">Half-Orc</option>
                                <option value="Tiefling">Tiefling</option>
                            </select>
                            <h2 style={{color: 'white'}} className="title">Chosen Class: {this.props.newCharClass.name}</h2>
                            <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100}}>Logout</button>
                            </div>
                    </div>
                </section> */}
                <View >
                    <Text>Currently Selected: </Text>
                
                    <View>{this.props.newCharRace ? <View><Text>{this.props.newCharRace.name}</Text> 
                    <Button title="Confirm"
                 onPress={() =>
                    this.handleNext()
                    }/></View> : null}</View>
                </View>
                <Picker
                selectedValue={this.state.currentRace}
                style={{ width: 100}}
                onValueChange={(itemValue) => this.setState({currentRace: itemValue})} >
                    <Picker.item value="Dwarf" label="Dwarf" />
                    <Picker.item value="Elf" label="Elf" />
                    <Picker.item value="Halfling" label="Halfling" />
                    <Picker.item value="Human" label="Human" />
                    <Picker.item value="Dragonborn" label="Dragonborn" />
                    <Picker.item value="Gnome" label="Gnome" />
                    <Picker.item value="Half-Elf" label="Half-Elf" />
                    <Picker.item value="Half-Orc" label="Half-Orc" />
                    <Picker.item value="Tiefling" label="Tiefling" />
                </Picker>
                {this.state.currentRace === 'Dwarf' ? raceComps[0] : null}
                {this.state.currentRace === 'Elf' ? raceComps[1] : null}
                {this.state.currentRace === 'Halfling' ? raceComps[2] : null}
                {this.state.currentRace === 'Human' ? raceComps[3] : null}
                {this.state.currentRace === 'Dragonborn' ? raceComps[4] : null}
                {this.state.currentRace === 'Gnome' ? raceComps[5] : null}
                {this.state.currentRace === 'Half-Elf' ? raceComps[6] : null}
                {this.state.currentRace === 'Half-Orc' ? raceComps[7] : null}
                {this.state.currentRace === 'Tiefling' ? raceComps[8] : null}
            </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (store) => {
    return {
      currentUser: store.currentUser,
      newCharClass: store.newCharClass,
      newCharRace: store.newCharRace,
      character_id: store.character_id
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddRace: (charRace) => {
          dispatch({ type: 'ADD_Race', attribute: charRace })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);
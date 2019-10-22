import React from  'react'
import { connect } from 'react-redux'
import ClassInfo from './ClassInfo'
import { StyleSheet, Button, Text, View, Image, ImageBackground, Picker, SafeAreaView, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



class NewClass extends React.Component{
    state = {
        allClasses: [],
        currentClass: 'barbarian',
        characterName: '',
        characterAlignment: 'True Neutral'
    }

    componentDidMount(){
        fetch('https://sidequest-api.herokuapp.com/profile',{
        headers: {
          'Authorization': `Bearer ${this.props.token}`
        }
        })
        .then(res => res.json())
        .then(user => this.props.LogIn(user)
        )
        fetch('https://api-beta.open5e.com/classes/')
        .then(r => r.json())
        .then(data => this.setState({
            allClasses: data.results
        }))
    }

    // handleChange = (e) =>{
    //     const newClass = e.target.value
    //     this.setState({
    //         currentClass: newClass
    //     })
    // }

    saveClass = (charClass) => {
        this.props.AddClass(charClass)
        
    }

    handleNext = () => {
        if(this.state.characterName){
            fetch('https://sidequest-api.herokuapp.com/characters', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.characterName,
                level: 1,
                alignment: this.state.characterAlignment,
                user_id: this.props.currentUser.id
            })
        }).then(r => r.json()).then(character => this.setState({
            character_id: character.id
        },() => {fetch('https://sidequest-api.herokuapp.com/character_classes', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.state.character_id,
                    name: this.props.newCharClass.name,
                    desc: this.props.newCharClass.desc,
                    hit_dice: this.props.newCharClass.hit_dice, 
                    armor_prof: this.props.newCharClass.armor_prof,
                    prof_weapons: this.props.newCharClass.prof_weapons,
                    prof_tools: this.props.newCharClass.prof_tools,
                    prof_saving_throws: this.props.newCharClass.prof_saving_throws,
                    prof_skills: this.props.newCharClass.prof_skills,
                    equipment: this.props.newCharClass.equipment,
                    spellcast_ability: this.props.newCharClass.spellcasting_ability
                })
            }).then(r => r.json()).then(this.props.AddCharID(this.state.character_id)).then(this.props.navigation.navigate('NewRace'))}))
        } else {
            alert('Your Character Needs a Name!')
        }
    }

    nameChange = (e) =>{
        this.setState({
            characterName: e.target.value
        })
    }
    alignmentChoice = (e) => {
        this.setState({
            characterAlignment: e.target.value
        })
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    // getImg = (charClass) => {
    //         if(charClass === 'Rogue'){
    //             return require('../assets/hooded-assassin.png')
    //         } else if(charClass === 'Barbarian'){
    //             return require('../assets/barbarian.png')
    //         } else if(charClass === 'Paladin'){
    //             return require('../assets/elf-helmet.png')
    //         } else if(charClass === 'Warlock'){
    //             return require('../assets/warlock-hood.png')
    //         } else if(charClass === 'Ranger'){
    //             return require('../assets/cowled.png')
    //         } else if(charClass === 'Bard'){
    //             return require('../assets/musical-notes.png')
    //         } else if(charClass === 'Cleric'){
    //             return require('../assets/pope-crown.png')
    //         } else if(charClass === 'Druid'){
    //             return require('../assets/wolf-head.png')
    //         } else if(charClass === 'Fighter'){
    //             return require('../assets/swordman.png')
    //         } else if(charClass === 'Monk'){
    //             return require('../assets/monk-face.png')
    //         } else if(charClass === 'Sorcerer'){
    //             return require('../assets/robe.png')
    //         } else if(charClass === 'Wizard'){
    //             return require('../assets/wizard-staff.png')
    //         }
    // }



    render(){
        // let pic = this.getImg(this.state.currentClass)
        const classComps = this.state.allClasses.map(charClass => <ClassInfo key={charClass.id} saveClass={this.saveClass} charClass={charClass} /> )
        return(
            <SafeAreaView>
                <ScrollView>
                <View >
                {/* <div className="container"> */}
                {/* <section className="hero" style={{backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>
                    <div className="hero-body">
                        <div className="container content">
                            <h1 className="title" style={{color: 'white'}}>
                                Name Your Character and Pick Alignment:
                            </h1>
                            <form className="columns">
                            <label className="column is-2" style={{color: 'white', textAlign: 'right'}}>Name: </label>
                            <input className="column is-2" type='text' placeholder="name" value={this.state.characterName} onChange={this.nameChange}/>
                            <label className="column is-2" style={{color: 'white', textAlign: 'right'}}>Alignment: </label>
                            <select className="column is-2" onChange={this.alignmentChoice}>
                                <option value="True Neutral">True Neutral</option>
                                <option value="Chaotic Neutral">Chaotic Neutral</option>
                                <option value="Lawful Neutral">Lawful Neutral</option>
                                <option value="True Evil">True Evil</option>
                                <option value="True Good">True Good</option>
                                <option value="Lawful Good">Lawful Good</option>
                                <option value="Lawful Evil">Lawful Evil</option>
                                <option value="Chaotic Good">Chaotic Good</option>
                                <option value="Chaotic Evil">Chaotic Evil</option>
                            </select>
                        </form>
                        <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100}}>Logout</button>
                        </div>
                    </div>
                </section> */}

                <View>
                    <Text>
                        Name Your Character and Pick Alignment:
                    </Text>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Character Name"
                        onChangeText={(text) => this.setState({ characterName: text})}
                        value={this.state.characterName}
                        />
                    <Picker
                    selectedValue={this.state.currentClass}
                    style={{ width: 200,}}
                    onValueChange={(itemValue) => this.setState({currentClass: itemValue})} >
                        <Picker.item value="True Neutral" label="True Neutral" />
                        <Picker.item value="Chaotic Neutral" label="Chaotic Neutral" />
                        <Picker.item value="Lawful Neutral" label="Lawful Neutral" />
                        <Picker.item value="True Evil" label="True Evil" />
                        <Picker.item value="True Good" label="True Good" />
                        <Picker.item value="Lawful Good" label="Lawful Good" />
                        <Picker.item value="Lawful Evil" label="Lawful Evil" />
                        <Picker.item value="Chaotic Good" label="Chaotic Good" />
                        <Picker.item value="Chaotic Evil" label="Chaotic Evil" />
                    </Picker>
                </View>

                <View  >
                <View >
                <Text >Choose Your Class:</Text>
                </View>
                <View >
                    <Text>Currently Selected: </Text>
                
                    <View>{this.props.newCharClass ? <View><Text>{this.props.newCharClass.name}</Text> 
                    <Button title="Confirm"
                 onPress={() =>
                    this.handleNext()
                    }/></View> : null}</View>
                </View>
                <View >
                <Picker
                selectedValue={this.state.currentClass}
                style={{ width: 100}}
                onValueChange={(itemValue) => this.setState({currentClass: itemValue})} >
                    <Picker.item label="Barbarian" value="barbarian"/>
                    <Picker.item value="bard" label="Bard"/>
                    <Picker.item value="cleric" label="Cleric"/>
                    <Picker.item value="druid" label="Druid"/>
                    <Picker.item value="fighter" label="Fighter"/>
                    <Picker.item value="monk" label="Monk"/>
                    <Picker.item value="paladin" label="Paladin"/>
                    <Picker.item value="ranger" label="Ranger"/>
                    <Picker.item value="rogue" label="Rogue"/>
                    <Picker.item value="sorcerer" label="Sorcerer"/>
                    <Picker.item value="warlock" label="Warlock"/>
                    <Picker.item value="wizard" label="Wizard"/>
                </Picker>
                {/* <Image source={pic}/> */}
                </View>
                </View>
                {this.state.currentClass === 'barbarian' ? classComps[0] : null}
                {this.state.currentClass === 'bard' ? classComps[1] : null}
                {this.state.currentClass === 'cleric' ? classComps[2] : null}
                {this.state.currentClass === 'druid' ? classComps[3] : null}
                {this.state.currentClass === 'fighter' ? classComps[4] : null}
                {this.state.currentClass === 'monk' ? classComps[5] : null}
                {this.state.currentClass === 'paladin' ? classComps[6] : null}
                {this.state.currentClass === 'ranger' ? classComps[7] : null}
                {this.state.currentClass === 'rogue' ? classComps[8] : null}
                {this.state.currentClass === 'sorcerer' ? classComps[9] : null}
                {this.state.currentClass === 'warlock' ? classComps[10] : null}
                {this.state.currentClass === 'wizard' ? classComps[11] : null}
            {/* </div> */}
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
      character_id: store.character_id,
      token: store.token
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddClass: (charClass) => {
          dispatch({ type: 'ADD_CLASS', attribute: charClass })
      },
      AddCharID: (character_id) => {
          dispatch({ type: 'ADD_CHARACTER_ID', character_id: character_id})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewClass);
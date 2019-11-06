import React from  'react'
import { connect } from 'react-redux'
import Skills from './Skills'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Button, Text, View, Image, ImageBackground, Picker, SafeAreaView, TextInput, AsyncStorage } from 'react-native';




class NewCharacter extends React.Component{

    state = {
        strMod: 0,
        dexMod: 0,
        conMod: 0,
        intMod: 0,
        wisMod: 0,
        chrMod: 0,
        savingProf: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        },
        proficiencyPoints: 0,
        armor: '',
        armorClass: 0,
        shield: false, 
        characterName: '',
        characterAlignment: 'True Neutral',
        character_id: 0
    }

    componentDidMount(){
        this.setState({
            strMod: this.props.mods.strMod,
            dexMod: this.props.mods.dexMod,
            conMod: this.props.mods.conMod,
            intMod: this.props.mods.intMod,
            wisMod: this.props.mods.wisMod,
            chrMod: this.props.mods.chrMod
        })
        const savingProf = this.props.newCharClass.prof_saving_throws.toLowerCase().split(', ')
        this.setState({
            savingProf: {
                ...this.state.savingProf,
                [savingProf[0]]: 2,
                [savingProf[1]]: 2
            }
        })
        this.handleReset()
        
    }

    handleChoice = () => {
        if(this.state.proficiencyPoints > 0 ){
            this.setState({
                proficiencyPoints: this.state.proficiencyPoints - 1
            })
        } else if (this.state.proficiencyPoints === 0 ){
            return
        }
    }

    handleReset = () => {
        if(this.props.newCharClass.name === 'Barbarian'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Bard'){
            this.setState({
                proficiencyPoints: 3
            })
        } else if (this.props.newCharClass.name === 'CLeric'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Druid'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Fighter'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Monk'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Paladin'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Ranger'){
            this.setState({
                proficiencyPoints: 3
            })
        } else if (this.props.newCharClass.name === 'Rogue'){
            this.setState({
                proficiencyPoints: 4
            })
        } else if (this.props.newCharClass.name === 'Sorcerer'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Warlock'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Wizard'){
            this.setState({
                proficiencyPoints: 2
            })
        }
    }

    handleNext = (skills) => {
        this.props.AddSkills(skills)
    }

    handleArmor = (choice) =>{
        if(choice === 'shields' || choice === 'shields (druids will not wear armor or use shields made of metal)'){
            if(this.state.shield === false){
                this.setState({
                    armorClass: this.state.armorClass + 2
                })
            }
            this.setState({
                shield: true
            })
        } else {
            this.setState({
                armor: choice.toLowerCase()
            },() =>  {this.calculateArmor()})
        }
    }

    calculateArmor = () => {
        if(this.state.armor === 'light armor'){
            const armorClass = this.props.mods.dexMod + 11
            this.setState({
                armorClass: armorClass
            })
        } else if (this.state.armor === 'medium armor'){
            const armorClass = this.props.mods.dexMod + 12
            this.setState({
                armorClass: armorClass
            }) 
        } else if (this.state.armor === 'heavy armor'){
            const armorClass = 14
            this.setState({
                armorClass: armorClass
            }) 
        } else if (this.state.armor === 'none'){
            const armorClass = this.props.mods.dexMod + 10
            this.setState({
                armorClass: armorClass
            })
        }
        
    }


    handleSubmit =() =>  {
        if(this.props.skills && this.state.armorClass > 0){
        const hitDieNum = this.props.newCharClass.hit_dice.split('d')[1]
        const maxHP = parseInt(hitDieNum) + this.props.mods.conMod
                fetch('https://sidequest-api.herokuapp.com/character_skills', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.props.character_id,
                    acrobatics: this.props.skills.Acrobatics,
                    animal_handling: this.props.skills.AnimalHandling,
                    arcana: this.props.skills.Arcana,
                    athletics: this.props.skills.Athletics,
                    deception: this.props.skills.Deception,
                    history: this.props.skills.History,
                    insight: this.props.skills.Insight,
                    intimidation: this.props.skills.Intimidation,
                    investigation: this.props.skills.Investigation,
                    medicine: this.props.skills.Medicine,
                    nature: this.props.skills.Nature,
                    perception: this.props.skills.Perception,
                    performance: this.props.skills.Performance,
                    persuasion: this.props.skills.Persuasion,
                    religion: this.props.skills.Religion,
                    sleight_of_hand: this.props.skills.SleightofHand,
                    stealth: this.props.skills.Stealth
                })
            }).then(r => r.json()).then(console.log)
                fetch('https://sidequest-api.herokuapp.com/character_stats', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.props.character_id,
                    strength: this.props.stats.strength,
                    dexterity: this.props.stats.dexterity,
                    constitution: this.props.stats.constitution,
                    intelligence: this.props.stats.intelligence,
                    wisdom: this.props.stats.wisdom,
                    charisma: this.props.stats.charisma,
                    initiative: this.props.mods.dexMod,
                    hp: maxHP,
                    armor_class: this.state.armorClass,
                    passive_perception: 10 + this.props.skills.Perception,
                    proficiency_mod: 2
                })
            }).then(r => r.json()).then(this.handleCreate)
            } else {
            alert('You must pick skill proficiencies and armor class')
            }
        }
            
    

    handleCreate = () => {
        this.props.navigation.navigate('Profile')
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
        // const clasImg = this.getClassImg(this.props.newCharClass.name)
        // const raceImg = this.getRaceImg(this.props.newCharRace.name)
        const hitDieNum = this.props.newCharClass.hit_dice.split('d')[1]
        const maxHP = parseInt(hitDieNum) + this.props.mods.conMod
        const armorChoices = this.props.newCharClass.prof_armor.split(', ')
        const armorBtns = armorChoices.map(choice => choice === 'All armor' ? <View><Button onPress={() => this.handleArmor()} value="light armor" title="Light armor"/><Button onPress={() => this.handleArmor()} value="medium armor" title="Medium armor"/><Button onPress={() => this.handleArmor()} value="heavy armor" title="Heavy armor"/></View> : <Button value={choice} onPress={() => this.handleArmor(choice)} title={choice}>{choice}</Button>)
        return(
            <SafeAreaView>
                <ScrollView>
            <View >
                <View >
                    <View >
                        <View >
                            <Text>
                                Pick Proficiencies & Armor class:
                            </Text>
                            <Text>
                                You have {this.state.proficiencyPoints} given by your class. Confirm how to use them and pick your armor class before you confirm.
                            </Text>
                            <Button onPress={() => this.logout()} title="Logout"/>
                        </View>
                    </View>
                </View>
            <View >
                <View >
                
                
                <Text>Stats:</Text>
                <Text>Strength - {this.props.stats.strength}</Text>
                <Text>{this.state.strMod}</Text>
                <Text>Dexterity - {this.props.stats.dexterity}</Text>
                <Text>{this.state.dexMod}</Text>
                <Text>Constitution - {this.props.stats.constitution}</Text>
                <Text>{this.state.conMod}</Text>
                <Text>Intelligence - {this.props.stats.intelligence}</Text>
                <Text>{this.state.intMod}</Text>
                <Text>Wisdom - {this.props.stats.wisdom}</Text>
                <Text>{this.state.wisMod}</Text>
                <Text>Charisma - {this.props.stats.charisma}</Text>
                <Text>{this.state.chrMod}</Text>
                </View>
                <View >
                <Text>Proficiency Modifier:</Text>
                <Text>+ 2</Text>
                
                    <Text>Saving Throws:</Text>
                    <Text>Strength: {this.state.strMod + this.state.savingProf.strength}</Text>
                    <Text>Dexterity: {this.state.dexMod + this.state.savingProf.dexterity}</Text>
                    <Text>Constitution: {this.state.conMod + this.state.savingProf.constitution}</Text>
                    <Text>Intelligence: {this.state.intMod + this.state.savingProf.intelligence}</Text>
                    <Text>Wisdom: {this.state.wisMod + this.state.savingProf.wisdom}</Text>
                    <Text>Charisma: {this.state.chrMod + this.state.savingProf.charisma}</Text>
                <Text>Skills:</Text>
                <Text>Points Left: {this.state.proficiencyPoints}</Text>
                <Skills handleNext={this.handleNext} handleChoice={this.handleChoice} proficiencyPoints={this.state.proficiencyPoints} handleReset={this.handleReset}/>
                </View>
                <View>
                <Text>Passive Perception:</Text>
                {this.props.skills ? <Text>{10 + this.props.skills.Perception}</Text> : null}
                <View>
                    <Text>Other Proficiencies:</Text>
                    
                        <Text>armor: {this.props.newCharClass.prof_armor}</Text>
                        <Text>weapons: {this.props.newCharClass.prof_weapons}</Text>
                        <Text>tools: {this.props.newCharClass.prof_tools}</Text>
                    
                </View>
                <View>
                    <Text>Languages:</Text>
                    <Text>{this.props.newCharRace.languages.split('_**').pop()}</Text>
                </View>
                <View >
                    <Text>Equipment:</Text>
                    <Text>{this.props.newCharClass.equipment}</Text>
                </View>
                <View>
                    <Text>Armor Choice:</Text>
                    {armorBtns}
                </View>
                </View>
                <View >
                    <View>
                        <Text>Armor Class: {this.state.armorClass}</Text>
                    </View>
                    <View>
                        <Text>Initiative: {this.props.mods.dexMod}</Text>
                        <Text>Speed: {this.props.newCharRace.speed.walk}</Text>
                    </View>
                    <View>
                        <Text>Hit Dice: {this.props.newCharClass.hit_dice}</Text>
                        <Text>Max HP: {maxHP}</Text>
                    </View>
                    <View>
                            <Button type="submit" onPress={() => this.handleSubmit()} title="Submit Character"/>
                            <Text>Chosen Race: {this.props.newCharRace.name}</Text>
                            <Text>Chosen Class: {this.props.newCharClass.name}</Text>
                    </View>
                </View>
            </View></View>
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
      stats: store.stats,
      mods: store.mods,
      skills: store.skills,
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
      },
      AddStrength: (stat) => {
          dispatch({ type: 'ADD_strength', strength: stat})
      },
      AddDexterity: (stat) => {
          dispatch({ type: 'ADD_dexterity', dexterity: stat})
      },
      AddConstitution: (stat) => {
        dispatch({ type: 'ADD_constitution', constitution: stat})
      },
      AddIntelligence: (stat) => {
        dispatch({ type: 'ADD_intelligence', intelligence: stat})
      },
      AddWisdom: (stat) => {
        dispatch({ type: 'ADD_wisdom', wisdom: stat})
      },
      AddCharisma: (stat) => {
        dispatch({ type: 'ADD_charisma', charisma: stat})
      },
      AddMods: (mods) => {
          dispatch({ type: 'ADD_MODS', mods })
      },
      AddSkills: (skills) => {
          dispatch({ type: 'ADD_SKILLS', skills})
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);
import React from  'react'
import { connect } from 'react-redux'
import { StyleSheet, Button, Text, View, Image, ImageBackground, Picker, SafeAreaView, TextInput } from 'react-native';


class Skills extends React.Component{

    state = {
        skills: {
            Acrobatics: false,
            AnimalHandling: false,
            Arcana: false,
            Athletics: false,
            Deception: false,
            History: false,
            Insight: false,
            Intimidation: false,
            Investigation: false,
            Medicine: false,
            Nature: false,
            Perception: false,
            Performance: false,
            Persuasion: false,
            Religion: false,
            SleightofHand: false,
            Stealth: false,
            Survival: false
        },
        skillPoints: {
            Acrobatics: 0,
            AnimalHandling: 0,
            Arcana: 0,
            Athletics: 0,
            Deception: 0,
            History: 0,
            Insight: 0,
            Intimidation: 0,
            Investigation: 0,
            Medicine: 0,
            Nature: 0,
            Perception: 0,
            Performance: 0,
            Persuasion: 0,
            Religion: 0,
            SleightofHand: 0,
            Stealth: 0,
            Survival: 0
        }
    }


    handleClick = (choice) => {
        if(this.props.proficiencyPoints > 0){
            this.setState({
                skills: {
                    ...this.state.skills,
                    [choice]: !this.state.skills[choice]
                }
            })
            this.props.handleChoice()
        } else {
            return
        }
    }

    handleReset = () => {
        this.setState({
            skills: {
                Acrobatics: false,
                AnimalHandling: false,
                Arcana: false,
                Athletics: false,
                Deception: false,
                History: false,
                Insight: false,
                Intimidation: false,
                Investigation: false,
                Medicine: false,
                Nature: false,
                Perception: false,
                Performance: false,
                Persuasion: false,
                Religion: false,
                SleightofHand: false,
                Stealth: false,
                Survival: false
            }
        })
        this.props.handleReset()
    }

    handleConfirm = () => {
        this.setSkills()
        
    }

    

    setSkills = () => {
        let skillPoints = {}
        const skillArr = ['Acrobatics',
            'AnimalHandling',
            'Arcana',
            'Athletics',
            'Deception',
            'History',
            'Insight',
            'Intimidation',
            'Investigation',
            'Medicine',
            'Nature',
            'Perception',
            'Performance',
            'Persuasion',
            'Religion',
            'SleightofHand',
            'Stealth',
            'Survival']
        const modArr = ['dexMod', 'wisMod', 'intMod', 'strMod', 'chrMod', 'intMod', 'wisMod', 'chrMod', 'intMod', 'wisMod', 'intMod', 'wisMod', 'chrMod', 'chrMod', 'intMod', 'dexMod', 'wisMod']
        for(let i = 0; i < skillArr.length; i++){
            skillPoints[skillArr[i]] = this.state.skills[skillArr[i]] === true ? this.props.mods[modArr[i]] + 2 : this.props.mods[modArr[i]]
        }
        this.setState({
            skillPoints: skillPoints
        },() => {this.props.handleNext(this.state.skillPoints)})
    }


    render(){
        return(
            <View>
                <Button  onPress={() => this.handleReset()} title="Reset"/> 
                {this.props.proficiencyPoints === 0 ? <Button  onPress={() => this.handleConfirm()} title="Confirm"/> : null}
                
                <Text>Acrobatics (Dex) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Rogue'  ? 
                <Button  value="Acrobatics" onPress={() => this.handleClick("Acrobatics")} title="+"/> : null }

                {this.state.skills.Acrobatics ? <Text>{this.props.mods.dexMod + 2}</Text> : <Text>{this.props.mods.dexMod}</Text>}

                <Text>Animal Handling (Wis) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Ranger' ? 
                <Button  onPress={() => this.handleClick("AnimalHandling")} value="AnimalHandling"  title="+"/> : null}

                {this.state.skills.AnimalHandling ? <Text>{this.props.mods.wisMod + 2}</Text> : <Text>{this.props.mods.wisMod}</Text>}

                <Text>Arcana (Int) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Warlock' || this.props.newCharClass.name ==='Wizard' ? 
                <Button  onPress={() => this.handleClick("Arcana")} value="Arcana"  title="+"/> : null}

                {this.state.skills.Arcana ? <Text>{this.props.mods.intMod + 2}</Text> : <Text>{this.props.mods.intMod}</Text>}

                <Text>Athletics (Str) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' ? 
                <Button  onPress={() => this.handleClick("Athletics")} value="Athletics"  title="+"/> : null}

                {this.state.skills.Athletics ? <Text>{this.props.mods.strMod + 2}</Text> : <Text>{this.props.mods.strMod}</Text>}

                <Text>Deception (Cha) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Warlock' ? 
                <Button  onPress={() => this.handleClick("Deception")} value="Deception" title="+"/> : null}

                {this.state.skills.Deception ? <Text>{this.props.mods.chrMod + 2}</Text> : <Text>{this.props.mods.chrMod}</Text>}

                <Text>History (Int) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Cleric' || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Warlock' || this.props.newCharClass.name ==='Wizard' ? 
                <Button  onPress={() => this.handleClick("History")} value="History" title="+"/> : null}

                {this.state.skills.History ? <Text>{this.props.mods.intMod + 2}</Text> : <Text>{this.props.mods.intMod}</Text>}

                <Text>Insight (Wis) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name === 'Cleric' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Wizard'? 
                <Button  onPress={() => this.handleClick("Insight")} value="Insight" title="+"/> : null}

                {this.state.skills.Insight ? <Text>{this.props.mods.wisMod + 2}</Text> : <Text>{this.props.mods.wisMod}</Text>}

                <Text>Intimidation (Cha) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Warlock' ? 
                <Button  onPress={() => this.handleClick("Intimidation")} value="Intimidation" title="+"/> : null}

                {this.state.skills.Intimidation ? <Text>{this.props.mods.chrMod + 2}</Text> : <Text>{this.props.mods.chrMod}</Text>}

                <Text>Investigation (Int) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Warlock' || this.props.newCharClass.name ==='Wizard' ? 
                <Button  onPress={() => this.handleClick("Investigation")} value="Investigation" title="+"/> : null}

                {this.state.skills.Investigation ? <Text>{this.props.mods.intMod + 2}</Text> : <Text>{this.props.mods.intMod}</Text>}

                <Text>Medicine (Wis) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Cleric' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Wizard' ? 
                <Button  onPress={() => this.handleClick("Medicine")} value="Medicine" title="+"/> : null}

                {this.state.skills.Medicine ? <Text>{this.props.mods.wisMod + 2}</Text> : <Text>{this.props.mods.wisMod}</Text>}

                <Text>Nature (Int) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Ranger' ? 
                <Button  onPress={() => this.handleClick("Nature")} value="Nature" title="+"/> : null}

                {this.state.skills.Nature ? <Text>{this.props.mods.intMod + 2}</Text> : <Text>{this.props.mods.intMod}</Text>}

                <Text>Perception (Wis) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' ? 
                <Button  onPress={() => this.handleClick("Perception")} value="Perception" title="+"/> : null}

                {this.state.skills.Perception ? <Text>{this.props.mods.wisMod + 2}</Text> : <Text>{this.props.mods.wisMod}</Text>}

                <Text>Performance (Cha) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Rogue' ? 
                <Button   onPress={() => this.handleClick("Performance")} value="Performance" title="+"/> : null}

                {this.state.skills.Performance ? <Text>{ this.props.mods.chrMod +2}</Text> : <Text>{this.props.mods.chrMod}</Text>}

                <Text>Persuasion (Cha) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Cleric' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Sorcerer' ? 
                <Button   onPress={() => this.handleClick("Persuasion")} value="Persuasion" title="+"/> : null}

                {this.state.skills.Persuasion ? <Text>{ this.props.mods.chrMod +2}</Text> : <Text>{this.props.mods.chrMod}</Text>}

                <Text>Religion (Int) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Cleric' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Warlock' || this.props.newCharClass.name ==='Wizard'? 
                <Button   onPress={() => this.handleClick("Religeon")} value="Religeon"  title="+"/> : null}

                {this.state.skills.Religion ? <Text>{ this.props.mods.intMod +2}</Text> : <Text>{this.props.mods.intMod}</Text>}

                <Text>Sleight of Hand (Dex) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Rogue' ? 
                <Button   onPress={() => this.handleClick("SleightofHand")} value="SleightofHand" title="+"/> : null}

                {this.state.skills.SleightofHand ? <Text>{ this.props.mods.dexMod +2}</Text> : <Text>{this.props.mods.dexMod}</Text>}

                <Text>Stealth (Dex) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' ? 
                <Button   onPress={() => this.handleClick("Stealth")} value="Stealth" title="+"/> : null}

                {this.state.skills.Stealth ? <Text>{ this.props.mods.dexMod +2}</Text> : <Text>{this.props.mods.dexMod}</Text>}

                <Text>Survival (Wis) - </Text>
                {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Ranger' ? 
                <Button onPress={() => this.handleClick("Survival" )} value="Survival" title="+"/> : null}
                
                {this.state.skills.Survival ? <Text>{ this.props.mods.wisMod +2}</Text> : <Text>{this.props.mods.wisMod}</Text>}
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
      mods: store.mods
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
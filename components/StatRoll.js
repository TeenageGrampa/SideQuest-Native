import React from  'react'
import { connect } from 'react-redux'
import StatDist from './StatDist'
import { Modal, StyleSheet, Button, Text, View, Image, ImageBackground, Picker, SafeAreaView, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


class NewCharacter extends React.Component{
    state = {
        stats: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
        statRoll: [],
        statVal: [],
        ModalVisible: true
    }
    

    componentDidMount(){
        const asi = this.props.newCharRace.asi.map(asi => asi)
        const asiAtr = asi.map(asiAtr => asiAtr.attributes[0].toLowerCase())
        let stats = {strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0}
        for(let i = 0; i < asiAtr.length; i++){
            stats[asiAtr[i]] = asi[i].value
        }
        this.setState({
            stats: stats, 
            statVal: [15, 14, 13, 12, 10, 8]
        })
    }

    rollAll() {
        this.reactDice.rollAll()
        
    }

     
    rollDoneCallback = () => {
        if(this.state.statRoll.length === 4){
            return
            
        } else {
            const num = Math.floor(Math.random() * 6) + 1
            this.setState({
                statRoll: [...this.state.statRoll, num]
            })
            this.statValCheck()
        }
    }

    statValCheck = () => {
        if(this.state.statRoll.length === 4){
            const smallest = Math.min.apply(null, this.state.statRoll)
            const pos = this.state.statRoll.indexOf(smallest)
            const topThree = this.state.statRoll.slice(0, pos).concat(this.state.statRoll.slice(pos + 1))
            const statVal = topThree.reduce((a, b) => a + b, 0)
            this.setState({
                statVal: [...this.state.statVal, statVal],
                statRoll: []
            })
        } else {
            return
        }
    }

    getStat =(stat) => {
        this.setState({
            stats: {...this.state.stats, [stat]: this.state.statVal[0] + this.state.stats[stat]},
            statVal: this.state.statVal.concat(this.state.statVal.splice(0, 1))
        })
    }

    handleNext = () => {
        const strMod = this.calculateMod(this.state.stats.strength)
        const dexMod = this.calculateMod(this.state.stats.dexterity)
        const conMod = this.calculateMod(this.state.stats.constitution)
        const intMod = this.calculateMod(this.state.stats.intelligence)
        const wisMod = this.calculateMod(this.state.stats.wisdom)
        const chrMod = this.calculateMod(this.state.stats.charisma)
        this.props.AddStrength(this.state.stats.strength)
        this.props.AddDexterity(this.state.stats.dexterity)
        this.props.AddConstitution(this.state.stats.constitution)
        this.props.AddIntelligence(this.state.stats.intelligence)
        this.props.AddWisdom(this.state.stats.wisdom)
        this.props.AddCharisma(this.state.stats.strength)
        this.getModifiers(this.state.stats)
        fetch('http://localhost:3000/character_mods', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.props.character_id,
                    strmod: strMod,
                    dexmod: dexMod,
                    conmod: conMod,
                    intmod: intMod,
                    wismod: wisMod,
                    chrmod: chrMod
                })
            }).then(r => r.json()).then(this.props.history.push('./NewCharacter'))
        // this.props.history.push('./NewCharacter')
    }

    getModifiers = (stats) => {
        const strMod = this.calculateMod(stats.strength)
        const dexMod = this.calculateMod(stats.dexterity)
        const conMod = this.calculateMod(stats.constitution)
        const intMod = this.calculateMod(stats.intelligence)
        const wisMod = this.calculateMod(stats.wisdom)
        const chrMod = this.calculateMod(stats.charisma)
        this.props.AddMods({
            strMod: strMod,
            dexMod: dexMod,
            conMod: conMod,
            intMod: intMod,
            wisMod: wisMod,
            chrMod: chrMod
        })
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    calculateMod = (stat) =>{
        
        if(stat <= 1){
            return -5
        } else if(2 <= stat && stat <= 3){
            return -4
        } else if(4 <= stat && stat <= 5){
            return -3
        } else if(6 <= stat && stat <= 7){
            return -2
        } else if (8 <= stat && stat <= 9){
            return -1
        } else if ( 10 <= stat && stat <= 11){
            return 0
        } else if (12 <= stat && stat <= 13){
            return 1
        } else if (14 <= stat && stat <= 15){
            return 2
        } else if (16 <= stat && stat <= 17){
            return 3
        } else if (18 <= stat && stat <= 19){
            return 4
        } else if (20 <= stat && stat <= 21){
            return 5
        } else if (22 <= stat && stat <= 23){
            return 6
        } else if (24 <= stat && stat <= 25){
            return 7
        } else if (26 <= stat && stat <= 27){
            return 8
        } else if (28 <= stat && stat <= 29){
            return 9
        } else if (30 <= stat){
            return 10
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

   

    render(){
            const asi = this.props.newCharRace.asi.map(asi => <Text>{asi.attributes} - {asi.value}</Text>)
            let critFail = {
                uri: 'https://i.imgur.com/nA0aPof.gif'
              };
        return(
        <SafeAreaView>
            <ScrollView>
            <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                    <Image source={critFail} style={{width: 200, height: 200}}/>
                    <Text>Unfortunately rolling your own stats is only available on our Web version. However, if you so wish to continue you may use preditermined rolls as provided by the 5e Players Handbook. Shall you continue? </Text>
                    <Button title="Confirm"
                        onPress={() =>
                            this.setModalVisible(!this.state.modalVisible)
                            }/>
                    <Button title="Back to Profile"
                        onPress={() =>
                            this.props.navigation.navigate('Profile')
                            }/>
                    </View>
                </View>
            </Modal>
            <Text>You may choose your stats by picking from these standard scores:
            15, 14, 13, 12, 10, 8
            </Text>
                <View >
                    <Text>Stats:</Text>{this.state.stats.strength > 0 &&
                    this.state.stats.charisma > 0 &&
                    this.state.stats.constitution > 0 &&
                    this.state.stats.intelligence > 0 &&
                    this.state.stats.wisdom > 0 &&
                    this.state.stats.dexterity > 0 ?
                    <Button title="Confirm"
                    onPress={() =>
                        this.handleNext()
                        }/> : null
                    }
                    
                    <View>
                    <Text>Strength</Text>
                    <Text >{this.state.stats.strength}</Text>
                    </View>
                    <View>
                    <Text>Dexterity</Text>
                    <Text >{this.state.stats.dexterity}</Text>
                    </View>
                    <View>
                    <Text>Constitution</Text>
                    <Text >{this.state.stats.constitution}</Text>
                    </View>
                    <View>
                    <Text>Intelligence</Text>
                    <Text >{this.state.stats.intelligence}</Text>
                    </View>
                    <View>
                    <Text>Wisdom</Text>
                    <Text >{this.state.stats.wisdom}</Text>
                    </View>
                    <View>
                    <Text>Charisma</Text>
                    <Text >{this.state.stats.charisma}</Text>
                    </View>
                </View>     
                <View>
                    <View>
                        <View>
                            <Text>Chosen Race: </Text>
                            <Text>{this.props.newCharRace.name}</Text>
                            {/* <img src={raceImg} alt="" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} className="image floating is-96x96" /> */}
                            
                        </View>
                        <View >
                            <Text>Chosen Class: </Text>
                            <Text>{this.props.newCharClass.name}</Text>
                            {/* <img src={clasImg} alt="" className="image floating is-96x96" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/> */}
                        </View>
                        <View >
                            <Text>Ability score increases: {asi}</Text>
                        </View>
                    </View>
                    <View >
                        <View >
                            {/* <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100}}>Logout</button> */}
                            <Text >Roll Your Stats:</Text>
                            <Text >You roll 4 dice and keep the highest 3 numbers. After 6 numbers are collected you may allocate them to your stats as you wish.</Text>
                        </View>
                        <View >
                        {this.state.statVal && this.state.statVal.length < 6 ? 
                        <View >
                            <Text className="subtitle" style={{color: 'white'}}>Your Rolls: {this.state.statVal.map(stat => `${stat} `)}</Text>
                        </View>  
                        : null  }
                        {this.state.statVal.length === 6 ? 
                        <View >
                            <Text >Your Rolls: {this.state.statVal.map(stat => `${stat} `)}</Text>
                            <Text >Add {this.state.statVal[0]} to: </Text>
                            <StatDist statVals={this.state.statVal} wisdom={this.state.wisdom} strength={this.state.strength} charisma={this.state.charisma} intelligence={this.state.intelligence} dexterity={this.state.dexterity} constitution={this.state.constitution} getStat={this.getStat}/>
                        </View> 
                        : null}
                    </View>
                </View>
            </View>
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
      mods: store.mods,
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);
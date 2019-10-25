import React from 'react'
import { StyleSheet, Button, Image, Text, View, ImageBackground } from 'react-native';


class RaceInfo extends React.Component{

    state = {
        currentRace: {},
        showSubRace: false
    }

    componentDidMount(){
        this.setState({
            currentRace: this.props.charRace
        })
    }

    handleClick = () => {
        this.props.saveRace(this.state.currentRace)
    }

    handleSubrace = () => {
        this.setState({
            showSubRace: !this.state.showSubRace,
            currentRace: {
                ...this.state.currentRace,
                name: this.props.charRace.subraces[0].name,
                asi: this.props.charRace.subraces[0].asi,
                desc: this.props.charRace.subraces[0].desc,
                asi_desc: this.props.charRace.subraces[0].asi_desc,
                slug: this.props.charRace.subraces[0].slug
            }
        })
    }

    // getImg = (charRace) => {
    //     if(charRace === 'Dwarf'){
    //         return require('./dwarf-king.png')
    //     } else if(charRace === 'Elf'){
    //         return require('./woman-elf-face.png')
    //     } else if(charRace === 'Halfling'){
    //         return require('./hobbit-dwelling.png')
    //     } else if(charRace === 'Human'){
    //         return require('./sensuousness.png')
    //     } else if(charRace === 'Dragonborn'){
    //         return require('./spiked-dragon-head.png')
    //     } else if(charRace === 'Gnome'){
    //         return require('./bad-gnome.png')
    //     } else if(charRace === 'Half-Elf'){
    //         return require('./elf-ear.png')
    //     } else if(charRace === 'Half-Orc'){
    //         return require('./orc-head.png')
    //     } else if(charRace === 'Tiefling'){
    //         return require('./horned-reptile.png')
    //     } 
    // }
    
    render(){
        // const raceImg = this.getImg(this.props.charRace.name)
        const asiLi = this.props.charRace.asi.map(asi => <Text >{asi.attributes[0]} - {asi.value}</Text>)        
        const raceDesc = this.props.charRace.desc.split('Traits').pop()
        const raceAge = this.props.charRace.age.split('_**').pop()
        const raceTraits = this.props.charRace.traits.split('**_').join(' ').split('_**')
        const raceVision = this.props.charRace.vision.split('**_').join(' ').split('_**')
        
        return(
            <View >
                {this.state.showSubRace === true ? <Text >{this.props.charRace.subraces[0].name}</Text> : <Text >{this.props.charRace.name}</Text>}
                {/* <img src={raceImg} alt="" className="floating" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 30, display: 'block', marginLeft: 'auto', marginRight: 'auto', width: 400}} /> */}
                <Button title="Choose Race"
                 onPress={() =>
                    this.handleClick()
                    }/>
                {this.props.charRace.subraces[0] ? <Button title="Show Subrace"
                 onPress={() =>
                    this.handleSubrace()
                    }/> : null}
                <View >
                <Text>{this.state.showSubRace === true ? this.props.charRace.subraces[0].desc : raceDesc}</Text>
                <Text>Age: {raceAge}</Text>
                <Text>Ability Score Increase:</Text>
                <Text>{this.state.showSubRace === true ? this.props.charRace.subraces[0].asi_desc.split('_**').pop() : this.props.charRace.asi_desc.split('_**').pop()}</Text><Text>{this.state.showSubRace === true ? this.props.charRace.subraces[0].asi.map(asi => <Text>{asi.attributes[0]} - {asi.value}</Text>) : asiLi}</Text>
                <Text>Languages: {this.props.charRace.languages.split('_**').pop()}</Text>
                <Text>Size: {this.props.charRace.size.split('_**').pop()}</Text>
                <Text>Speed: {this.props.charRace.speed.walk} {this.props.charRace.speed_desc.split('_**').pop()}</Text>
                <Text>Traits: {raceTraits}</Text>
                <Text>Vision: {raceVision}</Text>
                </View>
            </View>
        )
    }
}

export default RaceInfo
import React from 'react'

import { StyleSheet, Button, Image, Text, View, ImageBackground } from 'react-native';


class ClassInfo extends React.Component{

    handleClick = () => {
        this.props.saveClass(this.props.charClass)
    }

   getImg = (charClass) => {
        if(charClass === 'Rogue'){
            return require('../Images/hooded-assassin.png')
        } else if(charClass === 'Barbarian'){
            return require('../Images/barbarian.png')
        } else if(charClass === 'Paladin'){
            return require('../Images/elf-helmet.png')
        } else if(charClass === 'Warlock'){
            return require('../Images/warlock-hood.png')
        } else if(charClass === 'Ranger'){
            return require('../Images/cowled.png')
        } else if(charClass === 'Bard'){
            return require('../Images/musical-notes.png')
        } else if(charClass === 'Cleric'){
            return require('../Images/pope-crown.png')
        } else if( charClass === 'Druid'){
            return require('../Images/wolf-head.png')
        } else if(charClass === 'Fighter'){
            return require('../Images/swordman.png')
        } else if(charClass === 'Monk'){
            return require('../Images/monk-face.png')
        } else if(charClass === 'Sorcerer'){
            return require('../Images/robe.png')
        } else if(charClass === 'Wizard'){
            return require('../Images/wizard-staff.png')
        }
    }
    
    render(){
        const arcLi = this.props.charClass.archetypes.map(archetype => <Text key={archetype.name}>{archetype.name} - {archetype.desc}</Text>)
        const classDesc = this.props.charClass.desc.split('###')
        const clasImgUrl = this.getImg(this.props.charClass.name)

        return(
            <View>
                {/* <div className="container box brick-bg" style={{boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}> */}
                <Text >{this.props.charClass.name}</Text>
                {/* <Image source={clasImgUrl} style={styles.classImage}/> */}
                <Button title="Choose Class"
                 onPress={() =>
                    this.handleClick()
                    }/>
                {/* <div className="box" style={{color: 'black'}}> */}
                <Text>{classDesc}</Text>
                <Text>hit dice: {this.props.charClass.hit_dice}</Text>
                <Text>HP at level 1: {this.props.charClass.hp_at_1st_level}</Text>
                <Text>HP at higher levels: {this.props.charClass.hp_at_higher_levels}</Text>
                <Text>Armor profenciecy: {this.props.charClass.prof_armor}</Text>
                <Text>Saving throw proficiency: {this.props.charClass.prof_saving_throws}</Text>
                <Text>Skill proficiency: {this.props.charClass.prof_skills}</Text>
                <Text>Tool proficiency: {this.props.charClass.prof_tools}</Text>
                <Text>Weapon proficiency: {this.props.charClass.prof_weapons}</Text>
                <Text>SpellCasting ability: {this.props.charClass.spellcasting_ability}</Text>
                <Text>Archetypes:</Text>
                <Text>{arcLi}</Text>
                {/* </div> */}
            {/* </div> */}
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    classImage: {
        // height: 100, 
        overflow: 'visible'
    }
  });

export default ClassInfo
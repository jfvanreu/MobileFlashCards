import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, Platform, StyleSheet} from 'react-native'
//import TextButton from './TextButton'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, purple } from '../utils/colors'
import { timeToString, generateUID } from '../utils/helpers'
import { submitDeckEntry, fetchDecks } from '../utils/api'
import DeckDetails from './DeckDetails'
import SubmitBtn from './SubmitBtn'

class AddDeck extends Component {
    
    state = {
        title:'',
    }
    
    //update State on input changes
    onChange = (text) => {
        this.setState(() => ({
            title:text
        }))
    }
    
    //dispatch command to add new title to the store
    handleSubmit = (e) => {
        e.preventDefault()
        
        //create the deck entry with unique key.
        const deckEntry = {
            id: generateUID(),
            title: this.state.title,
            questions: [],
        }
        
        //dispatch the addition of the new deck to the store; we get access to dispatch because it's a connected component
        this.props.dispatch(addDeck(deckEntry))
        
        //reset local state
        this.setState (() => ({
            title: '',
        
        }))
        //navigate to deck details
        //toHome: id ? false : true,}))
        
        //store entry to localStorage "DB"
        submitDeckEntry(deckEntry)
        
        //clear today's notification and set a new one for tomorrow
        //clearLocalNotification()
        //.then(setLocalNotification)
        
    }
    
    render() {
        const { title } = this.state
        return(
                <View style={styles.container}>
                   <Text style={{fontSize:40, textAlign: 'center'}}>What is the title of your new deck?</Text>
                    <TextInput
                        style={styles.deckTitle}
                        onChangeText={this.onChange}
                        value={title}
                    />
                   <SubmitBtn onPress={this.handleSubmit} disabled={ !title }>Submit</SubmitBtn>
               <SubmitBtn onPress={() => this.props.navigation.goBack()}>Back To List</SubmitBtn>
                </View>
               )
    }

}

const styles = StyleSheet.create({

container: {
    flex:1,
    padding:20,
    backgroundColor: white,
},
    
deckTitle: {
    marginTop: 16,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
},

})


function mapDispatchToProps (dispatch, { props }) {
        
    return {
        dispatch,
    }
}

export default connect(mapDispatchToProps)(AddDeck)

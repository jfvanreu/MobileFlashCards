import React, { Component } from 'react'
import { View, Text, TextInput, Platform, StyleSheet} from 'react-native'
//import TextButton from './TextButton'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, purple } from '../utils/colors'
import { timeToString, generateUID } from '../utils/helpers'
import { submitCard } from '../utils/api'
import SubmitBtn from './SubmitBtn'

class AddCard extends Component {
    
    state = {
        question:'',
        answer:'',
    }
    
    //update State on Question input changes
    onChangeQuestion = (text) => {
        this.setState(() => ({
            question:text
        }))
    }

    //update State on Answer input changes
    onChangeAnswer = (text) => {
        this.setState(() => ({
            answer:text
        }))
    }
    
    //dispatch command to add new card to the store
    handleSubmit = (e) => {
        e.preventDefault()
        
        //create the deck entry with unique key.
        const card = {
            question: this.state.question,
            answer: this.state.answer,
        }
        
        const {deckId} = this.props.route.params
        //dispatch the new card to the list of questions for this deck
        this.props.dispatch(addCard(card, deckId))
        
        //reset local state
        this.setState (() => ({
            question: '',
            answer:'',
        }))
        
        //store entry to localStorage "DB"
        submitCard(card, deckId)
        
    }
    
    render() {
        const { question, answer } = this.state
            return(
                <View style={styles.container}>
                   <Text style={{fontSize:40, textAlign: 'center'}}>Add new card to deck</Text>
                   <TextInput
                          style={styles.inputField}
                          placeholder="Enter Your Question Here"
                          onChangeText={this.onChangeQuestion}
                          value={question}
                          onFocus={this.questionField}
                        />
                    <TextInput
                         style={styles.inputField}
                         placeholder="Enter the Answer Here"
                         onChangeText={this.onChangeAnswer}
                         value={answer}
                        />
                   <SubmitBtn disabled={ !question || !answer } onPress={this.handleSubmit}>SUBMIT</SubmitBtn>
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

inputField: {
    marginTop: 16,
    height:40,
    borderColor:'gray',
    borderWidth:1,
},
    
})

function mapDispatchToProps (dispatch) {
    return {
        dispatch,
    }
}

export default connect(mapDispatchToProps)(AddCard)

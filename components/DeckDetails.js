import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { removeDeck } from '../utils/api'
import SubmitBtn from './SubmitBtn'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions'
import { purple, white, gray, green, red } from '../utils/colors'

class DeckDetails extends Component {
    
    handleDeleteDeck = () => {
        //dispatch the addition of the new deck to the store; we get access to dispatch because it's a connected component
        const { deckId } = this.props
        this.props.dispatch(deleteDeck(deckId))
    
        //store entry to localStorage "DB"
        removeDeck(deckId).then(() => this.props.navigation.navigate('Home'))
    }
    
    render() {

        const { deckId, title, numCards } = this.props
        const cardLabel = !numCards ? `No card available yet` : `${numCards} card(s) available`

        return(
               <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.countContainer}>{cardLabel}</Text>
                    <SubmitBtn myStyle={{backgroundColor: gray}} onPress={() => this.props.navigation.navigate(
                        'AddCard', {deckId} )}>Add Card</SubmitBtn>
                    {numCards > 0 && <SubmitBtn myStyle={{backgroundColor: green}} onPress={() => this.props.navigation.navigate(
                        'QuizView', {deckId} )}>Start Quiz</SubmitBtn>}
                    <SubmitBtn myStyle={{backgroundColor: red}} onPress={this.handleDeleteDeck}>Delete Deck</SubmitBtn>
               </View>
               )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#eaeaea"
    },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: purple,
      color: white,
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
  countContainer: {
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    fontSize: 16,
  }
})

function mapStateToProps(state, {route, navigation}) {
    const {deckId} = route.params
    const ids = Object.keys(state)

    //need to test if deckId is still valide since it could have been removed
    const validation = ids.includes(deckId)
    const title = validation ? state[deckId].title : null
    const numCards = validation ? state[deckId].questions.length : null
    return {
        deckId,
        title,
        numCards,
        navigation,
        route,
    }
}

export default connect(mapStateToProps)(DeckDetails)

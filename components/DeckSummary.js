import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { purple, white } from '../utils/colors'

class DeckSummary extends Component {
    
    render() {
        const { title, numCards, id, navigation } = this.props
        const cardLabel = !numCards ? `No card available yet` : `${numCards} card(s) available`
        return (
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(
                    'Detail', {deckId:id} )}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.countContainer}>{cardLabel}</Text>
                </TouchableOpacity>
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

function mapStateToProps(state, {id, navigation}) {
    const deck=state[id]
    const title = deck.title
    const numCards = deck.questions.length
    return {
        title,
        numCards,
        id,
        navigation,
    }
}

export default connect(mapStateToProps)(DeckSummary)


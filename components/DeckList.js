import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import DeckSummary from './DeckSummary'

class DeckList extends Component {
    
    state = {
        ready: false,
    }
    
    componentDidMount() {
        fetchDecks()
        .then((decks) => this.props.dispatch(getAllDecks(decks)))
        .then(() => this.setState(() => ({
            ready:true,
        })))
    }
    
    render() {
        
        const { decks } = this.props
        const ids = Object.keys(decks)
        
        //create the expect data structure for Flatlist
        const formatted_ids = ids.map((item) => ({"key":item}))

        return (
                <FlatList style={styles.container} data={formatted_ids} renderItem={({item}) =>
                        {
                            return (
                                    <DeckSummary id={item.key} navigation={this.props.navigation}/>
                                    )
                        }}
                />
                )
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
  }
})
                
function mapStateToProps(state, {navigation}) {
    const decks = state
    return {
        decks,
        navigation,
    }
}

export default connect(mapStateToProps)(DeckList)

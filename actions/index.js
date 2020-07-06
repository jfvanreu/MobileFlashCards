export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function handleAddDecks(deckTitle) {
    return (dispatch) => {
        return saveDeckTitle(deckTitle)
            .then((deck) => {
                dispatch(addDeck(deck));
            })
    }
}

export function getAllDecks(decks) {
    return {
        type: GET_ALL_DECKS,
        decks
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard(card, deckId) {
    return {
        type: ADD_CARD_TO_DECK,
        deckId,
        card,
    }
}

export function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId,
    }
}

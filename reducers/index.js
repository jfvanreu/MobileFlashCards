//note that we don't need to indicate actions/index. It picks it up by default.
import { GET_ALL_DECKS, ADD_DECK, ADD_CARD_TO_DECK, DELETE_DECK } from '../actions'

export default function decks(state = {}, action) {
    switch (action.type) {
        case GET_ALL_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            const { deck } = action;
            return {
                ...state,
                [deck.id]: deck,
            }
        case ADD_CARD_TO_DECK:
            const {deckId, card} = action
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions: [
                        ...state[deckId].questions,
                        card
                    ]
                }
            }

        case DELETE_DECK:
            const newState = {...state}
            delete newState[action.deckId]
            return newState
            
        default:
            return state;
    }
}

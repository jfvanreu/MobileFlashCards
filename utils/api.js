import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashCards:deck'

export function fetchDecks(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(res => {
            const data = JSON.parse(res)
            return data
    })}

export function submitDeckEntry(deckEntry) {
    console.log('save deck to Async Storage', deckEntry)
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify (
        {[deckEntry.id]:deckEntry}))
}

export function removeDeck(deckId) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        data[deckId] = undefined
        delete data[deckId]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function getDeck(deckId) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
            .then((results) => (JSON.parse(results)[deckId]))
    }

export function submitCard(card, deckId){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results =>{
            const data =JSON.parse(results);
            data[deckId]={
                ...data[deckId],
                questions: [
                    ...data[deckId].questions,
                    card,
                ]
            }
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
        })
}

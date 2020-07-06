import React from 'react'
import { TouchableOpacity, Text, StyleSheet} from 'react-native'
import { white, purple } from '../utils/colors'

export default function SubmitBtn ({ children, onPress, myStyle, disabled }) {
    return (
            <TouchableOpacity
            style={{...styles.iosSubmitBtn, ...myStyle}}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.submitBtnText}>{children}</Text>
            </TouchableOpacity>
            )
}

const styles = StyleSheet.create({
    
iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20,
    },

submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
    },

})

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ripple from './Ripple'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function BottomIcon() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Ripple style={styles.ripple} onTap={()=>console.log("tap")}>
                <Text>BottomIcon</Text>
            </Ripple>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    ripple: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        // iOS
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        // Android
        elevation: 2,
    }
})
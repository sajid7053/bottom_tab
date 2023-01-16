import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HomeScreen from '../screens/HomeScreen';
import MySanar from '../screens/MySanar';
import ProfileScreen from '../screens/ProfileScreen';
import Icon, { Icons } from './Icons';
import { inject, observer } from 'mobx-react'
import LoginScreen from '../screens/LoginScreen';
import Ripple from './Ripple';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const Tab = createBottomTabNavigator();

const TabArr = [
    { route: 'Dashboard', label: 'Book Now', activeColor: 'blue', inactiveColor: '#9A969A', icon: Icons.FontAwesome, name: 'stethoscope', size: 30, component: HomeScreen },
    { route: 'MySanar', label: 'My Sanar', activeColor: 'blue', inactiveColor: '#9A969A', icon: Icons.Ionicons, name: 'ios-heart-outline', size: 40, component: MySanar },
    { route: 'Profile', label: 'Profile', activeColor: 'blue', inactiveColor: '#9A969A', icon: Icons.Feather, name: 'more-horizontal', size: 30, component: ProfileScreen }
];


const TabButton = inject('auth')(observer((props) => {
    const { item, onPress, accessibilityState, auth } = props;
    const focused = accessibilityState.selected;
    return (
        <GestureHandlerRootView style={styles.container}>
                <Ripple style={styles.ripple} onTap={() => onPress()}>
                    <Icon type={item.icon === Icons.Feather ? (auth.loggedIn ? Icons.MaterialCommunityIcons : Icons.Feather) : item.icon} name={item.name === 'more-horizontal' ? (auth.loggedIn ? 'account' : 'more-horizontal') : item.name} color={focused ? item.activeColor : item.inactiveColor} size={item.size} />

                    {/* <Text style={{ color: 'black', fontWeight: '500',}}>
                    {item.label}
                </Text> */}

                </Ripple>
        </GestureHandlerRootView>
    )
}))

const BottomTab = inject('auth')(observer((props) => {
    const { auth } = props
    const [loggedIn] = useState(auth.loggedIn)
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {

                    height: 70,



                    backgroundColor: '#fff',

                    borderTopLeftRadius: Platform.OS == "android" ? 25 : 10,
                    borderTopRightRadius: Platform.OS == "android" ? 25 : 10,
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: Platform.OS == "android" ? -1 : 2
                    },
                    borderWidth: Platform.OS == "android" ? StyleSheet.hairlineWidth : 0,
                    borderColor: Platform.OS == "android" ? '#D8D8D8' : '#fff',
                    borderTopWidth: 1,
                    shadowRadius: 3,
                    shadowOpacity: 1,
                    elevation: 24

                },
                unmountOnBlur: true,

            })}
        >
            {TabArr.map((item, index) => {
                console.log("gggg", auth.loggedIn)
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component === MySanar ? (auth.loggedIn ? MySanar : LoginScreen) : item.component}
                        options={{
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>

    );

}));

// const Bottom = () => {
//     return (
//         <GestureHandlerRootView>
//             <BottomTab />
//         </GestureHandlerRootView>
//     )
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    pressItem: {
        opacity: 0.5
    },
    ripple: {
        width: Platform.OS==='ios' ? 250 : 100,
        height: Platform.OS==='ios' ? 250 : 100,
        // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 25,
        // iOS
        // shadowOpacity: 0.2,
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 20,
        // Android
        elevation: 2,
    },
})

export default BottomTab
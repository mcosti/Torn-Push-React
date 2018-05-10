import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

import * as firebase from 'firebase'
// import firebase from 'react-native-firebase';



const firebaseConfig = {
    apiKey: "AIzaSyCe5rjJ-jRq92r13zlO5fSlx-nFR7a7bHI",
    authDomain: "torn-push-dev.firebaseapp.com",
    databaseURL: "https://torn-push-dev.firebaseio.com",
    projectId: "torn-push-dev",
    storageBucket: "torn-push-dev.appspot.com",
    messagingSenderId: "466086264106"
};

firebase.initializeApp(firebaseConfig);

// import the different screens
import Loading from './src/components/Loading'
import SignUp from './src/components/Signup'
import Login from './src/components/Login'
import Main from './src/components/Main'
// create our app's navigation stack
const App = createSwitchNavigator(
    {
        Loading,
        SignUp,
        Login,
        Main
    },
    {
        initialRouteName: 'Login'
    }
)
export default App
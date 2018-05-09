// Main.js
import React from 'react'
import { Notifications, Permissions } from 'expo';
import { StyleSheet, Platform, Image, Text, View, Alert } from 'react-native'
import * as firebase from 'firebase'


export default class Main extends React.Component {
    state = { currentUser: null, token: null, error: null };

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })


        Notifications.getExpoPushTokenAsync()
            .then(token => {
                Alert.alert(
                    'This is expo token',
                    `${token}`, [{text: 'OK', onPress: () => console.log('OK Pressed' + token)},], {cancelable: false}
                );

                this.setState({token});

            })
            .catch(err => {
                console.log(err);
            })
    }

    componentWillMount() {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(status => {
            if(status === 'granted') {
                Notifications.getDevicePushTokenAsync()
                    .then(token => {
                        Alert.alert(
                            'This is your token',
                            `${token}`, [{text: 'OK', onPress: () => console.log('OK Pressed' + token)},], {cancelable: false}
                        );
                        this.setState({token});
                    })
                    .catch(err => {
                        this.setState({error: err.toString()});
                    });

                Notifications.getExpoPushTokenAsync()
                    .then(token => {
                        Alert.alert(
                            'This is expo token',
                            `${token}`, [{text: 'OK', onPress: () => console.log('OK Pressed' + token)},], {cancelable: false}
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });
    }


    render() {
        const { currentUser, token } = this.state
        return (
            <View style={styles.container}>
                <Text>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <Text>
                    Your token: {token}
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
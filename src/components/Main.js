// Main.js
import React from 'react'
import { Notifications, Permissions } from 'expo';
import { StyleSheet, View, Alert} from 'react-native'
import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import * as firebase from 'firebase'


export default class Main extends React.Component {
    state = { currentUser: null, token: null, error: null, torn_key: null };

    logout = () => {
        firebase.auth().signOut().then( () => {
                console.log("Logged out")
                this.props.navigation.navigate('Login')
            }
        )
    };

    setValue = (key, value)  => {
        var users = firebase.database().ref("users")
        users.child(this.state.currentUser.uid).child(key).set(value).then(() => {
            console.log(key + ":" + value)
        })
    };


    setToken = () => {
        this.setValue("token", this.state.token);
    }

    setTornKey = () => {
        this.setValue("torn_key", this.state.torn_key)
    }



    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser }).then(this.setToken)




        Notifications.getExpoPushTokenAsync()
            .then(token => {
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
        const { currentUser, token, torn_key } = this.state
        return (
            <View style={styles.container}>
                <Text>
                    Hi {currentUser && currentUser.email}!
                </Text>

                <Input
                    onChangeText={(text) => this.setState({torn_key: text})}
                    value={this.state.torn_key}
                    placeholder={"Torn API Key"} />

                <Button block primary onPress={this.setTornKey.bind(this)}>
                    <Text>Save Token</Text>
                </Button>

                <Button block primary onPress={this.logout.bind(this)}>
                    <Text>Logout</Text>
                </Button>

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
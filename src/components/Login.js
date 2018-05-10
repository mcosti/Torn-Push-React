// Login.js
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';


import {Constants} from 'expo'


import * as firebase from 'firebase'

export default class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null, content: null };
    login = () => {
        const {email, password} = this.state;
        this.state.loading = true;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({errorMessage: error.message}));
    }

    goToSignup = () => {
        this.props.navigation.navigate('Main')
    }

    componentWillMount() {
        this.state.content = this.state.loading ?
            <View style={styles.body}>
                <ActivityIndicator size="large"/>
            </View> :

            <Content>
                <List>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({email: text})}
                                value={this.state.email}
                                placeholder={"Email Address"} />
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}
                                secureTextEntry={true}
                                placeholder={"Password"} />
                        </InputGroup>
                    </ListItem>
                </List>
                <Button style={styles.primaryButton} onPress={this.login.bind(this)}>
                    <Text>Login</Text>
                </Button>
                <Button onPress={this.goToSignup.bind(this)} style={styles.primaryButton}>
                    <Text>Sign up</Text>
                </Button>

            </Content>
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            email: '',
            password: '',
        }
    }

    render() {




        return (
                <Container>
                    <Header>
                        <Title>Login</Title>
                    </Header>

                    {this.state.content}
                </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flex: 1
    },
    body: {
        flex: 9,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#F5FCFF',
    },
    primaryButton: {
        margin: 10,
        padding: 15,
        alignSelf:'center',
        backgroundColor:"blue",
        width:150,
    },
});
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default class SignIn extends Component {
    state = { email: '', password: '', token: '', userId: '' };
    handleLogin = () => {
        const { email, password } = this.state
        if (email != '' && password != '') {
            fetch('https://moonsite-rn-follow-test.herokuapp.com/api/usr/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email.trim(),
                "password": password,
                }),
            })
            .then(response => response.json())
            .then((responseJson) => {
                if(responseJson.res)
                {
                    this.setState({
                        token: responseJson.data.token,
                        userId: responseJson.data.userId
                    });
                    this.props.navigation.navigate('DashBoard', {token: this.state.token, userId: this.state.userId});
                }
                else
                {
                    Alert.alert(responseJson.msg)
                }
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            Alert.alert("Please enter a valid input!")
        }
    }
  
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Sign In</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Social App</Text>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="Email"
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            placeholderTextColor={"grey"}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            secureTextEntry={true}
                            textContentType={'password'}
                            placeholder="Password"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                            placeholderTextColor={"grey"}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.loginContainer}
                        onPress={() => this.handleLogin()}
                    >
                        <Text style={styles.loginText}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginContainer}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    >
                        <Text style={styles.loginText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  }

const styles = StyleSheet.create({
    headerContainer: {
        height: 80,
        paddingTop: 30, 
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    header: {
        color: "#00334e",
        fontFamily: 'Futura',
        fontSize: 25,
        marginBottom: 10,
        alignContent: 'center',
        alignSelf: 'center'
    },
    container: {
        alignItems: "center",
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#00334e",
        marginTop: 20,
        marginBottom: 20
    },
    loginContainer: {
        width: "80%",
        backgroundColor: "#00334e",
        borderRadius: 25,
        padding: 10,
        marginTop: 30
    },
    loginText: {
        color: "white",
        textAlign: "center",
    },
    InputContainer: {
        width: "80%",
        marginTop: 30,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey",
        borderRadius: 25
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: "#696969"
    }
});
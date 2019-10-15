import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from "react-native";

export default class SignUp extends Component {

    state = { email: '', password: '', token: '', userId: '' };

    handleSignUp = () => {
        const { email, password } = this.state
        
        if (email != '' && password != '')
        {
            fetch('https://moonsite-rn-follow-test.herokuapp.com/api/usr/register', {
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
                    this.props.navigation.navigate('DashBoard', {token: this.statetoken, userId: this.state.userId});
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
                    <Text style={styles.headerCenter}>Sign Up</Text>
                    <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={styles.headerLeft}>Go Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Create new account</Text>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            onChangeText={(email) => this.setState({email})}
                            placeholder='Email'
                            autoCapitalize="none"
                            value={this.state.email}
                            placeholderTextColor={"grey"}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            textContentType={'password'}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            placeholder='Password'
                            autoCapitalize="none"
                            value={this.state.password}
                            placeholderTextColor={"grey"}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <TouchableOpacity
                            style={styles.signUpContainer}
                            onPress={this.handleSignUp}
                    >
                        <Text style={styles.signUpText}>Create account</Text>
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
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headerCenter: {
        color: "#00334e",
        fontFamily: 'Futura',
        fontSize: 25,
        marginBottom: -20,
        alignContent: 'center',
        alignSelf: 'center'
    },
    headerLeft: {
        color: "#00334e",
        fontFamily: 'Futura',
        fontSize: 15,
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        paddingLeft: 10
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
    signUpContainer: {
        width: "80%",
        backgroundColor: "#00334e",
        borderRadius: 25,
        padding: 10,
        marginTop: 30
    },
    signUpText: {
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      padding: 12,
      color: 'black',
      paddingRight: 30
    }
});
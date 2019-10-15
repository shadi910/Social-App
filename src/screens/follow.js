import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Users from '../components/users';

export default class Follow extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userId: '',
            token: this.props.navigation.getParam('token', ''),
            tilte: this.props.navigation.getParam('title', '')
        }
    }

    render()
    {
        return(
            <View style={{flex: 1}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerCenter}>{this.state.tilte}</Text>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.goBack()} >
                        <Text style={styles.headerLeft}>Go Back</Text>
                    </TouchableOpacity>
                </View>
                <Users 
                    navigation={this.props.navigation}
                    token={this.state.token}
                    userId={this.state.userId}
                    isFollowers={this.state.tilte == 'Followers'}
                />
            </View>
        )
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
        paddingBottom: 20, 
        borderBottomWidth: 10,
        borderColor: '#eee',
    },
    title: {
        fontSize: 25,
        fontFamily: 'Futura',
        color: "#00334e",
    },
    buttonContainer: {
        backgroundColor: "#00334e",
        borderRadius: 25,
        padding: 10,
        marginTop: 10
    },
    rowOrder: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    InputContainer: {
        width: "50%",
        marginTop: 30,
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: "#696969",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey"
    }
});
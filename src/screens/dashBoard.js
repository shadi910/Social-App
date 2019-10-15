import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { removeUserData } from '../redux/actions';
import Posts from '../components/posts';

class DashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userId: this.props.navigation.getParam('userId', ''),
            token: this.props.navigation.getParam('token', '')
        }
    }

    logoutUser = () => {
        this.props.removeUserData()
        .then(() => {
            this.props.navigation.navigate('SignIn');
        })
    }

    render()
    {
        return(
            <View style={{flex: 1}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerCenter}>Dash Board</Text>
                    <TouchableOpacity 
                        onPress={() => {this.logoutUser()}} >
                        <Text style={styles.headerLeft}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.rowOrder}>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('AddPost', { userId: this.state.userId, token: this.state.token })}
                        style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Add post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Follow', { userId: this.state.userId, title: 'Followers', token: this.state.token })}
                        style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Follow', { userId: this.state.userId, title: 'Following', token: this.state.token })}
                        style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Following</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Posts 
                    navigation={this.props.navigation}
                    userId={this.state.userId}
                    token={this.state.token}
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

const mapStateToProps = state => ({
    token: state.data.token,
    userId: state.data.userId,
});

const mapDispatchToProps = dispatch => ({
    removeUserData: () => dispatch(removeUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
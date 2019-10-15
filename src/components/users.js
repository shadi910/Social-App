import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, Alert } from 'react-native';


export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            token: this.props.token,
            loading: true,
            users: [],
            refresh: false
        }
    }

    componentDidMount = () => {
        this.loadUsers();
    }

    loadUsers(isFollowers=this.props.isFollowers)
    {
        isFollowers ? this.loadFollowers() : this.loadFollowing();
    }

    loadFollowers = () => {
        const { token } = this.state;
        var that = this;
        that.setState({
            refresh: true,
            loading: true,
            users: []
        });
        
        fetch('https://moonsite-rn-follow-test.herokuapp.com/api/follower/get-my-followers', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
                'Content-Type': 'application/json',
            }
            })
            .then(response => response.json())
            .then((responseJson) => {
                if(responseJson.res)
                {
                    that.setState({ 
                        users: responseJson.data
                    });
                }
                else
                {
                    Alert.alert(responseJson.msg)
                }
            })
            .catch((error) => {
                console.error(error);
            });

        that.setState({ 
            refresh: false,
            loading: false
        });
    }

    loadFollowing = () => {
        const { token } = this.state;
        var that = this;
        that.setState({
            refresh: true,
            loading: true,
            users: []
        });
        
        fetch('https://moonsite-rn-follow-test.herokuapp.com/api/follower/get-followers-by-user-id', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
                'Content-Type': 'application/json',
            }
            })
            .then(response => response.json())
            .then((responseJson) => {
                if(responseJson.res)
                {
                    that.setState({ 
                        users: responseJson.data
                    });
                }
                else
                {
                    Alert.alert(responseJson.msg)
                }
            })
            .catch((error) => {
                console.error(error);
            });

        that.setState({ 
            refresh: false,
            loading: false
        });
    }

    _listEmptyComponent = () => {
        const { loading } = this.state;
        return (
            <View style={styles.emptyList}>
                {loading ? <Text>Loading...</Text> : <Text>No users...</Text>}
            </View>
        )
    }

    render()
    {
        return(
            <View style={{flex: 1, marginTop: 10}}>
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadUsers}
                    data={this.state.users}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this._listEmptyComponent}
                    style={styles.flatList}
                    renderItem={({item, index}) => (
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.userContainer}>
                                <Text style={styles.user}>"{item.email.toString()}"</Text>
                            </View>
                        </View> 
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 10,
        borderColor: '#eee'
    },
    textContainer: {
        padding: 5,
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        color: '#00334e',
        fontSize: 16,
        fontFamily: 'Futura',
        fontStyle: 'italic'
    },
    flatList : {
        flex: 1,
        backgroundColor: 'white'
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userContainer: {
        padding: 5,
        alignItems: 'center'
    },
    user: {
        marginLeft: 10,
        color: '#00334e',
        fontSize: 16,
        fontFamily: 'Futura',
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10
    },
    buttonText: {
        marginTop: 4,
        fontFamily: 'Futura'
    }
})
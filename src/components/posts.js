import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Text, View, StyleSheet, Alert, Image } from 'react-native';


export default class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            token: this.props.token,
            loading: true,
            posts: [],
            refresh: false
        }
    }

    componentDidMount = () => {
        this.loadFeed();
    }

    loadFeed = () => {
        const { token } = this.state;
        var that = this;
        that.setState({
            refresh: true,
            loading: true,
            posts: []
        });
        
        fetch('https://moonsite-rn-follow-test.herokuapp.com/api/post/get-all-posts', {
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
                    posts: responseJson.data
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

    deletePost = (item) => {
        fetch('https://moonsite-rn-follow-test.herokuapp.com/api/post/delete-post-by-id/' + item.post_id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: this.state.token,
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson.res)
            {
                Alert.alert('Post successfully deleted')
                this.loadFeed();
            }
            else
            {
                Alert.alert(responseJson.msg)
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    followUser = (item) => {
        fetch('https://moonsite-rn-follow-test.herokuapp.com/api/follower/add-follower', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: this.state.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "f_user_id": item.user_id,
                }),
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson.res)
            {
                Alert.alert('User successfully followed')
            }
            else
            {
                Alert.alert('You already follow this user')
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    _listEmptyComponent = () => {
        const { loading } = this.state;
        return (
            <View style={styles.emptyList}>
                {loading ? <Text>Loading...</Text> : <Text>No meals found...</Text>}
            </View>
        )
    }

    render()
    {
        return(
            <View style={{flex: 1, marginTop: 10}}>
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadFeed}
                    data={this.state.posts}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this._listEmptyComponent}
                    style={styles.flatList}
                    renderItem={({item, index}) => (
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.buttonContainer}>
                                {!item.is_my_post ? <TouchableOpacity
                                    onPress={() => this.followUser(item)}>
                                    <Text style={styles.buttonText}>Follow</Text>
                                </TouchableOpacity> : <View></View>}
                            </View>
                            <View>
                                <Image
                                    source={{uri: item.image_url.toString()}}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.postTitleContainer}>
                                <Text style={styles.postTitle}>"{item.title.toString()}"</Text>
                            </View>

                            <View style={styles.buttonContainer}>
                                {item.is_my_post ? <TouchableOpacity
                                    onPress={() => this.deletePost(item)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity> : <View></View>}
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
    image: {
        resizeMode: 'contain',
        width: '100%',
        height: 275,
        borderWidth: 10,
        borderColor: '#eee'
    },
    postTitleContainer: {
        padding: 5,
        alignItems: 'center'
    },
    postTitle: {
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
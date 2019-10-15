import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions';

class Loading extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = () => {

        this.props.getUserData()
        .then(() => {
            if (this.props.token !== null)
            {
                this.props.navigation.navigate('DashBoard', { token: this.props.token, userId: this.props.userId });
            }
            else
            {
                this.props.navigation.navigate('SignIn');
            }
        })

    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    token: state.data.token,
    userId: state.data.userId
});


const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch(getUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
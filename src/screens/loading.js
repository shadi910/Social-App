import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { auth } from '../../config/config';

export default class Loading extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('UserProfile', { userId: user.uid });
      } else {
        this.props.navigation.navigate('Signin')
      }
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
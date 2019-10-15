import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashBoard from './src/screens/dashBoard';
import AddPost from './src/screens/addPost';
import SignUp from './src/screens/signUp';
import SignIn from './src/screens/signIn';
import Follow from './src/screens/follow';
// import Loading from './src/screens/loading';

const RootStack = createStackNavigator(
  {
    Signin: { screen: SignIn },
    SignUp: { screen: SignUp },
    // Loading: { screen: Loading },
    DashBoard: { screen: DashBoard },
    AddPost: { screen: AddPost },
    Follow: { screen: Follow },
  },
  {
    initialRouteParams: 'Signin',
    mode: 'modal',
    headerMode: 'none'
  }
)

const MainStack = createAppContainer(RootStack);

export default class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <MainStack />
    );
  }
}

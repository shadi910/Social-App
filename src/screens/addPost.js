import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, Platform,
    KeyboardAvoidingView, SafeAreaView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styled from 'styled-components/native';
import HeaderDetail from '../components/HeaderDetail';
import SectionCardCentered from '../components/SectionCardCentered';
import colors from '../components/colors';
import BottomActionButton from '../components/BottomActionButton';
import TransparentInput from '../components/TransparentInput';

const StyledContainer = styled.View`
  background-color: ${colors.background};
  align-self: stretch;
  flex: 1;
`;

export default class AddPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageSelected: false,
            token: this.props.navigation.getParam('token', ''),
            titleValue: '',
            images: []
        }
    }

    findNewImage = async () => {
        ImagePicker.showImagePicker((response) => {
            if (response.didCancel) {
                this.setState({ imageSelected: false });
            } else if (response.error) {
                this.setState({ imageSelected: false });
            } else if (response.customButton) {
                this.setState({ imageSelected: false });
            } else {
                this.setState({
                    imageSelected: true,
                    uri: `data:image/jpeg;base64,${response.data}`
              })
            }
        });
    }

    uploadPublish = () => {
        if (this.state.titleValue != '' && this.state.imageSelected) {
            this.uploadImage(this.state.uri);
        } else {
            Alert.alert('Please enter a caption and select an image!');
        }
    }

    uploadImage = (uri) => {
        fetch('https://moonsite-rn-follow-test.herokuapp.com/api/post/add-post', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: this.state.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": this.state.titleValue,
                "image_url": uri
                })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson.res)
            {
                Alert.alert('Post successfully posted')
                this.setState({
                    imageSelected: false,
                    uri: '',
                    titleValue: ''
                })
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

    handleLeftHeaderButton = () => {
        this.setState({
            imageSelected: false,
            titleValue: '',
            uri: '',
            images: []
        })
        this.props.navigation.goBack();
    }

    render()
    {
        return(
            <SafeAreaView style={styles.headerContainer}>
                <HeaderDetail
                    hasBar={false}
                    headerTitle={'New Post'}
                    leftHeaderIcon={'Cancel Post'}
                    leftHeaderButtonAction={this.handleLeftHeaderButton}
                />
                <StyledContainer>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={150}
                        style={styles.bodyContainer}
                        behavior="padding"
                        enabled={Platform.OS === 'ios'}
                    >
                        <SectionCardCentered>
                            <TransparentInput
                            value={this.state.titleValue}
                            placeholder="Post Title"
                            onChangeText={titleValue =>
                                this.setState({ titleValue })
                            }
                            placeholderTextColor={colors.mediumNeutral}
                            />
                        </SectionCardCentered>
                        {!this.state.imageSelected ? (
                        <TouchableOpacity
                            onPress={() => this.findNewImage()}
                            style={styles.selctPhotoButtonContainer}>
                                <Text style={styles.selctPhotoButtonText}>Select Photo</Text>
                        </TouchableOpacity>
                        ):(
                        <Image 
                            source={{uri: this.state.uri}}
                            style={styles.imageContainer}
                        />
                        )}
                    </KeyboardAvoidingView>
                    <BottomActionButton
                        active={this.state.readyToPost}
                        title="Post it!"
                        onPress={() => this.uploadPublish()}
                    />
                </StyledContainer>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1
    },
    bodyContainer: {
        flex: 1
    },
    selctPhotoButtonContainer: {
        paddingVertical: 10,
        paddingBottom: 15,
        backgroundColor: 'blue',
        borderRadius: 5
    },
    selctPhotoButtonText: {
        color: 'white'
    },
    imageContainer: {
        marginTop: 10,
        resizeMode: 'contain',
        width: '100%',
        height: 275
    },
    uploadContainer: {
        marginTop: 10
    }
})
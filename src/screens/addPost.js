import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, Text, View, Image, Platform,
    KeyboardAvoidingView, SafeAreaView, ScrollView, Alert } from 'react-native';
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
            readyToPost: false,
            imageId: this.uniqueId(),
            imageSelected: false,
            token: this.props.navigation.getParam('token', ''),
            titleValue: '',
            titleHasError: false,
            images: []
        }
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + 
        this.s4() + '-' + this.s4() + '-' +this.s4();
    }

    findNewImage = async () => {
        ImagePicker.showImagePicker((response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
              this.setState({ imageSelected: false });
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              this.setState({ imageSelected: false });
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              this.setState({ imageSelected: false });
            } else {
              this.setState({
                  imageSelected: true,
                  imageId: this.uniqueId(),
                  uri: `data:image/jpeg;base64,${response.data}`
              })
            }
        });
    }

    changeFormValue = value => {
        this.setState({ ...value }, () => {
            if (this.state.titleValue !== '') 
            {
                this.setState({ readyToPost: true });
            } else {
                this.setState({ readyToPost: false });
            }
        });
    };

    handleRemoveImage = value => {
        if (this.state.postToEdit) {
            const images = this.state.images;
            const newArray = images.filter(el => el.id !== value.id);
            this.setState({
            images: newArray,
            removedImages: [...this.state.removedImages, value],
            });
        } else {
            const images = this.state.images;
            const newArray = images.filter(el => el !== value);
            this.setState({ images: newArray });
        }
    };

    uploadPublish = () => {
        if (this.state.readyToPost && this.state.imageSelected) {
            this.uploadImage(this.state.uri);
        } else {
            alert('Please enter a caption and select an image!');
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
                Alert.alert('Error in posting, try again')
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleLeftHeaderButton = () => {
        this.setState({
            uploading: false,
            imageSelected: false,
            contentValue: '',
            titleValue: '',
            readyToPost: false,
            radius: 1,
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
                        <ScrollView>
                            <SectionCardCentered hasError={this.state.titleHasError}>
                                <TransparentInput
                                value={this.state.titleValue}
                                placeholder="Post Title"
                                onChangeText={titleValue =>
                                    this.changeFormValue({ titleValue })
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
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <BottomActionButton
                        active={this.state.readyToPost}
                        title="Post it!"
                        onPress={() => this.uploadPublish()}
                    />
                </StyledContainer>
                { this.state.uploading ? (
                    <View style={styles.uploadContainer}>
                        <Text>{this.state.progress}%</Text>
                        { this.state.progress != 100 ? (
                            <ActivityIndicator size="small" color="blue" />
                        ) : (
                            <Text>Processing</Text>
                        )}
                    </View>
                ) : (
                    <View></View>
                )}
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
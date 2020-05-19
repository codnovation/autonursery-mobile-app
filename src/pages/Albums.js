import React, { Component } from 'react';
import {
  View,
  Image,
  RefreshControl,
  Dimensions,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  CameraRoll,
  TouchableHighlight,
  Platform,
  Alert,
  Modal
} from 'react-native';
import { HeaderComponent } from "../Components/header";
import { Icon, List, Content, ListItem, Body, Card, CardItem, Row } from 'native-base';
import { Auth } from "../modules/Auth";

import RNFetchBlob from 'react-native-fetch-blob'

const { width, height } = Dimensions.get('window')

export default class Albums extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      albums: [],
      modalVisible: false,
      url: 'http://162.241.234.129:3000/',
      selectedPhoto: require('./assets/photos/album.png'),
    }
  }

  componentDidMount () {
    this.refreshList();
  }

  saveToCameraRoll = (image) => {
    if (Platform.OS === 'android') {
      RNFetchBlob
      .config({
        fileCache : true,
        appendExt : 'jpg'
      })
      .fetch('GET', image.url)
      .then((res) => {
        CameraRoll.saveToCameraRoll(res.path())
          .then(Alert.alert('Success', 'Photo added to camera roll!'))
          .catch(err => console.log('err:', err))
      })
    } else {
      CameraRoll.saveToCameraRoll(image.url)
        .then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }

  refreshList = async () => {
    this.setState({isRefreshing:true});
    await Auth.getToken().then(value => {
      this.setState({token: value});
    });

    let { token } = this.state;
    // fetch(`http://162.241.234.129:3000/api/user/${id}/requests`,
    fetch(`http://162.241.234.129:3000/api/albums`,
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(result => result.json()).then(albums =>{
      this.setState({albums,
      isRefreshing: false});
      return albums;
    }).catch(err => {
      return err;
    });
  }

  static navigationOptions = {
    drawerIcon: () => (
      <Image source={require('./assets/photos/album.png')}
        style={{width:50, height: 50}} />
    )
  };

  showModal = (show) => {
    this.setState({ modalVisible: show });
  }

  render (){
    let { albums } = this.state;
    return (
      <View>
        <HeaderComponent
        title="Albums"
        {...this.props}
        />
        <List
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.refreshList}
            />}
            style={ styles.list }
            dataArray={albums}
            renderRow={(item) => {
              return (
                  <Content>
                    <Card style={{flex: 0}}>
                      <CardItem>
                        <Body key={item.name}
                          style={{width: "100%", alignItems: 'center'}}>
                          <Text>{ item.name }</Text>
                        </Body>
                      </CardItem>
                      <CardItem>
                        <Body style={{ flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                          alignItems: 'stretch' }}>
                          {
                            item.photos.map((photo, i) => {
                              this.setState({ selectedPhoto: photo })
                              return (
                                <TouchableHighlight
                                  key={i}
                                  onPress={() => this.showModal(true)}
                                  underlayColor='transparent'
                                >
                                  <Image source={{ uri: `${this.state.url}${photo.url}` }}
                                    style={{ height: 75, width: 75,  resizeMode: "stretch"}}/>
                                </TouchableHighlight>
                              );
                            })
                          }
                        </Body>
                    </CardItem>
                  </Card>
                </Content>
              )}
          }/>
          <Modal style={styles.modal}
            animationType={'fade'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}} >
            <View style={styles.modal}>
              <Text style={styles.text}
                  onPress={() => {this.showModal(false)}}
              > Close </Text>
              <TouchableHighlight
                onPress={() => this.saveToCameraRoll(this.state.selectedPhoto)}
                underlayColor='transparent'
              >
                <Image source={{ uri: `${this.state.url}${this.state.selectedPhoto.url}` }}
                    style={{ height: 500, width: '100%'}}
                    />
              </TouchableHighlight>
            </View>
          </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee'
  },
  imageWrap: {
    margin: 2,
    padding: 2,
    height: (Dimensions.get('window').height/3) - 12,
    width: (Dimensions.get('window').width/2) - 4,
    backgroundColor: '#fff',
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  text:{
    color: '#fff'
  },
  list: {
    height: '100%',
    marginTop: 10
  },
  listItem: {
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
});

{/*

    <View style={styles.modal}>
      <Text style={styles.text}
          onPress={() => {this.setModalVisible(false)}}
      > Close </Text>
      <GalleryImage imagesource={this.state.modalImage} />
    </View>
  </Modal>
  */}

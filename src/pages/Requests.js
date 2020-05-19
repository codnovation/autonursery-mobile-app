import React, { Component } from 'react';
import { Image, StyleSheet, RefreshControl, AsyncStorage, Dimensions } from 'react-native';
import { HeaderComponent } from "../Components/header";
import { Container, List, Left, Body, Right, Button, Icon, ListItem, Segment, Content, CardItem, Text, Card, View  } from 'native-base';
import { Auth } from "../modules/Auth";

let types = {
  "Milk": require("./assets/photos/RequestTypes/milk.png"),
  "Request": require("./assets/photos/RequestTypes/request.png"),
  "Dipers": require("./assets/photos/RequestTypes/dipers.png"),
}

export default class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      url: '',
      items: [],
      requests: [],
      status: 'Pending',
      token:'',
      id: '',
      isRefreshing: false,
      pendingPageActive: true,
      completedPageActive: false
    }
  }
  static navigationOptions = {
    drawerIcon: () => (
      <Image source={require('./assets/photos/request.png')}
        style={{width:50, height: 50}} />
    )
  };
  showList = (e, btnId) => {
    if (btnId === 'Pending'){
      this.setState({
        status: btnId,
        pendingPageActive: true,
        completedPageActive: false
      });
    }
    else {
      this.setState({
        status: btnId,
        pendingPageActive: false,
        completedPageActive: true,
      });
    }
  }

  getID = async () => {
    await AsyncStorage.getItem('ID').then(value => {
      this.setState({id: value});
    });
  }


   refreshList = async () => {
    this.setState({isRefreshing:true});
    await Auth.getToken().then(value => {
      this.setState({token: value});
    });

    let { url, id } = this.state;
    let { token } = this.state;
    // fetch(`http://162.241.234.129:3000/api/user/${id}/requests`,
    fetch(`http://162.241.234.129:3000/api/user/${id}/requests`,
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(result => result.json()).then(items =>{
      let requests = items.requests;

      this.setState({items,
        requests,
      isRefreshing: false});
      return items;
    }).catch(err => {
      return err;
    });
  }

  getDate(date){
    let today = new Date(date);
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    return dd+'/'+mm+'/'+yyyy;
  }

  componentDidMount () {
    this.getID();
    this.refreshList();
  }
  render (){
  const { width } = Dimensions.get('window');
  let { items, id, requests, status } = this.state;
  let selectedList = requests;
  if (status === 'Pending'){
    selectedList = requests.filter(selected => {
      return selected.status == "Pending";
    })
  } else {
    selectedList = requests.filter(selected => {
      return selected.status == "Completed";
    })
  }
    return (
      <View style={{ marginBottom: 50}}>
          <HeaderComponent
            title="Requests"
            {...this.props}
            />
          <Segment style={{ backgroundColor: '#f2f2f2', marginTop: 10}}>
            <Button style={styles.segmentButton}
              active={this.state.pendingPageActive}
              onPress={(event)=> this.showList(event, 'Pending')}
              first>
              <Text>Pending</Text>
            </Button>
            <Button style={styles.segmentButton}
              active={this.state.completedPageActive}
              onPress={(event)=> this.showList(event, 'Completed')}
              last>
              <Text>Completed</Text>
            </Button>
          </Segment>
          <List style={{marginLeft: 20, marginBottom: 50}}
            refreshControl={ <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refreshList}

                              />}
            dataArray={selectedList}
            renderRow={(item) =>
              <ListItem style={styles.listItem}>
                    <Left style={styles.bigCard}>
                      <View style={styles.bigCardView}>
                        <Image source={require('./assets/photos/boy.png')}
                          style={styles.profileCircle}/>
                        {/*<Image source={require('./assets/photos/boy.png')}
                            style={styles.profileCircle}/>*/}
                      </View>
                      <View style={styles.titleView}>
                        <Text style={{ color: '#394449' }}>{item.title}</Text>
                      </View>
                      <View style={styles.icon}>
                        <Image source={types[item.title]}
                          style={styles.iconPhoto}/>
                      </View>
                    </Left>
                    <Body style={styles.bigCardBody}>
                      <View style={styles.dateView}>
                        <Text note style={{ textAlign: 'right' }}>{this.getDate(item.date)}</Text>
                      </View>
                      <View style={styles.descView}>
                        <Text style={styles.descViewText}>{ item.description }</Text>
                      </View>
                      <View style={styles.sttView}>
                        <Text style={styles.smallCard}>{ item.status }</Text>
                      </View>
                    </Body>
                  </ListItem>
            }/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  listItem: {
    height: 150,
    marginTop: 20
  },
  profileCircle: {
    width: 70,
    height: 70,
    position: 'relative',
    top: -55,
    marginLeft: 5,
    },
  titleView: {
    position: 'relative',
    top: -65,
    left: 35,
    height: 20,
  },
  dateView:{
    position: 'relative',
    top: -20,
    height: 20,
  },
  bigCard: {
    height: 90,
    backgroundColor: '#f2f2f2',
    flex: 0.6,
    alignItems: 'center',
  },
  bigCardView:{
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  bigCardBody: {
    height: 90,
    backgroundColor: '#f2f2f2',
    flex: 2,
    alignItems: 'stretch'
  },
  smallCard: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    backgroundColor: '#f2f2f2',
    color: '#e31837'
  },
  descView: {
    position: 'relative',
    top: -20,
    height: 70,
    justifyContent: 'center',
    borderLeftWidth: 2 ,
    borderBottomWidth: 2,
    borderColor: '#ffffff'
  },
  descViewText:{
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    marginLeft: 10,
    color: '#828282'
  },
  sttView: {
    backgroundColor: '#f2f2f2',
    borderLeftWidth: 2 ,
    borderColor: '#ffffff',
    position: 'relative',
    top: -20,
    height: 20,
    marginRight: 10
  },
  iconPhoto: {
    marginLeft: -70,
    width: 70,
    height: 70
  },
  segmentButton:{
    // backgroundColor: '#e31837',
    // color:'#ffffff',
    // borderColor: '#f2f2f2'
  },
  segment: {
    // color: '#fff'
  }
});

import React, { Component } from 'react';
import { Image, StyleSheet, RefreshControl, AsyncStorage, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Container, List, Left, Body, Right, Button, Icon, ListItem, Segment, Content, CardItem, Text, Card, View  } from 'native-base';
import { HeaderComponent } from "../Components/header";
import { Auth } from "../modules/Auth";

let types = {
  "Message": require("./assets/photos/Others/message.png"),
  "Request": require("./assets/photos/Others/request.png"),
}


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      url: '',
      items: [],
      requests: [],
      status: 'pending',
      token:'',
      id: '',
      isRefreshing: false,
    }
  }
  static navigationOptions = {
      drawerIcon: () => (
        <Image source={require('./assets/photos/feeds.png')}
          style={{width:50, height: 50}} />
      )
  };
  showList = (e, btnId) => {
    if (btnId === 'pending'){
      this.setState({
        status: btnId
      });
    }
    else {
      this.setState({
        status: btnId
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
    // fetch(`http://162.241.234.129:3000/api/feeds/${id}`,
    fetch(`http://162.241.234.129:3000/api/feeds/${id}`,
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(result => result.json()).then(items =>{
      let requests = items.requests.map(d => {
        return d;
      });
      this.setState({items,
        requests,
      isRefreshing: false});
      return items;
    }).catch(err => {
      return err;
    });
  }

  Img(props){
    let title = props.title;
    if(title === "Message"){
      return <View><Image source={types["Message"]} style={styles.iconPhoto}/></View>
    }
    else {
      return <View><Image source={types["Request"]} style={styles.iconPhoto}/></View>
    }
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

  render() {
    const { width } = Dimensions.get('window');
    let { items, requests, id } = this.state;
    let renderedArray = requests.slice(0,20);

    return (
      <View style={{ marginBottom: 50}}>
          <HeaderComponent
            title="Home"
            {...this.props}
            />
          <List style={{marginLeft: 20, marginBottom: 50, height: "100%"}}
            refreshControl={ <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refreshList}

                              />}
            dataArray={renderedArray}
            renderRow={item =>
              <ListItem style={styles.listItem}>
                    <Left style={styles.bigCard}>
                      <View style={styles.bigCardView}>
                        <Image source={require('./assets/photos/boy.png')}
                          style={styles.profileCircle}/>
                        {/*<Image source={require('./assets/photos/boy.png')}
                            style={styles.profileCircle}/>*/}
                      </View>
                      <View style={styles.titleView}>
                        <Text style={styles.titleText}>{item.title}</Text>
                      </View>
                      <View style={styles.icon}>
                        <this.Img title={item.title} />
                      </View>
                    </Left>
                    <Body style={styles.bigCardBody}>
                      <View style={styles.dateView}>
                        <Text note style={{ textAlign: 'right' }}>{this.getDate(item.date)}</Text>
                      </View>
                      <View style={styles.descView}>
                        <Text style={ styles.descViewText }>{ item.description }</Text>
                      </View>
                      <View style={styles.sttView}>
                        <Text style={styles.smallCard}>{ item.status }</Text>
                      </View>
                    </Body>
                  </ListItem>
            }/>
      </View>

    );
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
    // borderRadius: 35,
    position: 'relative',
    top: -55,
    left: 5
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
    color: '#828282',
    marginLeft: 10,
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
  titleText: {
    color: '#394449'
  }
});

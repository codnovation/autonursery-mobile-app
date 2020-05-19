import React, { Component } from 'react';
import { View, Image, RefreshControl, StyleSheet, AsyncStorage, ScrollView, TouchableHighlight } from 'react-native';
import { HeaderComponent } from "../Components/header";
import { Container, List, Left, Body, Right, Button, Icon, ListItem, Text, Content, Thumbnail } from 'native-base';
import { Auth } from "../modules/Auth";
import moment from 'moment';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      id: '',
      items: [],
      children: [],
      token: '',
      selectedChild: {}
    }
  }
  static navigationOptions = {
    headerVisible: false,
    header: null,
    drawerIcon: () => (
      <Image source={require('./assets/photos/profile.png')}
        style={{width:50, height: 50}} />
    )
  };
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

   let { id, token } = this.state;
   // fetch(`http://162.241.234.129:3000/api/user/${id}`,
   fetch(`http://162.241.234.129:3000/api/user/${id}`,
     {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': `bearer ${token}`
     }
   }).then(result => result.json()).then(items =>{
     let children = items.children;
     this.setState({items,
       children,
     isRefreshing: false});
     return items;
   }).catch(err => {
     return err;
   });
  }

  componentDidMount () {
    this.getID();
    this.refreshList();
  }

  signOut = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }

  findChild = async (id) => {
    let { token } = this.state;
    // await fetch(`http://162.241.234.129:3000/api/children/${id}`,
    await fetch(`http://162.241.234.129:3000/api/children/${id}`,
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(result => result.json()).then(selectedChild =>{
      this.setState({selectedChild,
      isRefreshing: false});
      return items;
    }).catch(err => {
      return err;
    });
    this.goToProfile();
  }

  goToProfile = () => {
    let { selectedChild } = this.state;
    this.props.navigation.navigate('ChildProfile', { child: selectedChild });
  }

  getAge = (a) => {
    let today = moment();

    let years = today.diff(a, 'year');
    a.add(years, 'years');

    let months = today.diff(a, 'months');
    a.add(months, 'months');

    let days = today.diff(a, 'days');
      return (years + ' Years - ' + months + ' Months - ' + days + ' Days');
  }

  render (){
    let { items, children } = this.state;
    return (
      <View style={{ height: "100%"}}>
        <HeaderComponent
        title="Profile"
        {...this.props}
        />
      <ScrollView>
        <List style={{ height: "100%" }}>
          <View>
            <ListItem itemDivider
              style={{ backgroundColor: '#f2f2f2', marginTop: 10, paddingTop: 10}}>
              <Text style={{ color: '#e31837' }}>User</Text>
            </ListItem>
            <ListItem >
              <Left style={styles.left}>
                  <Thumbnail
                    source={require('./assets/photos/boy.png')}
                    style={styles.innerProfileCircle}
                    />
              </Left>
              <Body style={styles.body}>
                <Text style={{ color: '#394449' }}>{items.firstName} {items.lastName}</Text>
              </Body>

            </ListItem>
            <ListItem itemDivider
              style={{ backgroundColor: '#f2f2f2'}}>
              <Text style={{ color: '#e31837' }}>Children</Text>
            </ListItem>
            <View>
              {
                children.map(child => {
                  return (
                  <ListItem style={styles.listItem}>
                    <Left style={styles.leftChildren}>
                      <Button
                        style={styles.button}
                        onPress={(id) => { this.findChild( child._id ) }}>
                        <Thumbnail source={require('./assets/photos/boy.png')}
                          style={styles.innerChildrenCircle}/>
                      </Button>
                    </Left>
                    <TouchableHighlight
                      underlayColor={'#f2f2f2'}
                      onPress={(id) => { this.findChild( child._id ) }}
                      style={styles.bodyChildren}>
                      <Body>
                          <Text style={styles.bodyText}>{child.firstName}</Text>
                          <Text style={styles.bodyText2}>{this.getAge(moment.utc(child.dateOfBirth).local())}</Text>
                      </Body>
                    </TouchableHighlight>
                  </ListItem>
                  );
                })
              }
            </View>
            <View style={{justifyContent: 'center', top: 20, alignSelf: 'center', width: 250, paddingBottom: 30}}>
              <Button
                block danger
                style={{backgroundColor: '#e31837', maxWidth: 250}}
                onPress={() => this.signOut()}>
                <Text>Log Out</Text>
              </Button>
            </View>
          </View>
        </List>
      </ScrollView>
    </View>
);
  }
}
const styles = StyleSheet.create({
    listItem: {
      width: "95%",
      height: 150,
      marginTop: 20,
    },
  innerProfileCircle: {
    width:100,
    height: 100,
    borderWidth: 1,
    borderColor: '#e31837',
    borderRadius: 50
    },

  innerChildrenCircle: {
    width:70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#e31837',
  },
  left:{
    flex: 1
  },
  body:{
    flex: 2,
    padding: 20
  },
  leftChildren:{
    maxWidth: 80,
    height: 100,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    alignContent: 'center',
    justifyContent: 'center'
  },
  bodyChildren:{
    height: 100,
    width: '75%',
    backgroundColor: '#f2f2f2',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  bodyText: {
    margin: 10,
    color: '#394449'
  },
  bodyText2: {
    margin: 10,
    color: '#828282'
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: 40,
    height: 40,
    justifyContent: 'center',
    top: 30
  }
});

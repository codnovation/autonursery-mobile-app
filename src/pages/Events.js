import React, { Component } from 'react';
import { View, StyleSheet, RefreshControl, AsyncStorage, Image, Dimensions } from 'react-native';
import { HeaderComponent } from "../Components/header";
import { Button, List, Body, Icon, CardItem, ListItem, Text, Left, Content, Card } from 'native-base';

import { Auth } from "../modules/Auth";


export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      events: [],
      isRefreshing: false,
      id: '',
      selectedEvent: {}
    }
  }

  static navigationOptions = {
    drawerIcon: () => (
      <Image source={require('./assets/photos/events.png')}
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

   let { url, id } = this.state;
   let { token } = this.state;
   // fetch(`http://162.241.234.129:3000/api/user/${id}/events`,
   fetch(`http://162.241.234.129:3000/api/events`,
     {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': `bearer ${token}`
     }
   }).then(result => result.json()).then(events =>{
     this.setState({events,
     isRefreshing: false});
     return events;
   }).catch(err => {
     return err;
   });
  }

  goToEvent = () => {
    let { selectedMessage } = this.state;
    this.props.navigation.navigate('Event', { _event: selectedEvent });
  }

  findEvent = async (id) => {
    let { token } = this.state;
    // await fetch(`http://162.241.234.129:3000/api/events/${id}`,
    await fetch(`http://162.241.234.129:3000/api/events/${id}`,
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(result => result.json()).then(selectedEvent=>{
      this.setState({selectedEvent,
      isRefreshing: false});
      return items;
    }).catch(err => {
      return err;
    });
    this.goToEvent();
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
    let { items, events } = this.state;
    let url = 'http://162.241.234.129:3000/';
    const { width } = Dimensions.get('window')
    return (
      <View style={{ marginBottom: 50}}>
        <HeaderComponent
        title="Events"
        {...this.props}
        />
      <List
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refreshList}
          />}
          style={{height: "100%"}}
          dataArray={events}
          renderRow={(item) => {
            return (
            <Content>
              <Card style={{flex: 0}}>
                  <CardItem>
                    <Left>
                      <Body key={item.name}
                        style={{width: "100%"}}>
                          <Text style={ styles.nameText }>
                            { item.name }
                          </Text>
                          <Text note>
                            { this.getDate(item.date) }
                          </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Image source={{uri: `${url}${item.image}`}}
                        style={{ height: 350, width: "100%", flex: 1}} />
                    <Text
                      style={ styles.descText }>
                      { item.description }
                    </Text>
                  </Body>
                </CardItem>
            </Card>
          </Content>
          )}
        }/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  nameText: {
    marginBottom: 10,
    color: '#394449'
  },
  descText: {
    height: 30,
    marginTop: 20,
    color: '#828282'
  }
})

import React, { Component } from 'react';
import { View, StyleSheet, RefreshControl, AsyncStorage, Image, Dimensions } from 'react-native';
import { HeaderComponent } from "../Components/header";
import { Container, Button, Content, List, Body, ListItem, Left, Right, Icon, Text } from 'native-base';
import { Auth } from "../modules/Auth";


export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      items: [],
      messages: [],
      isRefreshing: false,
      id: '',
      selectedMessage: {}
    }
  }

  static navigationOptions = {
    drawerIcon: () => (
      <Image source={require('./assets/photos/message.png')}
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
   fetch(`http://162.241.234.129:3000/api/user/${id}/messages`,
     {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': `bearer ${token}`
     }
   }).then(result => result.json()).then(items =>{
     let messages = items.messages.map((m, i) => {
       m['i'] = i;
       return m;
     });
     this.setState({items,
       messages,
     isRefreshing: false});
     return items;
   }).catch(err => {
     return err;
   });
  }

  goToMessage = () => {
    let { selectedMessage } = this.state;
    this.props.navigation.navigate('Message', { message: selectedMessage });
  }

  findMessage = async (id) => {
    let { token } = this.state;
    await fetch(`http://162.241.234.129:3000/api/messages/${id}`,
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(result => result.json()).then(selectedMessage=>{
      this.setState({selectedMessage,
      isRefreshing: false});
      return items;
    }).catch(err => {
      return err;
    });
    this.goToMessage();
  }

  componentDidMount () {
    this.getID();
    this.refreshList();
  }

  getDate(date){
    let today = new Date(date);
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    return dd+'/'+mm+'/'+yyyy;
  }

  render (){
    let { items, messages } = this.state;
    const { width } = Dimensions.get('window')
    return (
      <View style={{ marginTop: 0 }}>
        <HeaderComponent
        title="Messages"
        {...this.props}
        />
      <List
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refreshList}
          />}
          style={ styles.list }
          dataArray={messages}
          renderRow={(item) =>
            {
              return (
                <ListItem
                  onPress={(id) => { this.findMessage( item._id ) }}
                  style= { item.i % 2 == 0 ? styles.listItem2 : styles.listItem } >
                  <Body key={item.title}>
                    <Text note>{ this.getDate(item.date) }</Text>
                    <Text style={ styles.titleText }>{ item.title }</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward"
                      style={{color: '#e31837'}}
                      />
                  </Right>
                </ListItem>
              )
            }
          }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  listItem2: {
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2'
  },
  titleText: {
    marginBottom: 10,
    color: '#394449'
  }
})

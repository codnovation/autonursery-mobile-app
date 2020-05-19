import React, { Component } from 'react';
import { Image, StyleSheet, RefreshControl } from 'react-native';
import { HeaderComponent } from "../Components/header";
import { Container, List, Left, Body, Right, Button, Icon, ListItem, Segment, Content, CardItem, Text, Card, View  } from 'native-base';
import { Auth } from "../modules/Auth";

export default class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      url: 'http://162.241.234.129:3000/api/activities',
      // url: 'http://localhost:3000/api/activities',
      items: [{
        status: '',
        priority: '',
        title: '',
        description: '',
        date: '',
        reciever: '',
        child: '',
      }],
      status: 'pending',
      token:'',
      isRefreshing: false
    }
  }

  static navigationOptions = {
      header: null,
      drawerIcon: () => (
        <Image source={require('./assets/photos/acivities.png')}
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

   refreshList = async () => {
    this.setState({isRefreshing:true});
    await Auth.getToken().then(value => {
      this.setState({token: value});
    });

    let { url } = this.state;
    let { token } = this.state;
    fetch(url,
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(result => result.json()).then(items =>{
      this.setState({items,
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
    this.refreshList();
  }

  render (){
  let { items } = this.state;
    return (
      <View style={{ marginBottom: 50}}>
          <HeaderComponent
            title="Activities"
            {...this.props}
            />
          <List style={{marginLeft: 20, marginBottom: 50}}
            refreshControl={ <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refreshList}
                              />}
            dataArray={items}
            renderRow={(item) =>
              <ListItem style={styles.listItem}>
                    <Left style={styles.bigCard}>
                      <View style={styles.bigCardView}>
                        <Image source={require('./assets/photos/boy.png')}
                          style={styles.profileCircle}/>
                      </View>
                      <View style={styles.titleView}>
                        <Text tyle={styles.text}>{item.title}</Text>
                      </View>
                      <View style={styles.icon}>
                        <Image source={require('./assets/photos/acivities.png')}
                          style={styles.iconPhoto}/>
                      </View>
                    </Left>
                    <Body style={styles.bigCardBody}>
                      <View style={styles.dateView}>
                        <Text note style={{ textAlign: 'right' }}>{ this.getDate(item.date) }</Text>
                      </View>
                      <View style={styles.descView}>
                        <Text style={ styles.descViewText}>{ item.description }</Text>
                      </View>
                      <View style={styles.sttView}>
                        <Text style={ styles.smallCard}>{ item.name }</Text>
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
    borderRadius: 35,
    position: 'relative',
    top: -55,
    left: -5
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
    width: '90%',
    justifyContent: 'center',
    borderLeftWidth: 2 ,
    borderBottomWidth: 2,
    borderColor: '#ffffff',

  },
  descViewText:{
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    left: 10,
    width: '100%',
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
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: -35
  },
  text: {
    color: '#828282'
  }
});

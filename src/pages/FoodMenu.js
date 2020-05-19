import React, { Component } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { HeaderComponent } from "../Components/header";
import { Auth } from "../modules/Auth";
import { Card, Grid, Row, Text, Col } from 'native-base';

let images = [
  require('./assets/photos/FoodMenu/breakfast.png'),
  require('./assets/photos/FoodMenu/custommeal.png'),
  require('./assets/photos/FoodMenu/lunch.png'),
  require('./assets/photos/FoodMenu/snack.png'),
]

export default class FoodMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      items: [{
        food: [{}],
        day: ''
      }],
      selectedMenu: {
        food: [{}],
        day: ''
      }
    }
  }
  static navigationOptions = {
    drawerIcon: () => (
      <Image source={require('./assets/photos/menu.png')}
        style={{width:50, height: 50}} />
    )
  };
  fetchFoodMenu = async () => {

    await Auth.getToken().then(value => {
      this.setState({token: value});
    });
  }

  onDayPress = (day) => {
    this.setState({
      selected: day.dateString
    });
    let daySelected = (new Date (day.dateString)).toISOString();
    let { url, token} = this.state;
    // fetch(`http://162.241.234.129:3000/api/foodmenu/day/${daySelected}`,
    fetch(`http://162.241.234.129:3000/api/foodmenu/day/${daySelected}`,
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(result => result.json()).then(selectedMenu =>{
      this.setState({selectedMenu});
      return selectedMenu;
    }).catch(err => {
      return err;
    });

  }
  componentDidMount () {
    this.fetchFoodMenu();
  }

  render (){
    let { selectedMenu } = this.state;
    let foodArray;
    let foodType = ['Breakfast', 'Snack One', 'Lunch', 'Snack Two'];
    if (selectedMenu.food === undefined){
      foodArray= [
        {
          name: '',
          type: '',
          agesAllowed: '',
          ingredients: '',
        }
      ];
    } else {
      foodArray= selectedMenu.food;
    }
    return (
      <View style={{ height: "100%" }}>
        <HeaderComponent
        title="Food Menu"
        {...this.props}
        />
      <ScrollView style={{ height: "100%" }}>
          <View>
            <Calendar
              onDayPress={this.onDayPress}
              style={styles.calendar}
              hideExtraDays
              markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: '#e31837'}}}
            />
          </View>
          <View>
            <Card>
                {
                foodArray.map((f,i) => {
                    return (
                      <Grid>
                          <Row style= { i % 2 == 0 ? styles.listItem2 : styles.listItem }>
                            <Col style={{ width: '30%' }}>
                              <Image source={ images[i] }
                                style={ styles.image }/>
                            </Col>
                            <Col style={{ width: '70%' }}>
                              <Text style={ styles.foodTitle }>
                                { foodType[i] }
                              </Text>
                              <Text style={ styles.foodName }>
                                {f.name}
                              </Text>
                            </Col>
                          </Row>
                      </Grid>
                    );
                  })
                }
            </Card>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  listItem: {
    width: '100%',
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  listItem2: {
    width: '100%',
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2'
  },
  image: {
    width: 75,
    height: 50,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  foodTitle: {
    paddingHorizontal: 10,
    marginTop: 20,
    color: '#828282'
  },
  foodName: {
    paddingHorizontal: 10,
    color: '#394449'
  }
});

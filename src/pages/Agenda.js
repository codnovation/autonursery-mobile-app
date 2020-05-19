import React, { Component } from 'react';
import { HeaderComponent } from "../Components/header";
import {
  View, StyleSheet, Image, ViewPropTypes, Animated, Dimensions, AsyncStorage, ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { Card, Text, Grid, Col, Row, Picker, Icon } from 'native-base';
import { Auth } from "../modules/Auth";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Calendar } from 'react-native-calendars';

let faces = {
  "VeryHappy": require("./assets/photos/agenda/redVeryHappy.png"),
  "Happy": require("./assets/photos/agenda/orangeHappy.png"),
  "Normal": require("./assets/photos/agenda/greenNormal.png"),
  "Sad": require("./assets/photos/agenda/blueSad.png"),
}

let gray = {
  "VeryHappy": require("./assets/photos/agenda/greyVeryHappy.png"),
  "Happy": require("./assets/photos/agenda/greyHappy.png"),
  "Normal": require("./assets/photos/agenda/greyNormal.png"),
  "Sad": require("./assets/photos/agenda/greySad.png"),
}

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      items: {},
      id: '',
      token: '',
      children: [],
      childAgenda: {},
      attendanceStatus: {
        attended: false,
        day: undefined
      },
      child: undefined,
      day: undefined
    }
  }
  static navigationOptions = {
    drawerIcon: () => (
      <Image source={require('./assets/photos/agenda.png')}
        style={{width:50, height: 50}} />
    )
  };

  getID = async () => {
    await AsyncStorage.getItem('ID').then(value => {
      this.setState({id: value});
    });
  }

  getUser = async () => {
    await Auth.getToken().then(value => {
     this.setState({token: value});
    });
    let { url, id } = this.state;
    let { token } = this.state;
    fetch(`http://162.241.234.129:3000/api/user/${id}/children`,
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

  componentDidMount() {
    this.getID();
    this.getUser();
    this.getAgenda();
  }

  onValueChange = (value) => {
    this.getAgenda(this.state.day, value);
  }

  onDayChange = (day) => {
    day = (new Date (day.dateString)).toISOString();
    this.getAgenda(day, this.state.child);
  }

  getAgenda = (day, child) => {
    let { url, token } = this.state;
    if(!child && !day) {
      return;
    }
    else if(child && day) {
      fetch(`http://162.241.234.129:3000/api/agenda/${child._id}/${day}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
          }
        }).then(result => result.json()).then(childAgenda =>{
            this.setState({
              day: day,
              child: child,
              childAgenda: childAgenda.agenda[0],
              isRefreshing: false
            });
          return childAgenda;
        }).catch(err => {
          return err;
        });
      } else if(day) this.setState({ day });
      else if(child) this.setState({ child });
  }

  attendedOrNot = (agenda) => {
    if(agenda.attendance)
      return ('Yes');
    else
      return ('No - Absent');
  }

  render (){
    let { children, childAgenda } = this.state;
    let images = [
      require('./assets/photos/agenda/breakfast.png'),
      require('./assets/photos/agenda/lunch.png'),
      require('./assets/photos/agenda/custommeal.png'),
      require('./assets/photos/agenda/snack.png'),
      require('./assets/photos/agenda/naps.png'),
      require('./assets/photos/agenda/mood.png'),
      require('./assets/photos/agenda/attendance.png'),
    ]

    let types =['Breakfast', 'Snack One', 'Lunch',
    'Snack Two', 'Mood', 'Participation'];

    return (
      <View style={{ height: "100%" }}>
        <HeaderComponent
          title="Agenda"
          {...this.props}/>
        <ScrollView>
          <Calendar
            onDayPress={this.onDayChange}
            hideExtraDays
            style={styles.calendar}
            markedDates={{[this.state.day]: {day: true, disableTouchEvent: true, selectedDotColor: '#e31837'}}}
          />
        <View style={ styles.borderView }></View>
          <Grid style={ styles.selectGrid }>
            <Row>
              <Picker
              mode="dropdown"
              iosHeader="Select your Child"
              placeholder="Select your Child"
              style={ styles.select }
              iosIcon={<Icon name="arrow-dropdown-circle"
                style={{ color: "#e31837", fontSize: 25 }} />}
              selectedValue={this.state.child}
              onValueChange={this.onValueChange}
              >
              {
                children.map(child => {
                  let name = `${child.firstName} ${child.lastName}`;
                  return(
                    <Picker.item
                      label={ name }
                      value={ child }
                      />
                  );
                })
              }
              </Picker>
            </Row>
          </Grid>
          <Grid style={ styles.declarationGrid }>
              <Row style={ styles.row1 }>
                <Text style={{ color: '#394449' }}> Appetite </Text>
              </Row>
              <Row style={ styles.row2 }>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#828282' }}>Very Good</Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={faces['VeryHappy']} />
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#828282' }}>Good</Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={faces['Happy']} />
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#828282' }}>Normal</Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={faces['Normal']} />
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#828282' }}>Low</Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={faces['Sad']} />
                </Col>
              </Row>
          </Grid>
          <Grid style={ styles.appetiteGrid }>
            <Row style={{marginTop: 10}}>
              <Col style={{ width: '30%' }}>
                <Image style={{ width: 75, height: 50, marginLeft: 20 }} source={ images[0] } />
              </Col>
              <Col style={{ width: "70%", textAlign: 'right' }}>
                <Row>
                  <Text style={{ color: '#828282' }}>{ types[0] } </Text>
                </Row>
                <Row>
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.breakfast === 'Sad' ? faces['Sad'] : gray['Sad'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.breakfast === 'Normal' ? faces['Normal'] : gray['Normal'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.breakfast === 'Happy' ? faces['Happy'] : gray['Happy'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.breakfast === 'VeryHappy' ? faces['VeryHappy'] : gray['VeryHappy'] } />
                </Row>
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col style={{ width: '30%' }}>
                <Image style={{ width: 75, height: 50, marginLeft: 20 }} source={ images[1] } />
              </Col>
              <Col style={{ width: "70%", textAlign: 'right' }}>
                <Row>
                  <Text style={{ color: '#828282' }}>{ types[2] } </Text>
                </Row>
                <Row>
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.snackOne === 'Sad' ? faces['Sad'] : gray['Sad'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.snackOne === 'Normal' ? faces['Normal'] : gray['Normal'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.snackOne === 'Happy' ? faces['Happy'] : gray['Happy'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.snackOne === 'VeryHappy' ? faces['VeryHappy'] : gray['VeryHappy'] } />
                </Row>
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col style={{ width: '30%' }}>
                <Image style={{ width: 75, height: 50, marginLeft: 20 }} source={ images[2] } />
              </Col>
              <Col style={{ width: "70%", textAlign: 'right' }}>
                <Row>
                  <Text style={{ color: '#828282' }}>{ types[1] } </Text>
                </Row>
                <Row>
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.lunch === 'Sad' ? faces['Sad'] : gray['Sad'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.lunch === 'Normal' ? faces['Normal'] : gray['Normal'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.lunch === 'Happy' ? faces['Happy'] : gray['Happy'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.lunch === 'VeryHappy' ? faces['VeryHappy'] : gray['VeryHappy'] } />
                </Row>
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col style={{ width: '30%' }}>
                <Image style={{ width: 75, height: 50, marginLeft: 20 }} source={ images[3] } />
              </Col>
              <Col style={{ width: "70%", textAlign: 'right' }}>
                <Row>
                  <Text style={{ color: '#828282' }}>{ types[1] } </Text>
                </Row>
                <Row>
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.snackTwo === 'Sad' ? faces['Sad'] : gray['Sad'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.snackTwo === 'Normal' ? faces['Normal'] : gray['Normal'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.snackTwo === 'Happy' ? faces['Happy'] : gray['Happy'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.snackTwo === 'VeryHappy' ? faces['VeryHappy'] : gray['VeryHappy'] } />
                </Row>
              </Col>
            </Row>
          </Grid>
          <Grid style={ styles.declarationGrid2 }>
              <Row style={ styles.row1 }>
                <Text style={{ color:'#394449' }}> Mood & Participation </Text>
              </Row>
              <Row style={ styles.row2 }>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#828282' }}>Very Happy</Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={faces['VeryHappy']} />
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#828282' }}>Happy</Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={faces['Happy']} />
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#828282' }}>Normal</Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={faces['Normal']} />
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#828282' }}>Sad</Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={faces['Sad']} />
                </Col>
              </Row>
          </Grid>
          <Grid style={ styles.othersGrid }>
            <Row style={{marginTop: 10}}>
              <Col style={{ width: '30%' }}>
                <Image style={{ width: 50, height: 50, marginLeft: 20 }} source={ images[5] } />
              </Col>
              <Col style={{ width: "70%", textAlign: 'right' }}>
                <Row>
                  <Text style={{ color: '#828282' }}>{ types[4] } </Text>
                </Row>
                <Row>
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.mood === 'Sad' ? faces['Sad'] : gray['Sad'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.mood === 'Normal' ? faces['Normal'] : gray['Normal'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.mood === 'Happy' ? faces['Happy'] : gray['Happy'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.mood === 'VeryHappy' ? faces['VeryHappy'] : gray['VeryHappy'] } />
                </Row>
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col style={{ width: '30%' }}>
              </Col>
              <Col style={{ width: "70%", textAlign: 'right' }}>
                <Row>
                  <Text style={{ color: '#828282' }}>{ types[5] } </Text>
                </Row>
                <Row>
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.participation === 'Sad' ? faces['Sad'] : gray['Sad'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.participation === 'Normal' ? faces['Normal'] : gray['Normal'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.participation === 'Happy' ? faces['Happy'] : gray['Happy'] } />
                  <Image style={{ width: 50, height: 50 }} source={childAgenda.participation === 'VeryHappy' ? faces['VeryHappy'] : gray['VeryHappy'] } />
                </Row>
              </Col>
            </Row>
          </Grid>
          <Grid style={ styles.restGrid }>
            <Row style={{marginTop: 10, paddingBottom: 20}}>
              <Col style={{ width: '30%' }}>
                <Image style={{ width: 75, height: 50, marginLeft: 20 }} source={ images[4] } />
              </Col>
              <Col style={{ width: "70%", textAlign: 'left' }}>
                <Text style={{ color: '#828282' }}>
                  Nap
                </Text>
                <Text>
                  {childAgenda.nap}
                </Text>
              </Col>
            </Row>
            <Row style={{marginTop: 10, paddingBottom: 20, backgroundColor:'#fff'}}>
              <Col style={{ width: '30%' }}>
                <Image style={{ width: 75, height: 75, marginLeft: 20 }} source={ images[6] } />
              </Col>
              <Col style={{ width: "70%", textAlign: 'right', marginTop: 10 }}>
                <Text style={{ color: '#828282' }}>
                  Attended
                </Text>
                <Text>
                  { this.attendedOrNot(childAgenda)}
                </Text>
              </Col>
            </Row>
            <Row style={{marginTop: 10, paddingBottom: 20}}>
              <Col style={{ width: '30%' }}>
              </Col>
              <Col style={{ width: "70%", textAlign: 'left' }}>
                <Text style={{ color: '#828282' }}>
                  WC
                </Text>
                <Text>
                  {childAgenda.wc}
                </Text>
              </Col>
            </Row>
          </Grid>
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
  declarationGrid: {
     alignItems: 'center',
     backgroundColor: '#fff'
  },
  declarationGrid2: {
     alignItems: 'center',
     backgroundColor: '#f2f2f2'
  },
  selectGrid: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 0,
    marginBottom: 20
  },
  appetiteGrid: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20
  },
  othersGrid: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20
  },
  restGrid: {
    width: '100%',
    backgroundColor: '#f2f2f2'
  },
  select: {
    marginTop: 0,
  },
  row1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  row2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    marginBottom: 20,
  },
  borderView: {
    borderBottomWidth: 2,
      borderBottomColor: '#e31837'
  }
});

// ES6: style={Object.assign({}, style1, style2)} to combine

//get child
//get day
// onday Press add agenda and attendance to each child on the array based on day pressed
// children should be accordion

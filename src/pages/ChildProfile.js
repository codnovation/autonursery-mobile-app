import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { HeaderComponent } from "../Components/header";
import {
  List, ListItem, Left, Body ,Grid, Row, Col, Text
} from 'native-base';
import moment from 'moment';

export default class ChildProfile extends React.Component {
  constructor(props){
    super(props);
  }
  getAge = (a) => {
    console.log(a);
    let today = moment();

    let years = today.diff(a, 'year');
    a.add(years, 'years');

    let months = today.diff(a, 'months');
    a.add(months, 'months');

    let days = today.diff(a, 'days');
    console.log(years + ' Years - ' + months + ' Months - ' + days + ' Days');
      return (years + ' Years - ' + months + ' Months - ' + days + ' Days');
  }
  render () {
    let { child } = this.props.navigation.state.params;
    return (
      <View>
        <HeaderComponent
        title="Child Profile"
        {...this.props}
        />
      <ScrollView style={{ height: "100%" }}>
          <List>
            <ListItem style={styles.listItem}>
              <Left style={styles.bigCard}>
                <View style={styles.icon}>
                  <Image source={require('./assets/photos/boy.png')}
                    style={styles.iconPhoto}/>
                </View>
              </Left>
              <Body style={styles.bigCardBody}>
                <View style={styles.descView}>
                  <Text style={styles.descViewText}>
                    { child.firstName } { child.lastName }
                  </Text>
                </View>
                <Grid style={styles.sttView}>
                  <Row style={{height: "100%"}}>
                    <Col>
                      <Text style={styles.smallCard}>
                        { child.class }
                      </Text>
                    </Col>
                    <Col>
                      <Text style={styles.smallCard}>
                        {child.location}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              </Body>
            </ListItem>
            <ListItem style={ styles.greyItem }>
              <Text style={{ color: '#394449' }}>
                Date of Birth:
              </Text>
              <Text style={{ color: '#828282', marginLeft: 5 }}>
                { child.dateOfBirth }
              </Text>
            </ListItem>
            <ListItem style={ styles.whiteItem }>
              <Text style={{ color: '#394449' }}>
                Age:
              </Text>
              <Text style={{ color: '#828282', marginLeft: 5 }}>
                {this.getAge(moment.utc(child.dateOfBirth).local())}
              </Text>
            </ListItem>
            <ListItem style={ styles.greyItem }>
              <Text style={{ color: '#394449' }}>
                Gender:
              </Text>
              <Text style={{ color: '#828282', marginLeft: 5 }}>
                { child.gender }
              </Text>
            </ListItem>
            <ListItem style={ styles.whiteItem }>
              <Text style={{ color: '#394449' }}>
                Blood Type:
              </Text>
              <Text style={{ color: '#828282', marginLeft: 5 }}>
                { child.bloodType }
              </Text>
            </ListItem>
            <ListItem style={ styles.greyItem }>
              <Text style={{ color: '#394449' }}>
                Medical Conditions:
              </Text>
              <Text style={{ color: '#828282', marginLeft: 5 }}>
                { child.medicalConditions }
              </Text>
            </ListItem>
            <ListItem style={ styles.whiteItem }>
              <Text style={{ color: '#394449' }}>Allergies: </Text>
                {
                  child.allergies.map (allergy => {
                    return(
                      <Text style={{ color: '#828282', marginLeft: 5 }}>
                        {allergy}
                      </Text>
                    );
                  })
                }
            </ListItem>
          </List>
      </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 150,
    marginTop: 20
  },
  greyItem: {
    backgroundColor: '#f2f2f2',
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  whiteItem: {
    backgroundColor: '#fff',
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 20,
    paddingHorizontal: 10,
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
    alignItems: 'stretch',
    borderLeftWidth: 2,
    borderColor: '#ffffff',
  },
  smallCard: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    backgroundColor: '#f2f2f2',
    height: "100%"
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
    paddingLeft: 10
  },
  sttView: {
    backgroundColor: '#f2f2f2',
    borderLeftWidth: 2 ,
    borderColor: '#ffffff',
    position: 'relative',
  },
  iconPhoto: {
    marginLeft: -10,
    width: 100,
    height: 100
  }
});

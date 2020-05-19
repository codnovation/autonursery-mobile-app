import React, { Component } from 'react';
import { HeaderComponent } from "../Components/header";
import { View, Image, RefreshControl, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import { Container, List, Row, Grid, Right, Button, Icon, ListItem, Text, Content, Thumbnail } from 'native-base';

export default class Regulations extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerIcon: () => (
      <Image source={require('./assets/photos/regulations.png')}
        style={{width:50, height: 50}} />
    )
  };
  render (){
    return (
      <View style={{height: "100%"}}>
        <HeaderComponent
        title="Regulations"
        {...this.props}
        />
        <ScrollView>
          <List style={{ height: "100%", paddingTop: 10 }}>
            <ListItem itemDivider
              style={{ backgroundColor: '#f2f2f2'}}>
              <Text style={{ color: '#e31837' }}>Nursery Regulations</Text>
            </ListItem>
            <ListItem>
              <Grid>
                <Row style={{width: "100%"}}>
                  <Text style={{ color: '#394449' }}>
                    1. It is prohibited for any child to bring any sharp objects, dangerous games, money or wear jewelry to the nursery
                  </Text>
                </Row>
                <Row style={{width: "100%"}}>
                  <Text style={{ color: '#394449' }}>
                    2. Items not to be packed in child’s bag: all types of medication, small candies
                  </Text>
                </Row>
                <Row style={{width: "100%"}}>
                  <Text style={{ color: '#394449' }}>
                    3. Parents should provide their children with: Diapers, A change of clothes, 1 pair of pants or 1 skirt, 2 pairs of socks, 2 t-shirts (long sleeves in winter), a hairbrush, diaper cream (if necessary)
                  </Text>
                </Row>
                <Row style={{width: "100%"}}>
                  <Text style={{ color: '#394449' }}>
                    4. All children’s items are to be labeled with the child’s full name
                  </Text>
                </Row>
                <Row style={{width: "100%"}}>
                  <Text style={{ color: '#394449' }}>
                    5. Children who experience any of the following are asked to remain home: childhood diseases (chicken pox, measles), Fever (over 38o C), phlegmy or chronic cough, strong cold, severe diarrhea, conjunctivitis (pink eye)
                  </Text>
                </Row>
                <Row style={{width: "100%"}}>
                  <Text style={{ color: '#394449' }}>
                    6. If a doctor deems that your child is well enough to return to the nursery a medical report is required which contains: the illness, the time at which medication is to be given, dosage, if medication requires refrigeration
                  </Text>
                </Row>
              </Grid>
            </ListItem>
            <ListItem itemDivider
              style={{ backgroundColor: '#f2f2f2'}}>
              <Text style={{ color: '#e31837' }}>App Regulations</Text>
            </ListItem>
            <ListItem>
              <Grid>
              <Row style={{width: "100%"}}>
                <Text style={{ color: '#394449' }}>
                  1. The KEY Nursery application is catered to provide a detailed overview of your child’s day
                </Text>
              </Row>
              <Row style={{width: "100%"}}>
                <Text style={{ color: '#394449' }}>
                  2. A child who is no longer enrolled at the nursery will have his/her account de-activated
                </Text>
              </Row>
              <Row style={{width: "100%"}}>
                <Text style={{ color: '#394449' }}>
                  3. Any inquiries or complaints are to be reported directly to the nursery’s administration or sent via email to: info@keynursery.com
                </Text>
              </Row>
              <Row style={{width: "100%"}}>
                <Text style={{ color: '#394449' }}>
                  4. All information is considered confidential and is shared solely with the child’s parents
                </Text>
              </Row>
              </Grid>
            </ListItem>
          </List>
        </ScrollView>
      </View>
    )
  }

}

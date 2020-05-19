import React from "react";
import { AppRegistry, Image, StatusBar, View, StyleSheet } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
// const routes = {
//   url: [ "Login", "Home", "Agenda", "Albums", "Attendance",
//  "Events", "Feeds", "FoodMenu", "Messages", "Profile", "Regulations", "Requests", "./photos/Login.png", "./photos/Home.png", "./photos/Agenda.png", "./photos/Albums.png", "./photos/Attendance.png",
// "./photos/Events.png", "./photos/Feeds.png", "./photos/FoodMenu.png", "./photos/Messages.png", "./photos/Profile.png", "./photos/Regulations.png", "./photos/Requests.png"
// ]
// };
const routes =  [ "Login", "Home", "Agenda", "Albums", "Activities",
  "FoodMenu", "Messages", "Profile", "Regulations", "Requests"];

export default class SideBar extends React.Component {
  render() {
    return (
      <Container style={styles.bigView}>
        <Content>
          <View style={styles.logoView}>
            <Image source={require('./photos/logo.png')} style={styles.logo}/>
          </View>
          <List
            dataArray={routes}
            style={styles.list}
            renderRow={data => {
              return (
                <ListItem
                  style={styles.listItem}
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
              //});
            }}

          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  logoView: {
    top: 30,
    alignItems: 'center',
  },
  logo:{
    width: 100,
    height: 120
  },
  list: {
    top: 30
  },
  listItem: {
    borderBottomWidth: 0.75,
    borderColor: '#e31837',
  }
});

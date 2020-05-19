import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { AppRegistry, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

export class HeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.head} {...this.props}>
          <Left>
              <Icon name="menu"
                onPress={() => this.props.navigation.openDrawer()}
                style={{paddingLeft: 10, color: '#e31837'}}
              />
          </Left>
          <Body>
            <Title style={styles.title}>{this.props.title}</Title>
          </Body>
          <Right>
            {this.props.right}
          </Right>
        </Header>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  head: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white'
  },
  container: {
    maxHeight: 80
  },
  title: {
    color: '#e31837'
  }
});

import React from 'react'
import PropTypes from 'prop-types'
import { HeaderComponent } from "../Components/header";
import { Button, View, Image } from 'react-native';
import {
  Body ,Grid, Row, Col, Text, Card, CardItem
} from 'native-base';

export default class Event extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log('Hello Message');
  }

  componentWillUnmount() {
    console.log("Good Bye");
  }

  goBack = () => {
    return (
      <Button
        title='Events'
        onPress={() => this.props.navigation.navigate('Events')}/>
    );
  }
  render () {
    let { event } = this.props.navigation.state.params;
    return(
      <View>
        <HeaderComponent
        title={ event.title }
        {...this.props}
        />
        <Card>
          <CardItem header bordered>
              <Text>{ event.title }</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
              <Text>{ event.description }</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  }
}

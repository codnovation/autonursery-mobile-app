import React from 'react'
import PropTypes from 'prop-types'
import { HeaderComponent } from "../Components/header";
import { Button, View, Image } from 'react-native';
import {
  Body ,Grid, Row, Col, Text, Card, CardItem
} from 'native-base';

export default class Message extends React.Component {
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
        title='Messages'
        onPress={() => this.props.navigation.navigate('Messages')}/>
    );
  }
  render () {
    let { message } = this.props.navigation.state.params;
    return(
      <View>
        <HeaderComponent
        title={ message.title }
        {...this.props}
        />
        <Card>
          <CardItem header bordered>
              <Text style= {{ color: '#394449' }}>{ message.title }</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
                <Text style= {{ color: '#828282' }}>{ message.description }</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  }
}

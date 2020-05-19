import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import {Calendar} from 'react-native-calendars';

export class CalendarComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.onDayPress = this.onDayPress.bind(this);
    }
    render () {
      return (
        <View>
          <Calendar
            {...this.props}
            onDayPress={this.props.onDayPress}
            style={styles.calendar}
            hideExtraDays
            markedDates={{[this.props.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: '#e31837'}}}
          />
        </View>
    );
    }


  onDayPress = (day) => {
    this.setState({
      selected: day.dateString
    });
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
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  }
});

import React, { Component } from 'react';
import { View, StyleSheet, Text, Navigator, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator } from 'react-navigation';
import { HeaderComponent } from "../Components/header";
import { Container, Content, Form, Button, Item, Input} from 'native-base';
import GenerateForm from 'react-native-form-builder';
import Home from "./Home";
import { Auth } from '../modules/Auth';


export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      // url: 'http://162.241.234.129:3000/auth/login',
      url: 'http://162.241.234.129:3000/auth/login',
      errors: {},
      successMessage: '',
      username: undefined,
      password: undefined,
      values: {
        email: '',
        password: ''
      }
    };
  }

  static navigationOptions = {
      header: null,
  };

   login = () => {
      let { url } = this.state;
      let { username, password } = this.state;
      let user = {
       email: username,
       password: password
     };
      // let user = {
      //  email: "fadi.nasr@ampersadneducation.com",
      //  password: "Dina"
      // }
      fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(result => result.json()).then(result =>{
        console.log(this.props.navigation);
            Auth.authenticateUser(result.token, result.user.id);
            this.setState({
              errors: {}
            });
            this.props.navigation.navigate('Feeds');
        }).catch(err => {
          this.setState({
            err
          });
          return err;
        });
  }
  render() {
    let {isAuthenticated, username, password} = this.state;
    console.log(username,password);
    return (
          <KeyboardAwareScrollView
            style={styles.container}
            >
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('./assets/photos/menuIcon.png')}
                  style={{height: 300, width: 300}}
                />
              </View>
              <View style={styles.form}>
                <TextInput
                  placeholder="Username"
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}
                  autoCapitalize={false}
                  keyboardType={"email-address"}
                  autoCorrect={false}
                  style={ styles.input }
                />
                <TextInput
                  placeholder="Password"
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                  secureTextEntry={true}
                  autoCapitalize={false}
                  autoCorrect={false}
                  style={ styles.input }
                />
              </View>
              <View style={{justifyContent: 'center', top: 20, alignSelf: 'center', width: 250}}>
                <Button
                  block danger
                  style={{ backgroundColor: '#e31837', maxWidth: 250, height: 65, justifyContent: 'center' }}
                  title='Login' block
                  onPress={() => this.login()}>
                    <Text style={{ color: '#fff', top: 0 }}>
                      Login
                    </Text>
                </Button>
              </View>
            </KeyboardAwareScrollView>
      );
    }
  }
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 10,
    height: 50,
    color: "#000",
    padding: 10
  },
  form: {
    margin: 30,
    padding: 10,
    height: 120,
  },
  container: {
    top: 50,
    height: '100%'
  }
});

import { AsyncStorage } from "react-native"
export class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token, userID) {
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('ID', userID)
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    console.log('isUserAuthenticated', AsyncStorage.getItem('token'));
    return AsyncStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    AsyncStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return AsyncStorage.getItem('token').then((value) => {
     if(value) {
      return value;
    }
   });

  }

}

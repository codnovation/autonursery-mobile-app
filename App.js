import React, {Component} from 'react';
import {Button, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Image} from 'react-native';
import Home from './src/pages/Home';
import AgendaScreen from './src/pages/Agenda';
import Albums from './src/pages/Albums';
import FoodMenu from './src/pages/FoodMenu';
import Messages from './src/pages/Messages';
import Message from './src/pages/Message';
import Events from './src/pages/Events';
import Event from './src/pages/Event';
import Profile from './src/pages/Profile';
import Regulations from './src/pages/Regulations';
import Requests from './src/pages/Requests';
import Login from "./src/pages/login";
import Activities from "./src/pages/Activities";
import ChildProfile from "./src/pages/ChildProfile";
import SideBar from "./src/Components/SideBar/SideBar.js";
import {
    createDrawerNavigator, DrawerNavigator, DrawerItems, createSwitchNavigator, createStackNavigator, createAppContainer
} from "react-navigation";
import {HeaderComponent} from "./src/Components/header";

// import firebase from 'react-native-firebase';

//Get Screen Size
const {width} = Dimensions.get('window')

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{flex: 1}}>
        <View style={{height: 150, alignItems: 'center'}}>
            <Image
                source={require('./src/pages/assets/photos/menuIcon.png')}
                style={{height: 150, width: 150}}
            />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)

const AuthStackNavigator = createStackNavigator({
    Login: {screen: Login}
})

const HomeScreenRouter = createDrawerNavigator(
    {
        Feeds: {screen: Home},
        Agenda: {screen: AgendaScreen},
        Requests: {screen: Requests},
        Messages: {screen: Messages},
        Message: {
            screen: Message,
            navigationOptions: {
                drawerLabel: () => null,
            }
        },
        Albums: {screen: Albums},
        Activities: {screen: Activities},
        'Food Menu': {screen: FoodMenu},
        Events: {screen: Events},
        'Event': {
            screen: 'Event',
            navigationOptions: {
                drawerLabel: () => null,
            }
        },
        Profile: {screen: Profile},
        ChildProfile: {
            screen: ChildProfile,
            navigationOptions: {
                drawerLabel: () => null,
            }
        },
        Regulations: {screen: Regulations},
    },
    {
        //contentComponent: props => <SideBar {...props} />
        contentComponent: CustomDrawerComponent,
        contentOptions: {
            activeTintColor: '#e31837',
            itemStyle: {
                borderBottomWidth: 0.55,
                borderColor: '#e31837',
            }
        }
        //drawerWidth: width //Put Drawer to full screen
    });

const ProfileStackNavigator = createStackNavigator({
        Profile: {screen: Profile},
        ChildProfile: {screen: (props) => <ChildProfile {...props} />}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

const MessagesStackNavigator = createStackNavigator({
        Messages: {screen: Messages},
        Message: {screen: (props) => <Message {...props} />}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

const EventsStackNavigator = createStackNavigator({
        Events: {screen: Events},
        'Event': {screen: (props) => <Event {...props} />}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

const AppNavigator = createSwitchNavigator({
    Auth: AuthStackNavigator,
    App: HomeScreenRouter,
    Profile: ProfileStackNavigator,
    Message: MessagesStackNavigator,
    'Event': EventsStackNavigator,
});

const App = createAppContainer(AppNavigator);

export default App;


// export default class App extends Component {

// componentDidMount() {
//   SplashScreen.hide();
// }

// componentWillMount() {
//   OneSignal.init("76f5d387-65a6-4a11-bad9-18c7f4ae06f7");
// }
// componentWillMount() {
//   OneSignal.init("76f5d387-65a6-4a11-bad9-18c7f4ae06f7", {kOSSettingsKeyAutoPrompt : true});
//   OneSignal.addEventListener('received', this.onReceived);
//   OneSignal.addEventListener('opened', this.onOpened);
//   OneSignal.addEventListener('ids', this.onIds);
// }
// componentWillUnmount() {
//      OneSignal.removeEventListener('received', this.onReceived);
//      OneSignal.removeEventListener('opened', this.onOpened);
//      OneSignal.removeEventListener('ids', this.onIds);
//  }
//
//  onReceived(notification) {
//      console.log("Notification received: ", notification);
//  }
//
//  onOpened(openResult) {
//    console.log('Message: ', openResult.notification.payload.body);
//    console.log('Data: ', openResult.notification.payload.additionalData);
//    console.log('isActive: ', openResult.notification.isAppInFocus);
//    console.log('openResult: ', openResult);
//  }
//
//  onIds(device) {
//  console.log('Device info: ', device);
//  }
//
//   render() {
//     return (
//         <AppNavigator { ...this.props }/>
//     );
//   }
// }

// import SideBar from "./src/pages/sidebar";

// export default createDrawerNavigator({
//   Login: Login,
//   Home: Home,
//   Agenda: Agenda,
//   Albums: Albums,
//   Attendance: Attendance,
//   Events: Events,
//   Feeds: Feeds,
//   FoodMenu: FoodMenu,
//   Messages: Messages,
//   Profile: Profile,
//   Regulations: Regulations,
//   Requests: Requests,
// });
//
// const CustomDrawerComponent = (props) => {
//   <SafeAreaView style={{flex: 1}}>
//     <ScrollView>
//       <DrawerItems {...props}/>
//     </ScrollView>
//   </SafeAreaView>
// }
//

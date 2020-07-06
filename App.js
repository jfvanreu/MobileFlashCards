import 'react-native-gesture-handler'
import * as React from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import DeckList from './components/DeckList'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import Constants from "expo-constants"
import middleware from './middleware'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import AddDeck from './components/AddDeck'
import DeckDetails from './components/DeckDetails'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'
import { setLocalNotification } from './utils/helpers'


//create custom statusbar
function FlashCardStatusBar ({ backgroundColor, ...props }) {
    return (
            <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </View>)
}

const RouteConfigs = {
  DeckList:{
    name: "DeckList",
    component: DeckList,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'Deck List'}
  },
  AddDeck:{
    component: AddDeck,
    name: "AddDeck",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck'}
  },

}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 100,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tab = createBottomTabNavigator()
      
// create Home stateless component which includes our Tab with 2 sub-components
function Home() {
return (
        <Tab.Navigator {...TabNavigatorConfig}>
        <Tab.Screen {...RouteConfigs['DeckList']} />
        <Tab.Screen {...RouteConfigs['AddDeck']} />
    </Tab.Navigator>
)
}
      
//create Stack navigator
const Stack = createStackNavigator()
            
export default class App extends React.Component {
  
    componentDidMount() {
        setLocalNotification()
    }
        
    render() {
      return (
        <Provider store={createStore(reducer, middleware)}>
          <View style={{ flex: 1}}>
              <FlashCardStatusBar backgroundColor={purple} barStyle='light-content' />
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Detail" component={DeckDetails} options={{ title: 'Details' }}/>
                  <Stack.Screen name="AddCard" component={AddCard} options={{ title: 'Add Card' }}/>
                  <Stack.Screen name="QuizView" component={QuizView} options={{ title: 'Quiz View' }}/>
                </Stack.Navigator>
              </NavigationContainer>
          </View>
        </Provider>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

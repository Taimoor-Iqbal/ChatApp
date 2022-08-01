import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ChatScreen from './src/screens/ChatScreen';
import AccountScreen from './src/screens/AccountScreen';



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#03493f',
  },
};


const Stack = createStackNavigator();



const Navigation = () => {
  const [user, setuser] = useState('')
  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {

        firestore().collection('users')
          .doc(userExist.uid)
          .update({
            status: "online"
          })
        setuser(userExist)


      }

      else setuser("")
    })

    return () => {
      unregister()
    }

  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "#03493f"
        }}

      >
        {user ?
          <>

            <Stack.Screen name="home" options={{
              title: "Messeges",
              headerTitleAlign: 'center'

            }}>
              {props => <HomeScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="chat" options={({ route }) => ({ title: <View><Text>{route.params.name}</Text><Text>{route.params.status}</Text></View> })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="account" options={{
              title: "Profile",
              headerTitleAlign: 'center'

            }}>
              {props => <AccountScreen {...props} user={user} />}
            </Stack.Screen>


          </>
          :
          <>

            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        }

      </Stack.Navigator>
    </NavigationContainer>
  )


}

const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle='light-content' backgroundColor='#03493f' />
        <View style={styles.container}>
          <Navigation />
        </View>
      </PaperProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
})
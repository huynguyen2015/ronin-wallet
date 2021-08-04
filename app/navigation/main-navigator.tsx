/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const BottomTabs = createBottomTabNavigator();

import { PrimaryParamList } from "./"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { DemoScreen } from "../screens"
import { DetailScreen } from "../screens/detail/detail-screen"
import { SendAssetsScreen } from "../screens/sendAssets/send-assets-screen"
import { HomeScreen } from "../screens/home/home-screen"
import { TabBar } from "../components/layout/TabBar"

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

const TabsScreen = () => (
  <BottomTabs.Navigator
    tabBar={(props) => <TabBar {...props} />}>
    <BottomTabs.Screen name="home" component={HomeScreen} />
    <BottomTabs.Screen name="comments" component={SendAssetsScreen} />
    <BottomTabs.Screen name="clipboard-list" component={DetailScreen} />
    <BottomTabs.Screen name="user" component={DemoScreen} />
  </BottomTabs.Navigator>
);


export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="tabScreen"
        component={TabsScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='sendAssets' component={SendAssetsScreen} />
      <Stack.Screen name='detail' component={DetailScreen} />
      <Stack.Screen name='demo' component={DemoScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['home']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)

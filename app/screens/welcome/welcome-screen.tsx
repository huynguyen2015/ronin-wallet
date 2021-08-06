import React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { Screens } from "../../navigation"
import {loadString} from "../../utils/storage/storage"
import {appStorageKey} from "../../utils/appConst"

const bowserLogo = require("./bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D", marginBottom: 64 }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center"
}
const FOOTER_CONTENT_ITEM: ViewStyle = {
  display: "flex",
  width: '50%',
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
}

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = (route, stack?) => {
    navigation.navigate(stack || 'mainStack', {
      screen: route
    })
  }

  loadString(appStorageKey.ACCESS_TOKEN).then(accessToken => {
    if (accessToken) {
      /// TODO init app
      nextScreen(Screens.home)
    } else {
      nextScreen(Screens.login, 'authStack')
    }
  })



  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper/>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE}/>
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Your new app, "/>
          <Text style={ALMOST} text="almost"/>
          <Text style={TITLE} text="!"/>
        </Text>
        <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch"/>
        <Image source={bowserLogo} style={BOWSER}/>
        <Text style={CONTENT}>
          This probably isn't what your app is going to look like. Unless your designer handed you
          this screen and, in that case, congrats! You're ready to ship.
        </Text>
        <Text style={CONTENT}>
          For everyone else, this is where you'll see a live preview of your fully functioning app
          using Ignite.
        </Text>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <View style={FOOTER_CONTENT_ITEM}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.login"
              onPress={() => nextScreen(Screens.login, 'authStack')}
            />
          </View>
          <View style={FOOTER_CONTENT_ITEM}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.home"
              onPress={() => nextScreen(Screens.home)}
            /></View>
          <View style={FOOTER_CONTENT_ITEM}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.listing"
              onPress={() => nextScreen(Screens.sendAssets)}
            /></View>
          <View style={FOOTER_CONTENT_ITEM}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.detail"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
})

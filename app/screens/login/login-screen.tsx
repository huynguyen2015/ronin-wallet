import React, { useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Text, PasswordField, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import authService from '../../services/api/authService'
const logoRonin = require("./logo-ronin.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const BUTTON_WRAPPER: ViewStyle = {alignItems: 'center', flex: 1}
const DEMO: ViewStyle = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: color.primary,
  borderRadius: 8,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 2,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 32,
  lineHeight: 40,
  textAlign: "center",
  marginBottom: spacing[5],
  fontStyle: 'normal',
  color: color.textDark
}
const TAGLINE: TextStyle = {
  color: color.textDark,
  fontSize: 14,
  lineHeight: 20,
  marginBottom: spacing[4] + spacing[1],
  textAlign: "center",
  fontWeight: 'normal'
}
const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  width: 114,
  height: 160,
  alignSelf: "center",
}
const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}

const LOGIN_FORM: ViewStyle = {
  marginTop: 24,
  marginBottom: 24
}

export const LoginScreen = observer(function LoginScreen() {
  const navigation = useNavigation()
  const nextScreen = (stack, screen) => navigation.navigate(stack, {screen})
  const [loginData, setLoginData] = useState({
    email: 'mary_qroauyp_test@tfbnw.net',
    password: 'aaaaaa'
  } as any);

  const handleLogin = React.useMemo(
    () => async () => {
      if (!loginData || !loginData.email) {
        // throw error
        return
      }
      if (!loginData.password) {
        // throw error
        return
      }

      const data = await authService.login(loginData)
      if (data) {
        nextScreen('mainStack', 'home')
      }
    },
    [],
  )

  const changeLoginData = (key, value) => {
    loginData[key] = value
    setLoginData(loginData)
  }

  return (
    <View testID="LoginScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Image source={logoRonin} style={IGNITE} />
        <Text style={TITLE} preset="header" tx="loginScreen.title" />
        <Text style={TAGLINE} preset="header" tx="loginScreen.tagLine" />
        <View style={LOGIN_FORM}>
          <PasswordField
            onChangeText={(value) => changeLoginData('password', value)}
            value={loginData.password}
            labelTx="loginScreen.password"/>
        </View>
        <View style={BUTTON_WRAPPER}>
          <Button
            style={DEMO}
            textStyle={DEMO_TEXT}
            tx="loginScreen.btnLogin"
            onPress={handleLogin}
          />
          <Text style={HINT} tx={`loginScreen.btnLoginHint`} />
        </View>
      </Screen>
    </View>
  )
})

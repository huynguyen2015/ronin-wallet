import React, { useEffect, useState } from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Text, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import userService from "../../services/api/userService"
import WebView from "react-native-webview"
const heart = require("./heart.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const PRODUCT_FRAME: ImageStyle = {
  width: '100%',
  height: 300,
  marginVertical: spacing[6],
  alignSelf: "center",
  backgroundColor: 'transparent'

}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}
const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}

export const DetailScreen = observer(function DetailScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { productId } = route.params || {} as any;
  const goBack = () => navigation.goBack()
  const [product, setProduct] = useState({} as any)

  useEffect(() => {
    userService.getUser({uniqueName: productId}).then(res => {
      setProduct(res)
    })
  }, []);
  throw new Error('test error')
  return (
    <View testID="DetailScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <WebView style={PRODUCT_FRAME}
          originWhitelist={['*']}
          source={{ html: "<iFrame src='" + product.gameUrl +"' style='width: 100%; height: 100%; border: 0' />" }} />

        <View style={LOVE_WRAPPER}>
          <Text style={LOVE} text="Made with" />
          <Image source={heart} style={HEART} />
          <Text style={LOVE} text="by Infinite Red" />
        </View>

        <Text style={TITLE} preset="header" text={product.name} />
        <Text style={TAGLINE} text={product.description}/>
        <Text style={TAGLINE} text={product.description}/>
        <Text style={TAGLINE} text={product.description}/>
        <View>
          <Button
            style={DEMO}
            textStyle={DEMO_TEXT}
            tx="demoScreen.reactotron"
            onPress={() => {}}
          />
          <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint`} />
        </View>
      </Screen>
    </View>
  )
})

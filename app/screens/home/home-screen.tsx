import React, { useEffect } from "react"
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Text, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { Screens } from "../../navigation"
import {AssetItem} from '../../components/itemApps/AssetItem'
import {exchangeToVND} from '../../utils/helper'
import { useStores } from "../../models"
import { values } from 'mobx'

const logoRoninWhite = require("../../../assets/logo-ronin-white.png")
const IC_PERSON = require("../../../assets/icons/ic-person-fill.png")
const IC_DOT = require("../../../assets/icons/ic-dot.png")
const IC_COPY = require("../../../assets/icons/ic-copy.png")
const IC_CREDIT_CARD = require("../../../assets/icons/ic-credit-card-fill.png")
const IC_PLANE = require("../../../assets/icons/ic-plane-fill.png")
const IC_REPEAT = require("../../../assets/icons/ic-repeat.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: ViewStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 4,
  paddingHorizontal: 0,
  justifyContent: 'space-between',
  display: "flex",
  flexDirection: "row",
}
const HEADER_WALLET: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: 6,
  borderRadius: 8,
  backgroundColor: color.palette.offWhite,
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
}
const HEADER_WALLET_TEXT: TextStyle = {
  color: color.textDark,
  marginLeft: 12,
  fontSize: 12,
  lineHeight: 20,
}
const HEADER_PROFILE: ViewStyle = {
  flex: 0,
  paddingVertical: spacing[1],
  paddingHorizontal: spacing[1],
  backgroundColor: color.palette.offWhite,
  alignItems: 'center',
  display: 'flex',
  borderRadius: 8,
  width: 32,
  height: 32
}
const WALLET_WRAPPER: ViewStyle = {
  backgroundColor: color.primaryDarker,
  paddingVertical: 18,
  paddingHorizontal: 20,
  borderRadius: 16,
  shadowColor: color.primary,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}
const MY_WALLET_WRAPPER: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  paddingBottom: spacing[3] + 2,
  borderBottomWidth: 1,
  borderBottomColor: '#68B8F8',
  justifyContent: 'space-between',
  alignItems: 'center'
}
const MY_ACCOUNT_WRAPPER: ViewStyle = {
  display: "flex",
  flexDirection: "row",
}

const MY_WALLET: TextStyle = {
  ...BOLD,
  fontSize: 14,
  lineHeight: 20,
  color: color.palette.white,
  paddingRight: spacing[2],
}

const ACCOUNT_NUMBER: TextStyle = {
  fontSize: 14,
  fontWeight: "normal",
  lineHeight: 20,
  textAlign: "center",
  color: color.primary300
}

const WALLET_AMOUNT_WRAPPER: ViewStyle = {
  marginTop: 12,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}

const WALLET_AMOUNT: ViewStyle = {

}

const AMOUNT: TextStyle = {
  fontSize: 32,
  lineHeight: 40,
  color: color.palette.white
}

const EXCHANGE_AMOUNT: TextStyle = {
  fontSize: 16,
  lineHeight: 24,
  color: color.primary300
}

const RONIN_ICON_WRAPPER: ViewStyle = {
  display: "flex",
  alignSelf: "flex-end"
}

const RONIN_ICON: ViewStyle = {
  width: 40,
  height: 40,
}

const RONIN_ICON_IMAGE: ImageStyle = {
  height: '100%',
  resizeMode: 'contain',
  flex: 1,
  aspectRatio: 1
}
const ACTION_BUTTON_WRAPPER: ViewStyle = {
  flexDirection: "row",
  justifyContent: 'center',
  marginTop: spacing[4] + 4
}
const ACTION_BUTTON: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  width: 48,
  height: 48,
  marginHorizontal: 12
}
const ACTION_BUTTON_DISABLE: ImageStyle = {
  opacity: .5
}

const ASSET: TextStyle = {
  ...BOLD,
  marginTop: spacing[4] + 1,
  marginBottom: spacing[3],
  marginLeft: spacing[3],
  fontSize: 16,
  lineHeight: 20,
  color: color.textDark
}

const ASSET_ITEMS: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
}

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const {accountStore} = useStores()
  const {myProfile, mainAsset, allAssets} = accountStore

  useEffect(() => {
    accountStore.getAssets({})
  }, [])

  const handleMenuItemClick = () => {
    navigation.navigate(Screens.sendAssets)
  }

  return (
    <View testID="HomeScreen" style={FULL}>
      <Wallpaper/>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <View style={HEADER}>
          <View style={HEADER_WALLET}>
            <Image source={IC_DOT}/>
            <Text style={HEADER_WALLET_TEXT} tx={"homeScreen.roninWallet"}/>
          </View>
          <View style={HEADER_PROFILE}>
            <Image source={IC_PERSON}/>
          </View>
        </View>
        <View style={WALLET_WRAPPER}>
          <View style={MY_WALLET_WRAPPER}>
            <View style={MY_ACCOUNT_WRAPPER}>
              <Text style={MY_WALLET} tx={'homeScreen.myWallet'}/>
              <Text style={ACCOUNT_NUMBER} text={myProfile.accountNumber}/>
            </View>
            <TouchableOpacity>
              <Image source={IC_COPY}/>
            </TouchableOpacity>
          </View>
          <View style={WALLET_AMOUNT_WRAPPER}>
            <View style={WALLET_AMOUNT}>
              <Text style={AMOUNT} text={`${mainAsset.amount} ${mainAsset.sign}`}/>
              <Text style={EXCHANGE_AMOUNT} text={exchangeToVND(mainAsset.amount, mainAsset.exchangeRate)}/>
            </View>
            <View style={RONIN_ICON_WRAPPER}>
              <View style={RONIN_ICON}>
                <Image source={logoRoninWhite} style={RONIN_ICON_IMAGE}/>
              </View>
            </View>
          </View>
        </View>
        <View style={ACTION_BUTTON_WRAPPER}>
          <TouchableOpacity style={ACTION_BUTTON}>
            <Image source={IC_CREDIT_CARD} style={ACTION_BUTTON_DISABLE}/>
          </TouchableOpacity>
          <TouchableOpacity style={ACTION_BUTTON} onPress={handleMenuItemClick}>
            <Image source={IC_PLANE} />
          </TouchableOpacity>
          <TouchableOpacity style={ACTION_BUTTON}>
            <Image source={IC_REPEAT} style={ACTION_BUTTON_DISABLE}/>
          </TouchableOpacity>
        </View>
        <Text style={ASSET} preset="header" tx="homeScreen.assets"/>
        <View style={ASSET_ITEMS}>
          {values(allAssets || []).filter(item => item.country !== mainAsset.country)
          .map((item, index) => {
            return <AssetItem item={item} key={index}/>
          })}
        </View>
      </Screen>
    </View>
  )
})

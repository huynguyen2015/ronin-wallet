import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text } from ".."
import { AssetItemProps } from "./AssetItem.props"
import { color, spacing } from "../../theme"
import React from "react"
import { exchangeToVND } from "../../utils/helper"
import { currencyIcons } from "../../utils/appConst"

const BOLD: TextStyle = { fontWeight: "bold" }
const ASSET_ITEM_WRAP: ViewStyle = {
  display: "flex",
  width: "100%",
  borderRadius: 5,
  backgroundColor: '#F7F9FC',
  marginBottom: spacing[2]
}

const ASSET_ITEM: ViewStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[5] - 4,
  borderRadius: 8,
  flexDirection: "row",
  alignItems: "center"
}

const CURRENCY_ICON: ImageStyle = {
  resizeMode: 'cover',
  aspectRatio: 1,
  width: 32,
  height: 32,
  marginRight: 16
}
const ASSET_INFO_WRAPPER: ViewStyle = {
  flexDirection: "column",
}
const ASSET_AMOUNT: TextStyle = {
  ...BOLD,
  color: color.textDark,
  fontSize: 14,
  lineHeight: 20,
}
const ASSET_EXCHANGE_AMOUNT: TextStyle = {
  color: '#8F9BB3',
  fontSize: 12,
  lineHeight: 16,
  marginTop: spacing[1]
}

export function AssetItem(props: AssetItemProps) {
  const {
    item, style
  } = props

  return (
    <View style={[ASSET_ITEM_WRAP, style]}>
      <View style={ASSET_ITEM}>
        <Image source={currencyIcons[item.country]} style={CURRENCY_ICON} />
        <View style={ASSET_INFO_WRAPPER}>
          <Text style={ASSET_AMOUNT} text={`${item.balance} ${item.sign}`} />
          <Text style={ASSET_EXCHANGE_AMOUNT} text={`${exchangeToVND(item.balance, item.exchangeRate)}`} />
        </View>
      </View>
    </View>
  )
}
